import React, { useState, useEffect } from "react";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import {
  MenuItem,
  FormControlLabel,
  TextField,
  Checkbox,
  Button,
  Divider,
  Grid,
} from "@material-ui/core";
import {
  ValidatorForm,
  SelectValidator,
} from "react-material-ui-form-validator";
import firebase from "../../../firebase/config";
import { SettingsCellOutlined } from "@material-ui/icons";
const firestore = firebase.firestore();

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ModalActualizarComercio(props) {
  const classes = useStyles();

  const [formData, setFormData] = React.useState({
    email: props.user.email,
    CUIT: props.user.CUIT,
    nombreComercio: props.user.nombreComercio,
    web: props.user.web,
    contraseña: props.user.contraseña,
    repetirContraseña: props.user.repetirContraseña,
    sucursal: props.user.sucursal,
    rubro: props.user.rubro,
    telefono: props.user.telefono,
    instagram: props.user.instagram,
    facebook: props.user.facebook,
    direccion: props.user.direccion,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    props.actualizar(formData);
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  //Para los rubros.
  const [valorRubro, setValorRubro] = React.useState([]);
  useEffect(() => {
    setValorRubro([]);
    //CREO QUE ESTO SE HACE ASI CON TODOS LOS RUBROS PERO NOSE
    if (formData.rubro === "Belleza") {
      setValorRubro(rubro[0].lista);
    } else if (formData.rubro === "Deporte") {
      setValorRubro(rubro[1].lista);
    }
  }, [formData.tipoProveedor, setFormData]);

  const form = React.createRef();
  return (
    <div className="contTodo">
      <ValidatorForm ref={form} onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid className="inputPerfil2" item xs={12} md={6}>
            <TextValidator
              fullWidth
              id="outlined-basic"
              label="Nombre del comercio"
              value={formData.nombreComercio}
              variant="outlined"
              name="nombreComercio"
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid className="inputPerfil2" item xs={12} md={6}>
            <TextValidator
              id="outlined-basic"
              label="Email"
              fullWidth
              value={formData.email}
              variant="outlined"
              onChange={handleChange}
              name="email"
              required
              validators={["isEmail"]}
              errorMessages={["El email no es válido"]}
            />
          </Grid>
          <Grid className="inputPerfil2" item xs={12} md={6}>
            <TextValidator
              id="outlined-password-input"
              label="Contraseña"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              value={formData.contraseña}
              name="contraseña"
              onChange={handleChange}
              fullWidth
              required
              validators={[
                "matchRegexp:^(?=.{8,16}$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])",
              ]}
              errorMessages={[
                "La contraseña debe entre 8 y 16 caracteres y, por lo menos una mayúscula, una minúscula y un número",
              ]}
            />
          </Grid>
          <Grid className="inputPerfil2" item xs={12} md={6}>
            <TextValidator
              id="outlined-password-input"
              label="Repetir contraseña"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              value={formData.repetirContraseña}
              name="repetirContraseña"
              onChange={handleChange}
              fullWidth
              required
              validators={["isPasswordMatch", "required"]}
              errorMessages={[
                "Las contraseñas deben ser iguales",
                "*Este campo es obligatorio",
              ]}
            />
          </Grid>
          <Grid className="inputPerfil2" item xs={12} md={6}>
            <TextValidator
              variant="outlined"
              id="outlined-basic"
              fullWidth
              name="CUIT"
              onChange={handleChange}
              value={formData.CUIT}
              label="CUIT"
              required
              validators={["matchRegexp:^([0-9 ]){11}$"]}
              errorMessages={["El CUIT no es válido"]}
            />
          </Grid>
          <Grid className="inputPerfil2" item xs={12} md={6}>
            <TextValidator
              id="outlined-basic"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              name="web"
              label="Sitio web"
              value={formData.web}
              validators={[
                "matchRegexp:^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$",
              ]}
              errorMessages={["La dirección no es válida"]}
            />
          </Grid>

          <Grid className="inputPerfil2" item xs={12} md={6}>
            <TextValidator
              variant="outlined"
              label="Sucursal"
              id="outlined-basic"
              fullWidth
              onChange={handleChange}
              name="sucursal"
              value={formData.sucursal}
              validators={["matchRegexp:^([a-zA-Z ]){2,30}$"]}
              errorMessages={["La sucursal no es válida"]}
            />
          </Grid>
          <Grid className="inputPerfil2" item xs={12} md={6}>
            <TextValidator
              variant="outlined"
              id="outlined-basic"
              label="Teléfono"
              fullWidth
              onChange={handleChange}
              name="telefono"
              value={formData.telefono}
              validators={["matchRegexp:^([0-9 ]){2,20}$"]}
              errorMessages={["El teléfono no es válido"]}
            />
          </Grid>
          <Grid className="inputPerfil2" item xs={12} md={6}>
            <SelectValidator
              variant="outlined"
              id="outlined-basic"
              label="Rubro"
              onChange={handleChange}
              name="rubro"
              fullWidth
              required
              value={formData.rubro}
              validators={["required"]}
              errorMessages={["*Este campo es obligatorio"]}
            >
              {rubros.map((option) => (
                <MenuItem key={option.nombre} value={option.nombre}>
                  {option.nombre}
                </MenuItem>
              ))}
            </SelectValidator>
          </Grid>
          <Grid className="inputPerfil2" item xs={12} md={3}>
            <TextValidator
              variant="outlined"
              id="outlined-basic"
              label="Instagram"
              fullWidth
              onChange={handleChange}
              name="instagram"
              value={formData.instagram}
              validators={["matchRegexp:^([a-zA-Z ]){2,30}$"]}
              errorMessages={["El usuario no es válido"]}
            />
          </Grid>
          <Grid className="inputPerfil2" item xs={12} md={3}>
            <TextValidator
              variant="outlined"
              id="outlined-basic"
              label="Facebook"
              fullWidth
              onChange={handleChange}
              name="facebook"
              value={formData.facebook}
              validators={["matchRegexp:^([a-zA-Z ]){2,30}$"]}
              errorMessages={["El usuario no es válido"]}
            />
          </Grid>
        </Grid>
        <div className="btnCont">
          <Button
            variant="contained"
            id="btnAdminPerfil"
            className="btnAdminPerfil"
            type="submit"
            startIcon={<SaveIcon />}
          >
            Crear comercio
          </Button>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            open={open}
            autoHideDuration={8000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="success">
              El comercio se ha creado correctamente!!
            </Alert>
          </Snackbar>
        </div>
      </ValidatorForm>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(ModalActualizarComercio);
