import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogComponent from "../Dialog";
import { Grid, Avatar, IconButton } from "@material-ui/core";
import { format } from "date-fns";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
}));

function Notificaciones() {
  const classes = useStyles();
  //Estados

  //Estado checked del switch de geolocalizacion
  const [state, setState] = React.useState({
    activo: false,
    oculto: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div>
      <div className="prom-title-container">
        <h1>Notificaciones</h1>
      </div>
      <div className="subtitulo-notif">
        <h6>Gestioná las notificaciones push que enviás a los usuarios</h6>
      </div>
      <div className="contenedor-todo-notif">
        <Card className="card-notif">
          <CardContent className="card-content-notif">
            <div>
              <FormControlLabel
                value="activGeoloc"
                control={
                  <Switch
                    color="primary"
                    checked={state.activo}
                    onChange={handleChange}
                    name="activo"
                  />
                }
                label="Notificaciones por ubicación cercana"
                labelPlacement="start"
              />
            </div>
            <div className="inputPerfil">
              <TextField
                disabled
                id="outlined-disabled"
                label="Nombre del comercio"
                value="Adidongas"
                //value={props.profile.nombreComercio}
                variant="outlined"
                name="usuario"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Notificaciones;
