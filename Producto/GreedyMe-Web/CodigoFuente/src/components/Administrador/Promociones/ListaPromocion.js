import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";
import DialogComponent from "../../Dialog";
import Tooltip from "@material-ui/core/Tooltip";
import { Grid, Avatar, CssBaseline } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import FormTipoPromocion from "./FormTipoPromocion";
import FormPromocion from "./FormPromocion";
import ModalAdministradorPr from "../modal-admin-pr";
import { eliminarTipoPromocion } from "../../../redux/actions/adminActions";
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

function ListaPromocion(props) {
  const classes = useStyles();

  //Estado del dialog (abierto/cerrado)
  const [open, setOpen] = React.useState(false);
  //para eliminar
  const [eliminar, setEliminar] = React.useState(null);
  const [currentId, setCurrentId] = React.useState(null);

  //Snackbar cuando se elimina
  const [eliminada, setEliminada] = React.useState(false);

  React.useEffect(() => {
    if (currentId) {
      props.eliminarTipoPromocion({
        id: currentId,
      });
    }
  }, [currentId]);

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
  const form = React.createRef();
  return (
    <div>
      <ModalAdministradorPr
        title="Beneficios"
        button="Cargar beneficio"
        button2="Cargar tipo beneficio"
        titleModal="Cargar nuevo beneficio"
        titleModal2="Cargar nuevo tipo de beneficio"
        openContent={<FormPromocion />}
        openContent2={<FormTipoPromocion />}
        placeholder="Buscar beneficio…"
      />
      <div className="contenedorTodo">
        <Card className="cardPromo">
          <CardContent className="cardContentePromo">
            <Grid item xs={12} md={12}>
              <div className={classes.demo}>
                <List>
                  {props.tipoPromo &&
                    props.tipoPromo.map((item) => {
                      return (
                        <ListItem key={item.id}>
                          <ListItemAvatar>
                            <Avatar
                              variant="square"
                              src={require("../../../../Multimedia/Sistema-svg/price-tag (5).svg")}
                            ></Avatar>
                          </ListItemAvatar>

                          <div className="elementoListaProm">
                            <ListItemText
                              //asi podes ir accediendo a todos los datos asi los acomodas como quieras
                              primary={
                                <React.Fragment>
                                  <Typography className={classes.inline}>
                                    {item.tipo}
                                  </Typography>
                                  {item.lista.map((ite) => {
                                    return ite.valor + " - ";
                                  })}
                                </React.Fragment>
                              }
                            />
                          </div>
                          <ListItemSecondaryAction>
                            <Tooltip title="Eliminar" arrow>
                              <IconButton
                                onClick={() => {
                                  setEliminar(item.id);
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
                {eliminada ? (
                  <Snackbar
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    open={eliminada}
                    autoHideDuration={8000}
                    onClose={handleCloseAlert}
                  >
                    <Alert onClose={handleCloseAlert} severity="error">
                      El beneficio se ha eliminado
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
  console.log(state);
  return {
    proveedores: state.firestore.ordered.proveedorServicio,
    tipoPromo: state.firestore.ordered.tipoPromocion,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    eliminarTipoPromocion: (formData) =>
      dispatch(eliminarTipoPromocion(formData)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: "proveedorServicio" },
    { collection: "tipoPromocion" },
  ])
)(ListaPromocion);
