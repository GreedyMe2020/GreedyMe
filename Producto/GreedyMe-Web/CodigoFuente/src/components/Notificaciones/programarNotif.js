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
import { connect } from "react-redux";
import firebase from "../../firebase/config";
import { format } from "date-fns";
import MenuItem from "@material-ui/core/MenuItem";

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

const notificados = [
  { value: "Usuarios con comerico favorito" },
  { value: "Todos los usuarios" },
];

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ProgramarNotificaciones(props) {
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

  const [promos, setPromos] = React.useState(promociones);

  const beneficios = [];
  promociones.map((promo) => {
    beneficios.push({
      name:
        promo.tipoProveedor +
        " " +
        promo.valueProveedor +
        " " +
        promo.otroProveedor +
        " " +
        promo.tipoPromo +
        " " +
        promo.valuePromo +
        " " +
        promo.otraPromo +
        "válida desde el " +
        format(promo.desdeVigencia.toDate(), "dd/MM/yyyy") +
        " hasta el " +
        format(promo.hastaVigencia.toDate(), "dd/MM/yyyy"),
    });
  });

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

  //Estados para los tipos de notificaciones hardcodeados
  const [notificaciones, setNotificaciones] = React.useState("");

  const handleChangeNotificaciones = (event) => {
    setNotificaciones(event.target.value);
  };

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
                  value={props.profile.nombreComercio}
                  variant="outlined"
                  name="usuario"
                />
                <TextField
                  disabled
                  fullWidth
                  className="text-sucursal"
                  id="outlined-disabled"
                  label="Sucursal"
                  value={props.profile.sucursal}
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
                  onChange={handleChangeNotificaciones}
                  name="tipoCliente"
                  value={notificaciones}
                  //value={formData.tipoCliente}
                  variant="outlined"
                  validators={["required"]}
                  errorMessages={["*Este campo es obligatorio"]}
                >
                  {notificados.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
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
                      label="Beneficio"
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

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramarNotificaciones);
