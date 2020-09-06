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
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogComponent from "../Dialog";
import { Grid, Avatar, IconButton } from "@material-ui/core";
import { format } from "date-fns";
import ModalPromos from "../../components/modal-button";
import ModalPromosActualizar from "../../components/Promociones/modal-modificar";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";

import {
  cambiarVisibilidad,
  actualizarPromocion,
  eliminarPromocion,
} from "../../redux/actions/promActions";
import firebase from "../../firebase/config";
import { connect } from "react-redux";
import _ from "lodash";
import { crearPromocion } from "../../redux/actions/promActions";

//esta es la funcion que trae los datos, tipo crea un array trae todos las promociones
//y la va acumulando en el array

const useStyles = makeStyles((theme) => ({
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  cruz: {
    position: "absolute",
    right: theme.spacing(1),
    top: "8px",
    color: theme.palette.grey[500],
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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function MisPromociones(props) {
  const classes = useStyles();
  //Estados de las promociones
  const [promos, setPromos] = React.useState(promociones);
  const [promos2, setPromos2] = React.useState(promociones);

  //Estado del dialog (abierto/cerrado)
  const [open, setOpen] = React.useState(false);

  //Estados para setear la promo a eliminar, y eliminar la promo
  const [eliminar, setEliminar] = React.useState(null);
  const [currentId, setCurrentId] = React.useState(null);

  //Estados para crear nuevas promociones
  const [nuevaPromo, setNuevaPromo] = React.useState(null);
  const [text, setText] = React.useState("");

  //Estado de visibilidad para mostar u ocultar una promocion en la app mobile
  const [values, setValues] = React.useState(null);
  const [currentId2, setCurrentId2] = React.useState(null);

  //Eliminar una promo de la BD y renderizar la eliminacion de una promo
  React.useEffect(() => {
    if (currentId) {
      props.eliminarPromocion({
        id: props.auth.uid,
        idProm: currentId,
      });
      const promoteca = _.remove(promos, function (n) {
        return n.id === currentId;
      });
      setPromos([...promos]);
      setPromos2([...promos]);
    }
  }, [currentId]);

  //Renderizar nueva promo
  React.useEffect(() => {
    if (nuevaPromo) {
      promos.push(nuevaPromo);
      setPromos([...promos]);
      setPromos2([...promos]);
    }
  }, [nuevaPromo]);

  React.useEffect(() => {
    if (currentId2) {
      props.cambiarVisibilidad({
        id: props.auth.uid,
        idProm: currentId2,
        visible: values,
      });

      const indiceACambiar = _.findIndex(promos, function (o) {
        return o.id === currentId2;
      });

      const objCambiar = _.nth(promos, indiceACambiar);

      promos.splice(indiceACambiar, 1, {
        id: objCambiar.id,
        tipoPromo: objCambiar.tipoPromo,
        valuePromo: objCambiar.valuePromo,
        otraPromo: objCambiar.otraPromo,
        tipoProveedor: objCambiar.tipoProveedor,
        valueProveedor: objCambiar.valueProveedor,
        otroProveedor: objCambiar.otroProveedor,
        descripcion: objCambiar.descripcion,
        desdeVigencia: objCambiar.desdeVigencia,
        hastaVigencia: objCambiar.hastaVigencia,
        visible: values,
        diaAplicacion: objCambiar.diaAplicacion,
        medioPago: objCambiar.medioPago,
      });

      setOpenAlert(true);
    }
    setCurrentId2(null);
  }, [currentId2]);

  const handleClickShowPromo = () => {
    setValues(!promo.id);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleMouseDownPromo = (event) => {
    event.preventDefault();
  };

  const filter = (text) => {
    let textoBuscar = text.target.value;
    const datos = promos2;
    const newDatos = datos.filter(function (item) {
      const itemTipoPromo = item.tipoPromo.toUpperCase();
      const itemValuePromo = item.valuePromo.toUpperCase();
      const itemProveedor = item.tipoProveedor.toUpperCase();
      const itemValueProveedor = item.valueProveedor.toUpperCase();
      const itemDescripcion = item.descripcion.toUpperCase();
      const campo =
        itemTipoPromo +
        " " +
        itemValuePromo +
        " " +
        itemProveedor +
        " " +
        itemValueProveedor +
        " " +
        itemDescripcion;
      const textData = textoBuscar.toUpperCase();
      return campo.indexOf(textData) > -1;
    });
    setPromos(newDatos);
    setText(text);
  };

  const crear = (formData, id, state, value, desdeVigencia, hastaVigencia) => {
    props.crearPromocion(
      formData,
      id,
      state,
      value,
      desdeVigencia,
      hastaVigencia
    );
    setNuevaPromo({
      id: id,
      tipoPromo: formData.tipoPromo,
      valuePromo: formData.valuePromo,
      otraPromo: formData.otraPromo,
      tipoProveedor: formData.tipoProveedor,
      valueProveedor: formData.valueProveedor,
      otroProveedor: formData.otroProveedor,
      descripcion: formData.descripcion,
      desdeVigencia: firebase.firestore.Timestamp.fromDate(desdeVigencia),
      hastaVigencia: firebase.firestore.Timestamp.fromDate(hastaVigencia),
      visible: false,
      diaAplicacion: state,
      medioPago: value,
    });
    console.log("entro aca bebesitooooo");
  };

  const [openModificar, setOpenModificar] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("md");
  const handleClickOpenModificar = () => {
    setOpenModificar(true);
  };

  const handleCloseModificar = () => {
    setOpenModificar(false);
  };

  const [openAlert, setOpenAlert] = React.useState(false);

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  function handleDias(promo) {
    const dias = [];
    for (const dia of promo) {
      if (dia) {
        dias.push(promo.key);
      }
    }
    console.log(dias);
  }

  return (
    <div>
      <ModalPromos
        crear={crear}
        defaultValue={text}
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
                                ": " +
                                promo.valuePromo +
                                ". " +
                                promo.otraPromo +
                                " Proveedor: " +
                                promo.valueProveedor +
                                ". " +
                                promo.otroProveedor +
                                " válida desde el " +
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
                                promo.diaAplicacion.lunes
                              }
                              secondary={
                                promo.medioPago +
                                ". " +
                                (promo.descripcion ? promo.descripcion : "")
                              }
                            />
                          </div>
                          <ListItemSecondaryAction>
                            <Tooltip title="Editar" arrow>
                              <IconButton
                                aria-label="Editar"
                                onClick={handleClickOpenModificar}
                              >
                                <CreateIcon />
                              </IconButton>
                            </Tooltip>
                            <Dialog
                              fullWidth={fullWidth}
                              maxWidth={maxWidth}
                              open={openModificar}
                            >
                              <DialogTitle id="dialog-title-prom">
                                <h5>Modificar beneficio</h5>
                                <IconButton
                                  aria-label="close"
                                  id="btn"
                                  className={classes.cruz}
                                  onClick={handleCloseModificar}
                                >
                                  <CloseIcon />
                                </IconButton>
                              </DialogTitle>
                              <DialogContent dividers>
                                <DialogContentText>
                                  <ModalPromosActualizar />
                                </DialogContentText>
                              </DialogContent>
                            </Dialog>
                            <Tooltip title="Mostrar/Ocultar" arrow>
                              <IconButton
                                aria-label="Mostrar/Ocultar"
                                onClick={() => {
                                  setValues(!promo.visible);
                                  setCurrentId2(promo.id);
                                  console.log(values);
                                }}
                                onMouseDown={handleMouseDownPromo}
                              >
                                {promo.visible ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Eliminar" arrow>
                              <IconButton
                                onClick={() => {
                                  setEliminar(promo.id);
                                  setOpen(true);
                                  console.log(promo.id);
                                  console.log(promo.visible);
                                }}
                                edge="end"
                                aria-label="Eliminar"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                            <DialogComponent
                              open={open}
                              setOpen={setOpen}
                              handleClose={handleClose}
                              eliminar={eliminar}
                              setEliminar={setEliminar}
                              setCurrentId={setCurrentId}
                              title={"¿Estás seguro de eliminar el beneficio?"}
                              text={
                                "Una vez que aceptes eliminar el beneficio, el mismo no podrá ser recuperado."
                              }
                              btnText={"Eliminar"}
                            />
                          </ListItemSecondaryAction>
                        </ListItem>
                      );
                    })}
                </List>
                {values ? (
                  <Snackbar
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    open={openAlert}
                    autoHideDuration={8000}
                    onClose={handleCloseAlert}
                  >
                    <Alert onClose={handleCloseAlert} severity="info">
                      La promoción está visible en la aplicación
                    </Alert>
                  </Snackbar>
                ) : (
                  <Snackbar
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    open={openAlert}
                    autoHideDuration={8000}
                    onClose={handleCloseAlert}
                  >
                    <Alert onClose={handleCloseAlert} severity="warning">
                      Se ocultó la promoción en la aplicación
                    </Alert>
                  </Snackbar>
                )}
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
    crearPromocion: (
      promocion,
      id,
      dias,
      efectivo,
      desdeVigencia,
      hastaVigencia
    ) =>
      dispatch(
        crearPromocion(
          promocion,
          id,
          dias,
          efectivo,
          desdeVigencia,
          hastaVigencia
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MisPromociones);
