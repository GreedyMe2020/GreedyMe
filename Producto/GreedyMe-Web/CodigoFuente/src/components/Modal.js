import React from 'react';
import UseModal from './useModal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { ButtonEj } from '../components/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from 'react-material-ui-form-validator';
import Grid from '@material-ui/core/Grid';
import { registrarSolicitud } from '../firebase/apiLanding';

const rubros = [
  {
    value: 'Belleza',
    nombre: 'Belleza',
  },
  {
    value: 'Deportes',
    nombre: 'Deportes',
  },
  {
    value: 'Entretenimiento',
    nombre: 'Entretenimiento',
  },
  {
    value: 'Estetica',
    nombre: 'Estética',
  },
  {
    value: 'Farmacia',
    nombre: 'Farmacia',
  },
  {
    value: 'Gastronomia',
    nombre: 'Gastronomía',
  },
  {
    value: 'Hogar',
    nombre: 'Hogar',
  },
  {
    value: 'Indumentaria',
    nombre: 'Indumentaria',
  },
  {
    value: 'Librerias',
    nombre: 'Librerías',
  },
  {
    value: 'MueblesYDecoracion',
    nombre: 'Muebles y Decoración',
  },
  {
    value: 'Niños',
    nombre: 'Niños',
  },
  {
    value: 'Supermercados',
    nombre: 'Supermercados',
  },
  {
    value: 'Tecnologia',
    nombre: 'Tecnologia',
  },
  {
    value: 'Turismo',
    nombre: 'Turismo',
  },
  {
    value: 'Vehiculos',
    nombre: 'Vehículos',
  },
  {
    value: 'Otro',
    nombre: 'Otro',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
    cont: {
      flexGrow: 1,
    },
  },
  cruz: {
    position: 'absolute',
    right: theme.spacing(1),
    top: '8px',
    color: theme.palette.grey[500],
  },
  submitButton: {
    textAlign: 'center',
  },
  border: {
    paddingRight: 8,
  },
}));

