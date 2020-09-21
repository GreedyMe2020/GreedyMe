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
import Tooltip from "@material-ui/core/Tooltip";
import DialogComponent from "../../Dialog";
import { Grid, Avatar, IconButton } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import ModalComercios from "./modal-comercio";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import CreateIcon from "@material-ui/icons/Create";
import ModalActualizarComercio from "./modal-actualizar-comercio";

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
  inline: {
    display: "block",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ListaUsuarios(props) {
  const classes = useStyles();

  //Estado del dialog (abierto/cerrado)
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleMouseDownPromo = (event) => {
    event.preventDefault();
  };

  const [openAlert, setOpenAlert] = React.useState(false);

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  /*   //Estados de las promociones
  const [comercio, setComercio] = React.useState(comercio);
  const [comercio2, setComercio2] = React.useState(comercio);

  //Estados para setear la promo a eliminar, y eliminar la promo
  const [eliminar, setEliminar] = React.useState(null);
  const [currentId, setCurrentId] = React.useState(null);

  //Snackbar cuando se elimina una promo
  const [eliminada, setEliminada] = React.useState(false);

  //Eliminar una promo de la BD y renderizar la eliminacion de una promo
  React.useEffect(() => {
    if (currentId) {
      props.eliminarComercio({
        id: props.auth.uid,
        idComercio: currentId,
      });
      const comercio = _.remove(user, function (n) {
        return n.id === currentId;
      });
      setComercio([...usuarios]);
      setComercio2([...usuarios]);
    }
  }, [currentId]);

  //Renderizar nueva promo
  React.useEffect(() => {
    if (nuevoComercio) {
      usuarios.push(nuevoComercio);
      setComercio([...usuarios]);
      setComercios2([...usuarios]);
    }
  }, [nuevaComercio]);

  //Para modificar la promo
  const [modificar, setModificar] = React.useState(null);
  const [modificado, setModificado] = React.useState(null);

  //Renderizar cambio de promo
  React.useEffect(() => {
    if (modificado) {
      const indiceACambiar = _.findIndex(usuarios, function (o) {
        return o.id === modificado.id;
      });
      const objCambiar = _.nth(usuarios, indiceACambiar);
      usuarios.splice(indiceACambiar, 1, {
        email: modificado.email,
        CUIT: modificado.CUIT,
        nombreComercio: modificado.nombreComercio,
        web: modificado.web,
        contraseña: modificado.contraseña,
        repetirContraseña: modificado.repetirContraseña,
        sucursal: modificado.sucursal,
        rubro: modificado.rubro,
        telefono: modificado.telefono,
        instagram: modificado.instagram,
        facebook: modificado.facebook,
        direccion: modificado.direccion,
      });
    }
  }, [modificado]); */

  return (
    <div>
      <ModalComercios />
      <div className="contenedorTodo">
        <Card className="cardPromo">
          <CardContent className="cardContentePromo">
            <Grid item xs={12} md={12}>
              <div className={classes.demo}>
                <List>
                  {props.usuarios &&
                    props.usuarios.map((user) => {
                      return (
                        <ListItem key={user.id}>
                          <ListItemAvatar>
                            <Avatar
                              variant="square"
                              src={require("../../../../Multimedia/Sistema-svg/user.svg")}
                            ></Avatar>
                          </ListItemAvatar>

                          <div className="elementoListaProm">
                            <ListItemText
                              //asi podes ir accediendo a todos los datos asi los acomodas como quieras
                              primary={
                                <React.Fragment>
                                  <Typography className={classes.inline}>
                                    {user.nombreComercio}
                                  </Typography>
                                  {user.CUIT}
                                </React.Fragment>
                              }
                              secondary={"web: " + user.web}
                            />
                          </div>
                          <ListItemSecondaryAction>
                            <Tooltip title="Editar" arrow>
                              <IconButton
                                aria-label="Editar"
                                /*  onClick={() => {
                                  setModificar({
                                    email: user.email,
                                    CUIT: user.CUIT,
                                    nombreComercio: user.nombreComercio,
                                    web: user.web,
                                    contraseña: user.contraseña,
                                    repetirContraseña: user.repetirContraseña,
                                    sucursal: user.sucursal,
                                    rubro: user.rubro,
                                    telefono: user.telefono,
                                    instagram: user.instagram,
                                    facebook: user.facebook,
                                    direccion: user.direccion,
                                  });
                                  handleClickOpenModificar();
                                }} */
                              >
                                <CreateIcon />
                              </IconButton>
                            </Tooltip>
                            {/* <Dialog
                              fullWidth={fullWidth}
                              maxWidth={maxWidth}
                              open={openModificar}
                            >
                              <DialogTitle id="dialog-title-prom">
                                <h5>Modificar comercio</h5>
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
                                  <ModalActualizarComercio
                                    comercio={modificar}
                                    actualizar={actualizar}
                                  />
                                </DialogContentText>
                              </DialogContent>
                            </Dialog> */}
                            <Tooltip title="Eliminar" arrow>
                              <IconButton
                                /*  onClick={() => {
                                  setEliminar(user.id);
                                  setOpen(true);
                                  console.log(user.id);
                                }} */
                                edge="end"
                                aria-label="Eliminar"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                            {/* <DialogComponent
                              open={open}
                              setOpen={setOpen}
                              handleClose={handleClose}
                              eliminar={eliminar}
                              setEliminar={setEliminar}
                              setEliminada={setEliminada}
                              setCurrentId={setCurrentId}
                              title={"¿Estás seguro de eliminar el comercio?"}
                              text={
                                "Una vez que aceptes eliminar el comercio, el mismo no podrá ser recuperado."
                              }
                              btnText={"Eliminar"}
                            /> */}
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
    usuarios: state.firestore.ordered.usuarioComercio,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "usuarioComercio" }])
)(ListaUsuarios);
