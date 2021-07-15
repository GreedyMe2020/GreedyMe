import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  MuiPickersUtilsProvider,
  DatePicker,
  TimePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {
  ValidatorForm,
  SelectValidator,
} from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import AlarmIcon from '@material-ui/icons/AddAlarm';
import TodayIcon from '@material-ui/icons/Today';
import { IconButton, InputAdornment } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import firebase from '../../firebase/config';
import { format } from 'date-fns';
import MenuItem from '@material-ui/core/MenuItem';
import {
  generarNotificacionesTodos,
  generarNotificacionesFavoritos,
} from '../../redux/actions/comActions';

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
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
}));

const notificados = [
  { value: 'Usuarios con comercio favorito' },
  { value: 'Todos los usuarios' },
];

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ProgramarNotificaciones(props) {
  const classes = useStyles();
  //estado de lo que se renderiza
  const [options, setOptions] = React.useState([]);
  //estado para el nombre del comercio
  const [nombreComercio, setNombreComercio] = React.useState('');
  //estado para la sucursal del comercio
  const [sucursal, setSucursal] = React.useState('');
  //estado para obtener el beneficio elegido
  const [beneficioElegido, setBeneficioElegido] = React.useState('');

  const [notificados, setNotificados] = React.useState([
    { value: 'Usuarios con comercio favorito' },
    { value: 'Todos los usuarios' },
  ]);

  //use effect que trae los datos
  React.useEffect(() => {
    if (props.profile.tipoSuscripcion === 0) {
      setNotificados([{ value: 'Usuarios con comercio favorito' }]);
    }
    const obtenerPromociones = async () => {
      const firestore = firebase.firestore();
      try {
        const promociones = await firestore
          .collection('usuarioComercio')
          .doc(props.auth.uid)
          .collection('promociones')
          .get();
        const arrayPromociones = promociones.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const beneficios = [];
        arrayPromociones.map((promo) => {
          beneficios.push({
            name:
              promo.tipoPromo +
              ' ' +
              (promo.valuePromo === 'Otro'
                ? promo.otraPromo
                : promo.valuePromo) +
              ' ' +
              (promo.valueProveedor === 'Otro'
                ? promo.otroProveedor
                : promo.valueProveedor === 'Todos'
                ? 'Todos los Bancos'
                : promo.valueProveedor) +
              ', ' +
              (promo.tipoProveedor === 'Tarjetas de crédito' ||
              promo.tipoProveedor === 'Tarjetas de débito'
                ? promo.otroProveedor + ' '
                : '') +
              (promo.otroProveedor === 'Todas'
                ? 'las Tarjetas '
                : '') +
              'válida desde el ' +
              format(promo.desdeVigencia.toDate(), 'dd/MM/yyyy') +
              ' hasta el ' +
              format(promo.hastaVigencia.toDate(), 'dd/MM/yyyy') +
              '.',
          });
        });
        const opciones = beneficios.map((option) => {
          const firstLetter = option.name[0].toUpperCase();
          return {
            firstLetter: /[0-9]/.test(firstLetter)
              ? firstLetter
              : firstLetter,
            ...option,
          };
        });
        setOptions(opciones);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPromociones();
  }, []);

  React.useEffect(() => {
    const obtenerPerfil = async () => {
      const firestore = firebase.firestore();
      try {
        const perfiles = await firestore
          .collection('usuarioComercio')
          .where('email', '==', props.auth.email)
          .get();
        const arrayPerfiles = perfiles.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNombreComercio(arrayPerfiles[0].nombreComercio);
        setSucursal(arrayPerfiles[0].sucursal);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPerfil();
  }, []);

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
  const [notificaciones, setNotificaciones] = React.useState('');

  const handleChangeNotificaciones = (event) => {
    setNotificaciones(event.target.value);
  };

  const handleChangeBeneficios = (event) => {
    setBeneficioElegido(event.target.value);
  };

  const handleChangeEnvioUbicacion = (event) => {
    setStateGeo({
      ...stateGeo,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChangeProgramarEnvio = (event) => {
    setStateProgramar({
      ...stateProgramar,
      [event.target.name]: event.target.checked,
    });
  };

  /*const handleChangeCliente = (event) => {
    formData[event.target.name] = event.target.value;
    setFormData({ ...formData });
  };*/

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (notificaciones === 'Todos los usuarios') {
      props.generarNotificacionesTodos(
        nombreComercio,
        beneficioElegido,
        props.profile.photoURL,
      );
      setOpen(true);
    } else if (notificaciones === 'Usuarios con comercio favorito') {
      props.generarNotificacionesFavoritos(
        props.profile.tokensFavoritos,
        nombreComercio,
        beneficioElegido,
        props.profile.photoURL,
      );
      setOpen(true);
      console.log('entro por aca pa');
    }
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
                  value={nombreComercio}
                  variant="outlined"
                  name="usuario"
                />
                <TextField
                  disabled
                  fullWidth
                  className="text-sucursal"
                  id="outlined-disabled"
                  label="Sucursal"
                  value={sucursal}
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
                  required
                  variant="outlined"
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
                  inputValue={beneficioElegido}
                  onInputChange={(event, newInputValue) => {
                    setBeneficioElegido(newInputValue);
                  }}
                  options={options.sort(
                    (a, b) =>
                      -b.firstLetter.localeCompare(a.firstLetter),
                  )}
                  groupBy={(option) => option.firstLetter}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Beneficio"
                      variant="outlined"
                      required
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
                ''
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
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  open={open}
                  autoHideDuration={8000}
                  onClose={handleClose}
                >
                  <Alert onClose={handleClose} severity="success">
                    La notificación se envió correctamente!
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
  return {
    generarNotificacionesTodos: (titulo, mensaje, url) =>
      dispatch(generarNotificacionesTodos(titulo, mensaje, url)),
    generarNotificacionesFavoritos: (tokens, titulo, mensaje, url) =>
      dispatch(
        generarNotificacionesFavoritos(tokens, titulo, mensaje, url),
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProgramarNotificaciones);
