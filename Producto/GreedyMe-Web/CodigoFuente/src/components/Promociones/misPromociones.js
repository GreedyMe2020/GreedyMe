import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Grid, Avatar, IconButton } from "@material-ui/core";
import { format } from "date-fns";
import ModalPromos from "../../components/modal-button";
import {
  cambiarVisibilidad,
  actualizarPromocion,
  eliminarPromocion,
} from "../../redux/actions/promActions";
import firebase from "../../firebase/config";
import { connect } from "react-redux";
import _ from "lodash";

//esta es la funcion que trae los datos, tipo crea un array trae todos las promociones
//y la va acumulando en el array

const useStyles = makeStyles((theme) => ({
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
}));

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

function MisPromociones(props) {
  const [promos, setPromos] = React.useState(promociones);
  const [currentId, setCurrentId] = React.useState(null);
  React.useEffect(() => {
    if (currentId) {
      props.eliminarPromocion({
        id: props.auth.uid,
        idProm: currentId,
      });
      const promoteca = _.remove(promos, function (n) {
        return n.id === currentId;
      });
      console.log(promos);
      setPromos([...promos]);
    }
  }, [currentId]);

  const classes = useStyles();

  const [text, setText] = React.useState("");
  const [promos2, setPromos2] = React.useState(promociones);
  const [values, setValues] = React.useState({
    showPromo: false,
  });

  const handleClickShowPromo = () => {
    setValues({ ...values, showPromo: !values.showPromo });
  };

  const handleMouseDownPromo = (event) => {
    event.preventDefault();
  };

  const filter = (text) => {
    let textoBuscar = text.target.value;
    const datos = promos2;
    const newDatos = datos.filter(function (item) {
      const itemTipoPromo = item.tipoPromo.toUpperCase();
      const itemProveedor = item.proveedor.toUpperCase();
      const itemDescripcion = item.descripcion.toUpperCase();
      const campo = itemTipoPromo + " " + itemProveedor + " " + itemDescripcion;
      const textData = textoBuscar.toUpperCase();
      return campo.indexOf(textData) > -1;
    });
    setPromos(newDatos);
    setText(text);
  };
  return (
    <div>
      <ModalPromos />
      <input
        className="form-control col-md-4"
        defaultValue={text}
        placeholder="Buscar"
        onChange={(text) => filter(text)}
      />
      <div className="contenedorTodo">
        <Card className="cardPromo">
          <CardContent className="cardContentePromo">
            <Grid item xs={12} md={12}>
              <div className={classes.demo}>
                <List>
                  {promos &&
                    promos.map((promo) => {
                      return (
                        <ListItem key={promo.id}>
                          <ListItemAvatar>
                            <Avatar
                              variant="square"
                              src={require("../../../Multimedia/Sistema-svg/credit-card.svg")}
                              /* src1={require("../../../Multimedia/Sistema-svg/credit-card.svg")}
                              src2={require("../../../Multimedia/Sistema-svg/store.svg")}
                              src3={require("../../../Multimedia/Sistema-svg/percentage (1).svg")}
                              proveedor={
                                promos.proveedor === 1
                                  ? src1
                                  : promos.proveedor === 2
                                  ? src2
                                  : src3
                              } */
                            ></Avatar>
                          </ListItemAvatar>

                          <div className="elementoListaProm">
                            <ListItemText
                              //asi podes ir accediendo a todos los datos asi los acomodas como quieras
                              primary={
                                promo.tipoPromo +
                                " " +
                                promo.proveedor +
                                " desde el " +
                                format(
                                  promo.desdeVigencia.toDate(),
                                  "dd-MM-yyyy"
                                ) +
                                " hasta el " +
                                format(
                                  promo.hastaVigencia.toDate(),
                                  "dd-MM-yyyy"
                                ) +
                                " " +
                                promo.diaAplicacion.checkedTD +
                                " " +
                                promo.descripcion
                              }
                              secondary={promo.efectivo ? "Efectivo" : null}
                            />
                          </div>
                          <ListItemSecondaryAction>
                            <IconButton aria-label="Editar">
                              <CreateIcon />
                            </IconButton>
                            <IconButton
                              aria-label="Mostrar/Ocultar"
                              onClick={handleClickShowPromo}
                              onMouseDown={handleMouseDownPromo}
                            >
                              {values.showPromo ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                            <IconButton
                              onClick={() => {
                                setCurrentId(promo.id);
                              }}
                              edge="end"
                              aria-label="Eliminar"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      );
                    })}
                </List>
              </div>
            </Grid>
          </CardContent>
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
    actualizarPromocion: (
      promocion,
      dias,
      efectivo,
      desdeVigencia,
      hastaVigencia
    ) =>
      dispatch(
        actualizarPromocion(
          promocion,
          dias,
          efectivo,
          desdeVigencia,
          hastaVigencia
        )
      ),
    eliminarPromocion: (promocion) => dispatch(eliminarPromocion(promocion)),
    cambiarVisibilidad: (promocion) => dispatch(cambiarVisibilidad(promocion)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MisPromociones);
