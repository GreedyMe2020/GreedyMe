import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import firebase from "../../firebase/config";
import { format } from "date-fns";
import { connect } from "react-redux";
import { generarCodigo } from "../../redux/actions/comActions"
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

//funcion de las alertas
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Cupon(props) {
  //estado para el codigo
  const [codigo, setCodigo] =  React.useState("");
  //estado de lo que se renderiza
  const [options, setOptions] = React.useState([]);
  //estado input value
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');
  //estado para abrir la alerta
  const [open, setOpen] = React.useState(false);

   //use effect que trae los datos 
   React.useEffect(() => {
    const obtenerPromociones = async () => {
      const firestore = firebase.firestore();
      try {
        const promociones = await firestore.collection("usuarioComercio").doc(props.auth.uid).collection("promociones").get()
        const arrayPromociones = promociones.docs.map(doc => ({id: doc.id, ...doc.data()}))
        const beneficios = [];
        arrayPromociones.map((promo) => {
          beneficios.push({
            id: promo.id,
            name:
              promo.tipoPromo +
              " " +
              (promo.valuePromo === "Otro"
                ? promo.otraPromo
                : promo.valuePromo) +
              " " +
              (promo.valueProveedor === "Otro"
                ? promo.otroProveedor
                : promo.valueProveedor === 'Todos' ? 'Todos los Bancos' : promo.valueProveedor) +
              ", " +
              (promo.tipoProveedor === "Tarjetas de crédito" || promo.tipoProveedor === "Tarjetas de débito" ? promo.otroProveedor + " " : "")
              +
              (promo.otroProveedor === "Todas" ? "las Tarjetas " : "")
              +
              "válida desde el " +
              format(
                promo.desdeVigencia.toDate(),
                "dd/MM/yyyy"
              ) +
              " hasta el " +
              format(
                promo.hastaVigencia.toDate(),
                "dd/MM/yyyy"
              ) +
              "."
          });
        });
        const opciones = beneficios.map((option) => {
          const firstLetter = option.name[0].toUpperCase();
          return {
            firstLetter: /[0-9]/.test(firstLetter) ? firstLetter : firstLetter,
            ...option,
          };
        });
        setOptions(opciones)
      }
      catch (error){
        console.log(error)
      }
    }
  obtenerPromociones();
  }, [])

  //funcion para cuando apreta generar codigo
  const handleSubmit = () => {
    var caracteres = "abcdefghijkmnpqrtuvwxyz12346789";
    var contraseña = "";
    for (var i=0; i<5; i++) {contraseña +=caracteres.charAt(Math.floor(Math.random()*caracteres.length))}; 
    if(value){
      props.generarCodigo(contraseña, value.id)
      setCodigo(contraseña)
    } else {
      setOpen(true)
    }
  }

  //cierra la alerta
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <div className="prom-title-container">
        <h1>Cupones</h1>
      </div>
      <Card className="card-cupon">
        <CardContent className="card-content-cupon">
          <div className="input-buscador-beneficio">
            <h6 className="texto-beneficio">
              Cupón que va a utilizar su cliente:
            </h6>
            <Autocomplete
              className="buscador-ben"
              fullWidth
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              validators={["required"]}
              errorMessages={["*Este campo es obligatorio"]}
              options={options.sort(
                (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
              )}
              groupBy={(option) => option.firstLetter}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Buscar beneficio"
                  variant="outlined"
                />
              )}
            />
          </div>
          <div className="generar-cupon">
            <h6 className="texto-cupon">El código para este cupón es:</h6>
            <div className="generador-cupon">
              <TextField
                label="Código"
                className="input-cupon"
                variant="outlined"
                value={codigo}
                name="codigo"
              ></TextField>
              <Button
                variant="contained"
                className="btn-generar-cup"
                type="submit"
                onClick={handleSubmit}
              >
                Generar código
              </Button>
            </div>
          </div>
        </CardContent>
        <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            open={open}
            autoHideDuration={8000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="error">
              Debes seleccionar un beneficio.
            </Alert>
          </Snackbar>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    codigo: state.comercio.codigo,
    codigoError: state.comercio.codigoError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    generarCodigo: (codigo, idCupon) => dispatch(generarCodigo(codigo, idCupon)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cupon);

