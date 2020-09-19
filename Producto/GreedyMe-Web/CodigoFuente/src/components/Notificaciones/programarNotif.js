import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  MuiPickersUtilsProvider,
  DatePicker,
  TimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import {
  ValidatorForm,
  SelectValidator,
} from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";

import SnoozeIcon from "@material-ui/icons/Snooze";
import AlarmIcon from "@material-ui/icons/AddAlarm";
import TodayIcon from "@material-ui/icons/Today";
import { IconButton, InputAdornment } from "@material-ui/core";
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
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ProgramarNotificaciones() {
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
  const [stateGeo, setStateGeo] = React.useState({
    activo: false,
    oculto: true,
  });

  const [stateProgramar, setStateProgramar] = React.useState({
    activo: false,
    oculto: true,
  });

  //Estado para la fecha y hora de envio de notif
  const [envioNotif, handleEnvioNotif] = React.useState(new Date());
  const [selectedDate, handleDateChange] = useState(new Date());

  const handleChangeEnvioUbicacion = (event) => {
    setStateGeo({ ...stateGeo, [event.target.name]: event.target.checked });
  };

  const handleChangeProgramarEnvio = (event) => {
    setStateProgramar({
      ...stateProgramar,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChangeCliente = (event) => {
    formData[event.target.name] = event.target.value;
    setFormData({ ...formData });
  };

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
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
      <ValidatorForm ref={form} onSubmit={handleSubmit}>
        <div className="contenedor-todo-notif">
          <Card className="card-notif">
            <CardContent className="card-content-notif">
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
              <div className="texto-notif-geo">
                <FormControlLabel
                  value="activGeoloc"
                  control={
                    <Switch
                      color="primary"
                      checked={stateGeo.activo}
                      onChange={handleChangeEnvioUbicacion}
                      name="activo"
                    />
                  }
                  label="Notificar solo a usuarios cercanos a mi tienda"
                  labelPlacement="end"
                />
              </div>
              <div className="text-envio-notif">
                <FormControlLabel
                  value="activEnvio"
                  control={
                    <Switch
                      color="primary"
                      checked={stateProgramar.activo}
                      onChange={handleChangeProgramarEnvio}
                      name="activo"
                    />
                  }
                  label="Programar envío de notificación"
                  labelPlacement="end"
                />
              </div>
              {stateProgramar.activo ? (
                <div className="programar-notif">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      className="fecha-notif"
                      autoOk
                      disableToolbar
                      fullWidth
                      inputVariant="outlined"
                      name="fechaNotif"
                      label="Fecha de envío"
                      minDate={new Date()}
                      minDateMessage="*La fecha no puede ser menor al día de hoy"
                      format="dd/MM/yyyy"
                      value={envioNotif}
                      variant="inline"
                      onChange={(data) => handleEnvioNotif(data)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton>
                              <TodayIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TimePicker
                      className="hora-notif"
                      clearable
                      autoOk
                      disableToolbar
                      fullWidth
                      inputVariant="outlined"
                      variant="inline"
                      ampm={false}
                      label="Hora de envío"
                      value={selectedDate}
                      onChange={(data) => handleDateChange(data)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton>
                              <AlarmIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </div>
              ) : (
                ""
              )}

              <div className="boton-enviar-notificacion">
                <div>
                  <Button
                    variant="contained"
                    className="btn-env-not"
                    type="submit"
                  >
                    Enviar notificación
                  </Button>
                </div>
                <Snackbar
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  open={open}
                  autoHideDuration={8000}
                  onClose={handleClose}
                >
                  <Alert onClose={handleClose} severity="success">
                    La notificación se enviará correctamente!
                  </Alert>
                </Snackbar>
              </div>
            </CardContent>
          </Card>
        </div>
      </ValidatorForm>
    </div>
  );
}

export default ProgramarNotificaciones;
