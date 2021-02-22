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
import Dialog from "@material-ui/core/Dialog";
import { Grid, Avatar, IconButton } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import ModalAdministrador from "../modal-admin";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import CreateIcon from "@material-ui/icons/Create";
import CloseIcon from "@material-ui/icons/Close";
import {eliminarPuntoRetiro} from '../../../redux/actions/adminActions';
import FormPuntoEntrega from "./FormPuntosEntrega";
import Snackbar from "@material-ui/core/Snackbar";
import _ from "lodash";
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

function PuntosEntrega(props) {
  const classes = useStyles();

  //Estado del dialog (abierto/cerrado) y propiedades del dialog
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("xs");

  //estado de alerta
  const [openAlert, setOpenAlert] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleMouseDownPromo = (event) => {
    event.preventDefault();
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setEliminada(false);
  };

  //estados solo para el buscador

  const [listaRetiros, setListaRetiros] = React.useState(props.puntoRetiro);
  const [texto, setTexto] = React.useState(false);
  const [text, setText] = React.useState("");

  //Estados para setear producto a eliminar, y eliminarlo
  const [eliminar, setEliminar] = React.useState(null);
  const [currentId, setCurrentId] = React.useState(null);

  //Snackbar cuando se elimina un producto
  const [eliminada, setEliminada] = React.useState(false);

  //Eliminar un producto de la BD y renderizar la eliminacion (cambiarlo para los productos)
  React.useEffect(() => {
    if (currentId) {
      props.eliminarPuntoRetiro(currentId);
    }
  }, [currentId]);

  //funcion para buscar
  const filter = (text) => {
    if (props.puntoRetiro) {
      let textoBuscar = text.target.value;
      const datos = props.puntoRetiro;
      const newDatos = datos.filter(function (item) {
        const itemDireccion = item.direccion.toUpperCase();
        const itemLocalidad = item.localidad.toUpperCase();
        const itemProvincia = item.provincia.toUpperCase();
        const itemPais = item.pais.toUpperCase();
        const campo = itemDireccion + " " + itemLocalidad + " " + itemProvincia + " " + itemPais;
        const textData = textoBuscar.toUpperCase();
        return campo.indexOf(textData) > -1;
      });
      setListaRetiros(newDatos);
      setText(text);
      if (text.target.value != "") {
        setTexto(true);
      } else {
        setTexto(false);
      }
    }
  }; 

  /* const crearComercio = (formData) => {
    props.signUp(formData);
  };

  const actualizarComercio = (formData) => {
    props.modificarUsuarioComercio(formData);
  }; */

  return (
    <div>
      <ModalAdministrador
        title="Puntos de retiro"
        titleModal="Nuevo punto de retiro"
        button="Nuevo punto de retiro"
        openContent={<FormPuntoEntrega />}
        placeholder="Buscar punto de retiro…"
        width="xs"
        onChange={(text) => filter(text)}
      />

      <div className="contenedorTodo">
        <Card className="cardPromo">
          <CardContent className="cardContentePromo">
            <Grid item xs={12} md={12}>
              <div className={classes.demo}>
                <List>
                  {props.puntoRetiro && texto === false ? props.puntoRetiro.map((punto) => {
                    return(
                      <ListItem key={punto.id}>
                      <ListItemAvatar>
                          <Avatar
                          variant="square"
                          src={require("../../../../Multimedia/Sistema-svg/location.svg")}
                          ></Avatar>
                      </ListItemAvatar>
                      <div className="elementoListaProm">
                          <ListItemText
                          //asi podes ir accediendo a todos los datos asi los acomodas como quieras
                          primary={
                              <React.Fragment>
                              <Typography className={classes.inline}>
                                  {`${punto.direccion}, ${punto.localidad}`}
                              </Typography>
                              </React.Fragment>
                          }
                          secondary={`${punto.provincia}, ${punto.pais}.`}
                          />
                      </div>
                      <ListItemSecondaryAction>
                          <Tooltip title="Eliminar" arrow>
                          <IconButton
                              onClick={() => {
                              setEliminar(punto.id);
                              setOpen(true);
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
                          setEliminada={setEliminada}
                          setCurrentId={setCurrentId}
                          title={"¿Estás seguro de eliminar el punto de retiro?"}
                          text={
                              "Una vez que aceptes eliminar el punto de retiro, el mismo no podrá ser recuperado."
                          }
                          btnText={"Eliminar"}
                          />
                      </ListItemSecondaryAction>
                      </ListItem>
                    )
                  }): listaRetiros ? listaRetiros.map((punto) => {
                    return(
                      <ListItem key={punto.id}>
                      <ListItemAvatar>
                          <Avatar
                          variant="square"
                          src={require("../../../../Multimedia/Sistema-svg/location.svg")}
                          ></Avatar>
                      </ListItemAvatar>
                      <div className="elementoListaProm">
                          <ListItemText
                          //asi podes ir accediendo a todos los datos asi los acomodas como quieras
                          primary={
                              <React.Fragment>
                              <Typography className={classes.inline}>
                                  {`${punto.direccion}, ${punto.localidad}`}
                              </Typography>
                              </React.Fragment>
                          }
                          secondary={`${punto.provincia}, ${punto.pais}.`}
                          />
                      </div>
                      <ListItemSecondaryAction>
                          <Tooltip title="Eliminar" arrow>
                          <IconButton
                              onClick={() => {
                              setEliminar(punto.id);
                              setOpen(true);
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
                          setEliminada={setEliminada}
                          setCurrentId={setCurrentId}
                          title={"¿Estás seguro de eliminar el punto de retiro?"}
                          text={
                              "Una vez que aceptes eliminar el punto de retiro, el mismo no podrá ser recuperado."
                          }
                          btnText={"Eliminar"}
                          />
                      </ListItemSecondaryAction>
                      </ListItem>
                    )
                  }) : null}
                    
                </List>
                {eliminada ? (
                  <Snackbar
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    open={eliminada}
                    autoHideDuration={7000}
                    onClose={handleCloseAlert}
                  >
                    <Alert onClose={handleCloseAlert} severity="error">
                      El punto de retiro se ha eliminado
                    </Alert>
                  </Snackbar>
                ) : (
                  ""
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
    puntoRetiro: state.firestore.ordered.puntoRetiro,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    eliminarPuntoRetiro: (id) => dispatch(eliminarPuntoRetiro(id)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "puntoRetiro" }])
)(PuntosEntrega);