export default function FormDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    nombre: '',
    apellido: '',
    email: '',
    comercio: '',
    telefono: '',
    web: '',
    sucursal: '',
    rubro: '',
    dudas: '',
  });
  const [submitted, setSubmitted] = React.useState(false);

  const [showModal, setModal] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClear = () => {
    setFormData({
      nombre: '',
      apellido: '',
      email: '',
      comercio: '',
      telefono: '',
      web: '',
      sucursal: '',
      rubro: '',
      dudas: '',
    });
  };

  const handleSend = () => {
    setSubmitted(false);
  };

  const handleClose = () => {
    handleClear();
    setOpen(false);
  };

  const handleChange = (event) => {
    formData[event.target.name] = event.target.value;
    setFormData({ ...formData });
  };

  const handleSubmit = () => {
    setSubmitted({ submitted: true }, () => {
      setTimeout(() => setSubmitted({ submitted: false }), 5000);
    });
    setOpen(false);
    mandarForm(formData);
    handleClear();
  };

  const mandarForm = async (formData) => {
    return await registrarSolicitud(formData);
  };

  const toggleModal = () => {
    setModal(!showModal);
  };

  const form = React.createRef();

  React.useEffect(() => {
    //esto no corre en el primer render, se ejecuta luego del return
    submitted ? toggleModal() : null; //Habilita a que se abra un modal de confirmacion de envio de mail.
  }, [submitted, setSubmitted]); //lista de dependencias, cosa de que se refresque cuando esto cambia.

  return (
    <div>
      <div className="botonRegistarse">
        <ButtonEj
          text="Quiero saber más"
          style="btnRegistro"
          onClick={handleClickOpen}
        ></ButtonEj>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Formulario de contacto
          <IconButton
            aria-label="close"
            id="btn"
            className={classes.cruz}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Completá el siguiente formulario y personal de GreedyMe te
            contactará para seguir con tu registro.
          </DialogContentText>

          <ValidatorForm
            className={classes.root}
            ref={form}
            onSubmit={handleSubmit}
          >
            <Grid container className={classes.cont} spacing={1}>
              <Grid item xs={12} md={6}>
                <TextValidator
                  id="textValidator"
                  label="Nombre"
                  variant="outlined"
                  onChange={handleChange}
                  className={classes.border}
                  fullWidth
                  name="nombre"
                  value={formData.nombre}
                  required
                  validators={[
                    'required',
                    'matchRegexp:^([a-zA-Z ]){2,30}$',
                  ]}
                  errorMessages={[
                    '*Este campo es obligatorio',
                    'El nombre no es válido',
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextValidator
                  label="Apellido"
                  variant="outlined"
                  onChange={handleChange}
                  className={classes.border}
                  fullWidth
                  name="apellido"
                  value={formData.apellido}
                  required
                  validators={[
                    'required',
                    'matchRegexp:^([a-zA-Z ]){2,30}$',
                  ]}
                  errorMessages={[
                    '*Este campo es obligatorio',
                    'El apellido no es válido',
                  ]}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextValidator
                  label="Email"
                  variant="outlined"
                  onChange={handleChange}
                  className={classes.border}
                  fullWidth
                  name="email"
                  value={formData.email}
                  required
                  validators={['required', 'isEmail']}
                  errorMessages={[
                    '*Este campo es obligatorio',
                    'El email no es válido',
                  ]}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextValidator
                  label="Teléfono"
                  variant="outlined"
                  onChange={handleChange}
                  fullWidth
                  className={classes.border}
                  name="telefono"
                  value={formData.telefono}
                  required
                  validators={[
                    'required',
                    'matchRegexp:^([0-9 ]){2,20}$',
                  ]}
                  errorMessages={[
                    '*Este campo es obligatorio',
                    'El teléfono no es válido',
                  ]}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextValidator
                  label="Nombre del comercio"
                  variant="outlined"
                  onChange={handleChange}
                  className={classes.border}
                  fullWidth
                  name="comercio"
                  value={formData.comercio}
                  required
                  validators={['required']}
                  errorMessages={['*Este campo es obligatorio']}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextValidator
                  label="Sitio web"
                  variant="outlined"
                  onChange={handleChange}
                  className={classes.border}
                  fullWidth
                  name="web"
                  value={formData.web}
                  validators={[
                    'matchRegexp:(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}',
                  ]}
                  errorMessages={[
                    'El sitio web no es válido.',
                  ]}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextValidator
                  label="Sucursal"
                  variant="outlined"
                  onChange={handleChange}
                  fullWidth
                  className={classes.border}
                  name="sucursal"
                  value={formData.sucursal}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <SelectValidator
                  label="Rubro"
                  variant="outlined"
                  onChange={handleChange}
                  className={classes.border}
                  fullWidth
                  name="rubro"
                  value={formData.rubro}
                  required
                  validators={['required']}
                  errorMessages={['*Este campo es obligatorio']}
                >
                  {rubros.map((option) => (
                    <MenuItem
                      key={option.nombre}
                      value={option.nombre}
                    >
                      {option.nombre}
                    </MenuItem>
                  ))}
                </SelectValidator>
              </Grid>

              <Grid item xs={12} md={12}>
                <TextField
                  id="outlined-multiline-static"
                  label="Dudas"
                  multiline
                  value={formData.dudas}
                  className={classes.border}
                  onChange={handleChange}
                  fullWidth
                  name="dudas"
                  variant="outlined"
                />
              </Grid>

              <Grid item md={12} xs={12}>
                <div className={classes.submitButton}>
                  <Button
                    variant="contained"
                    id="btn-azul"
                    type="submit"
                    onClick={handleSend}
                    startIcon={<SaveIcon />}
                  >
                    Enviar
                  </Button>
                </div>
              </Grid>
            </Grid>
          </ValidatorForm>
        </DialogContent>
      </Dialog>
      {showModal ? (
        <UseModal>
          <div>
            <h5>
              ¡Muchas gracias! En la brevedad nos contactaremos con usted. 
              Revise la casilla de correo "No deseado".
            </h5>
            <Button
              color="primary"
              variant="contained"
              className={classes.margin}
              type="submit"
              onClick={toggleModal}
            >
              Salir
            </Button>
          </div>
        </UseModal>
      ) : null}
    </div>
  );
}
/* 
export function MyModalWithGrid(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Formulario de registro
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <FormLanding />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

 */
