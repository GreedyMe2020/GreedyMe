import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import {
  ValidatorForm,
  SelectValidator,
} from "react-material-ui-form-validator";
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
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

function Notificaciones() {
  const classes = useStyles();
  /* const [formData, setFormData] = React.useState({
    id: props.auth.uid,
    usuario: "",
    sucursal: "",
    tipoCliente: "",
    promocion: "",
    programarEnvio: "",
    ubicacion: "",
    descripcion: "",
  }); */

  const beneficios = [
    { name: "3x2 Club Personal, válida desde el" },
    { name: "20% Nuevo club, válida desde el" },
    { name: "5*2 Club La Voz, válida desde el" },
    { name: "4x2 Talleres, válida desde el" },
    { name: "APEPE La Voz, válida desde el" },
    { name: "PEPE La Voz, válida desde el" },
    { name: "1x2 Club Personal, válida desde el" },
    { name: "4x2 OLA, válida desde el" },
    { name: "5*2 PEPE La Voz, válida desde el" },
  ];

  const options = beneficios.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? firstLetter : firstLetter,
      ...option,
    };
  });

  //Estados

  //Estado checked del switch de geolocalizacion
  const [state, setState] = React.useState({
    activo: false,
    oculto: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleChangeCliente = (event) => {
    formData[event.target.name] = event.target.value;
    setFormData({ ...formData });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // props.editarDatos(formData);
    // setSubmitted({ submitted: true }, () => {
    //   setTimeout(() => setSubmitted({ submitted: false }), 5000);
    // });
  };

  const form = React.createRef();

  return (
    <div>
      <div className="prom-title-container">
        <h1>Notificaciones</h1>
      </div>
      <div className="subtitulo-notif">
        <h6>Gestioná las notificaciones push que enviás a los usuarios</h6>
      </div>
      <ValidatorForm ref={form} onSubmit={handleSubmit}>
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
              <div className="input-nom-suc ">
                <TextField
                  disabled
                  fullWidth
                  className="text-usuario"
                  id="outlined-disabled"
                  label="Nombre del comercio"
                  value="Adidongas"
                  //value={props.profile.nombreComercio}
                  variant="outlined"
                  name="usuario"
                />
                <TextField
                  disabled
                  fullWidth
                  className="text-sucursal"
                  id="outlined-disabled"
                  label="Sucursal"
                  value="Pationgo Olmos"
                  //value={props.profile.sucursal}
                  variant="outlined"
                  name="sucursal"
                />
              </div>
              <div className="input-tipo-clientes">
                <h6 className="texto-tipo-cliente">
                  La notificación está dirigida a:
                </h6>
                <SelectValidator
                  className="select-tipo-cliente"
                  fullWidth
                  label="Tipo de cliente"
                  onChange={handleChangeCliente}
                  name="tipoCliente"
                  //value={formData.tipoCliente}
                  variant="outlined"
                  validators={["required"]}
                  errorMessages={["*Este campo es obligatorio"]}
                >
                  {/* ACA DEBERIA IR "TODOS LOS USUARIOS o USUARIOS DE LOCALES FAVORITOS
                {proveedor.map((option) => (
                  <MenuItem key={option.tipo} value={option.tipo}>
                    {option.tipo}
                  </MenuItem>
                ))} */}
                </SelectValidator>
              </div>
              <div className="input-buscador-beneficio">
                <h6 className="texto-beneficio">
                  Beneficio que va a notificar:
                </h6>
                <Autocomplete
                  className="buscador-ben"
                  fullWidth
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
            </CardContent>
          </Card>
        </div>
      </ValidatorForm>
    </div>
  );
}

export default Notificaciones;
