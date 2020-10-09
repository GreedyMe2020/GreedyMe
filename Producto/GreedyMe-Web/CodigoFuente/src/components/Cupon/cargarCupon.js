import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import firebase from "../../firebase/config";
import { format } from "date-fns";
//Funcion para traer promociones 
let promociones = [];
const promocion = () => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      const id = user.uid;
      const firestore = firebase.firestore();
      firestore
        .collection("usuarioComercio")
        .doc(id)
        .collection("promociones")
        .onSnapshot(function (snapShots) {
          promociones = [];
          snapShots.forEach((doc) => {
            const data = doc.data();
            promociones.push({
              ...data,
              id: doc.id,
            });
          });
        });
    }
  });
};
//y aca se ejecuta la funcion de arriba
promocion();

function Cupon() {

  //Estados de las promociones
  const [promos, setPromos] = React.useState(promociones);
  const beneficios = []
  promociones.map((promo) => {
    beneficios.push({name: promo.tipoProveedor + " " + promo.valueProveedor + " " + promo.otroProveedor + " " + promo.tipoPromo + " " + promo.valuePromo + " " + promo.otraPromo + "válida desde el " +
    format(
      promo.desdeVigencia.toDate(),
      "dd/MM/yyyy"
    ) +
    " hasta el " +
    format(
      promo.hastaVigencia.toDate(),
      "dd/MM/yyyy"
    ) })
  })


  const options = beneficios.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? firstLetter : firstLetter,
      ...option,
    };
  });
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
                disabled
              ></TextField>
              <Button
                variant="contained"
                className="btn-generar-cup"
                type="submit"
              >
                Generar código
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Cupon;
