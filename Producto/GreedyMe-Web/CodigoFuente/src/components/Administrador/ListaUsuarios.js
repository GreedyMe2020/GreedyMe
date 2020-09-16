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
import DialogComponent from "../Dialog";
import { Grid, Avatar, IconButton } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";

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

  return (
    <div>
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
                                <React.Fragment>
                                  <Typography className={classes.inline}>
                                    {user.email}
                                  </Typography>
                                  {user.CUIT}
                                </React.Fragment>
                              }
                              secondary={"web: " + user.web}
                            />
                          </div>
                          <ListItemSecondaryAction>
                            <Tooltip title="Eliminar" arrow>
                              <IconButton edge="end" aria-label="Eliminar">
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                            <DialogComponent
                              open={open}
                              setOpen={setOpen}
                              handleClose={handleClose}
                              title={"¿Estás seguro de eliminar el usuario?"}
                              text={
                                "Una vez que aceptes eliminar el usuario, el mismo no podrá ser recuperado."
                              }
                              btnText={"Eliminar"}
                            />
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
