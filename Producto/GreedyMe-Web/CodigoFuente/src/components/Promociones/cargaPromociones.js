import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import { NavBarSup } from "../../components/Principal/navBarSuperior";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {
  MenuItem,
  FormControlLabel,
  TextField,
  Checkbox,
  Button,
  Divider,
  Grid,
} from "@material-ui/core";
import {
  ValidatorForm,
  SelectValidator,
  TextValidator,
} from "react-material-ui-form-validator";
import { crearPromocion } from "../../redux/actions/promActions";
import firebase from "../../firebase/config";
import { getVal } from "react-redux-firebase";

//pagina vacia

const firestore = firebase.firestore();

const proveedor = [];
const proveedorServicio = () => {
  firestore
    .collection("proveedorServicio")
    .orderBy("nombre")
    .get()
    .then((snapShots) => {
      snapShots.forEach((doc) => {
        const data = doc.data();
        proveedor.push({
          ...data,
          id: doc.id,
        });
      });
    });
};
proveedorServicio();

const promocion = [];
const promo = () => {
  firestore
    .collection("tipoPromocion")
    .orderBy("tipo")
    .get()
    .then((snapShots) => {
      snapShots.forEach((doc) => {
        const data = doc.data();
        promocion.push({
          ...data,
          id: doc.id,
        });
      });
    });
};
promo();

const mesVigencia = [
  {
    value: "Septiembre",
    nombre: "Septiembre",
  },
  {
    value: "Noviembre",
    nombre: "Noviembre",
  },
];

const diaVigencia = [
  {
    value: "Lunes",
    nombre: "Lunes",
  },
  {
    value: "Martes",
    nombre: "Martes",
  },
  {
    value: "Miércoles",
    nombre: "Miércoles",
  },
  {
    value: "Jueves",
    nombre: "Jueves",
  },
  {
    value: "Viernes",
    nombre: "Viernes",
  },
  {
    value: "Sábado",
    nombre: "Sábado",
  },
  {
    value: "Domingo",
    nombre: "Domingo",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
}));

const CelesteCheckbox = withStyles({
  root: {
    color: "#707070",
    "&$checked": {
      color: "#76B39D",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CargaPromociones(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedTD: true,
    checkedL: false,
    checkedM: false,
    checkedMi: false,
    checkedJ: false,
    checkedV: false,
    checkedS: false,
    checkedD: false,
  });

  const [efectivo, setEfectivo] = React.useState({ efectivo: false });

  const [formData, setFormData] = React.useState({
    id: props.auth.uid,
    tipoPromo: "",
    valuePromo: "",
    proveedor: "",
    otroProveedor: "",
    descripcion: "",
  });

  const [desdeVigencia, handleDesdeVigencia] = React.useState(new Date()); //Estados para cada datePicker
  const [hastaVigencia, handleHastaVigencia] = React.useState(new Date());

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      state.checkedTD === false &&
      state.checkedL === false &&
      state.checkedM === false &&
      state.checkedMi === false &&
      state.checkedJ === false &&
      state.checkedV === false &&
      state.checkedS === false &&
      state.checkedD === false
    ) {
      alert("che perri pone un check");
    } else if (
      state.checkedTD === true &&
      (state.checkedL === true ||
        state.checkedM === true ||
        state.checkedMi === true ||
        state.checkedJ === true ||
        state.checkedV === true ||
        state.checkedS === true ||
        state.checkedD === true)
    ) {
      alert("che perraco hay inconsistencia en los cheks ponete las pilas bro");
    } else {
      props.crearPromocion(
        formData,
        state,
        efectivo,
        desdeVigencia,
        hastaVigencia
      );
      setOpen(true);
    }
  };

  const handleChange = (event) => {
    formData[event.target.name] = event.target.value;
    setFormData({ ...formData });
  };

  const handleChangec = (event) => {
    state[event.target.name] = event.target.checked;
    setState({ ...state });
  };

  const handleChangee = (event) => {
    efectivo[event.target.name] = event.target.checked;
    setEfectivo({ ...efectivo });
  };

  const form = React.createRef();

  const [valorPromo, setValorPromo] = React.useState([]); //lista de dependencias de react, cosa de que se refresque el campo una vez y luego cada vez que se actualizan los elementos de la lista

  /*useEffect(() => {
    //esto no corre en el primer render, se ejecuta luego del return
    setValorPromo([]);
    const valorPromocion = () => {
      firestore
        .collection("tipoPromocion")
        .where("tipoPromocion.tipo", "==", `${formData.tipoPromo}`)
        .get()
        .then((snapShots) => {
          snapShots((doc) => {
            const data = doc.data();
            valorPromo.push({
              ...data,
              id: doc.id,
            });
          });
        });
    }; //Por si falla la API
    valorPromocion();
  }, [formData.tipoPromo, setFormData]);*/ return (
    <div>
      {console.log(promocion)}
      <div className="prom-title-container">
        <h1>Promociones</h1>
      </div>
      <div className="contenedorTodo">
        <Card className="cardPromo">
          <ValidatorForm
            className={classes.root}
            ref={form}
            onSubmit={handleSubmit}
          >
            <CardContent className="cardContentePromo">
              <div className="subtituloProm">
                <h5>Cargue un nuevo beneficio</h5>
              </div>

              <div className="contCargarProm">
                <div className="contenedorCol1">
                  <SelectValidator
                    fullWidth
                    label="Tipo de promoción"
                    onChange={handleChange}
                    name="tipoPromo"
                    value={formData.tipoPromo}
                    variant="outlined"
                    validators={["required"]}
                    errorMessages={["*Este campo es obligatorio"]}
                  >
                    {promocion.map((option) => (
                      <MenuItem key={option.tipo} value={option.tipo}>
                        {option.tipo}
                      </MenuItem>
                    ))}
                  </SelectValidator>
                  {formData.tipoPromo ? (
                    <SelectValidator
                      variant="outlined"
                      id="outlined-basic"
                      label="Valor de la Promoción"
                      fullWidth
                      onChange={handleChange}
                      name="valuePromo"
                      required
                      value={formData.valuePromo}
                      validators={["matchRegexp:^([a-zA-Z ]){2,30}$"]}
                      errorMessages={["La promoción no es válida"]}
                    >
                      {formData.tipoPromo === "Descuento"
                        ? promocion[0]["valor"].map((option) => (
                            <MenuItem key={option} value={option[getVal]}>
                              {option[getVal]}
                            </MenuItem>
                          ))
                        : null}
                    </SelectValidator>
                  ) : null}

                  <SelectValidator
                    fullWidth
                    label="Proveedor de promoción"
                    onChange={handleChange}
                    name="proveedor"
                    value={formData.proveedor}
                    variant="outlined"
                    validators={["required"]}
                    errorMessages={["*Este campo es obligatorio"]}
                  >
                    {proveedor.map((option) => (
                      <MenuItem key={option.nombre} value={option.nombre}>
                        {option.nombre}
                      </MenuItem>
                    ))}
                  </SelectValidator>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      autoOk
                      disableToolbar
                      fullWidth
                      inputVariant="outlined"
                      name="desdeVigencia"
                      label="Disponible desde el"
                      minDate={new Date()}
                      format="dd/MM/yyyy"
                      value={desdeVigencia}
                      variant="inline"
                      onChange={(data) => handleDesdeVigencia(data)}
                    />
                    <DatePicker
                      autoOk
                      disableToolbar
                      fullWidth
                      inputVariant="outlined"
                      name="hastaVigencia"
                      label="Disponible hasta el"
                      format="dd/MM/yyyy"
                      minDate={desdeVigencia}
                      minDateMessage="*La fecha no puede ser menor al 'desde'"
                      value={hastaVigencia}
                      variant="inline"
                      onChange={(data) => handleHastaVigencia(data)}
                    ></DatePicker>
                  </MuiPickersUtilsProvider>
                  <FormControlLabel
                    id="cargar-promo-checkbox"
                    label="Efectivo"
                    control={
                      <CelesteCheckbox
                        checked={efectivo.efectivo}
                        onChange={handleChangee}
                        name="efectivo"
                      />
                    }
                  />
                </div>
                <Divider className="dividerVertical" orientation="vertical" />
                <Divider className="dividerHorizontal" />
                <div className="contenedorCol2">
                  <p>¿Qué días aplica la promoción?</p>
                  <div className="cargar-promo-check-group">
                    <FormControlLabel
                      id="cargar-promo-checkbox"
                      className="cargar-promo-checkbox-1"
                      control={
                        <CelesteCheckbox
                          checked={state.checkedL}
                          onChange={handleChangec}
                          name="checkedL"
                        />
                      }
                      label="Lunes"
                    />

                    <FormControlLabel
                      id="cargar-promo-checkbox"
                      className="cargar-promo-checkbox-2"
                      control={
                        <CelesteCheckbox
                          checked={state.checkedM}
                          onChange={handleChangec}
                          name="checkedM"
                        />
                      }
                      label="Martes"
                    />
                    <FormControlLabel
                      id="cargar-promo-checkbox"
                      className="cargar-promo-checkbox-3"
                      control={
                        <CelesteCheckbox
                          checked={state.checkedMi}
                          onChange={handleChangec}
                          name="checkedMi"
                        />
                      }
                      label="Miércoles"
                    />

                    <FormControlLabel
                      id="cargar-promo-checkbox"
                      className="cargar-promo-checkbox-4"
                      control={
                        <CelesteCheckbox
                          checked={state.checkedJ}
                          onChange={handleChangec}
                          name="checkedJ"
                        />
                      }
                      label="Jueves"
                    />
                    <FormControlLabel
                      id="cargar-promo-checkbox"
                      className="cargar-promo-checkbox-5"
                      control={
                        <CelesteCheckbox
                          checked={state.checkedV}
                          onChange={handleChangec}
                          name="checkedV"
                        />
                      }
                      label="Viernes"
                    />

                    <FormControlLabel
                      id="cargar-promo-checkbox"
                      className="cargar-promo-checkbox-6"
                      control={
                        <CelesteCheckbox
                          checked={state.checkedS}
                          onChange={handleChangec}
                          name="checkedS"
                        />
                      }
                      label="Sábado"
                    />
                    <FormControlLabel
                      id="cargar-promo-checkbox"
                      className="cargar-promo-checkbox-7"
                      control={
                        <CelesteCheckbox
                          checked={state.checkedD}
                          onChange={handleChangec}
                          name="checkedD"
                        />
                      }
                      label="Domingo"
                    />
                    <FormControlLabel
                      id="cargar-promo-checkbox"
                      className="cargar-promo-checkbox-8"
                      control={
                        <CelesteCheckbox
                          checked={state.checkedTD}
                          onChange={handleChangec}
                          name="checkedTD"
                        />
                      }
                      label="Todos los días"
                    />
                  </div>
                  <p className="cargar-promo-desc">Agregar descripción</p>
                  <form className={classes.root} noValidate autoComplete="off">
                    <div>
                      <TextField
                        fullWidth
                        variant="outlined"
                        id="standard-textarea"
                        name="descripcion"
                        label="Descripción (opcional)"
                        value={formData.descripcion}
                        onChange={handleChange}
                        placeholder="Descripción (opcional)"
                        multiline
                        rows={2}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </CardContent>
            <CardActions className="cargar-promo-buttons-container">
              <div className="btn-cargar-prom">
                <Button
                  variant="contained"
                  className={classes.margin}
                  id="cargar-promo-submit"
                  type="submit"
                >
                  Cargar promoción
                </Button>
              </div>
              <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                open={open}
                autoHideDuration={8000}
                onClose={handleClose}
              >
                <Alert onClose={handleClose} severity="success">
                  La promoción se cargo correctamente!
                </Alert>
              </Snackbar>
            </CardActions>
          </ValidatorForm>
        </Card>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    crearPromocion: (promocion, dias, efectivo, desdeVigencia, hastaVigencia) =>
      dispatch(
        crearPromocion(promocion, dias, efectivo, desdeVigencia, hastaVigencia)
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CargaPromociones);
