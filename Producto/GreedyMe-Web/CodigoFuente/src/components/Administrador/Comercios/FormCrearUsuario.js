import React, { useState, useEffect } from "react";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import firebase from "../../../firebase/config";
import SaveIcon from "@material-ui/icons/Save";

//funcion para traer los rubros
const rubros = [];
const rubro = () => {
  const firestore = firebase.firestore();
  firestore
    .collection("rubros")
    .orderBy("nombre")
    .get()
    .then((snapShots) => {
      snapShots.forEach((doc) => {
        const data = doc.data();
        rubros.push({
          ...data,
          id: doc.id,
        });
      });
    });
};
rubro();

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function FormCrearUsuario(props) {
  //datos de creacion de usuarios
  const [formData, setFormData] = React.useState({
    email: "",
    CUIT: "",
    nombreComercio: "",
    web: "",
    contraseña: "",
    repetirContraseña: "",
    sucursal: "",
    rubro: "",
    telefono: "",
    instagram: "",
    facebook: "",
    direccion: "",
  });

  const [showModal, setModal] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  //funcion para poner lo que escribe en el formdata
  const handleChange = (event) => {
    formData[event.target.name] = event.target.value;
    setFormData({ ...formData });
  };
  //funcion para crear el usuario
  const handleSubmit = (e) => {
    e.preventDefault();

    props.crearComercio(formData);

    setOpen(true);
  };
  ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
    if (value !== formData.contraseña) {
      return false;
    }
    return true;
  });

  const form = React.createRef();

  return (
    <div className="perfil-validator-form">
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
    usuarioFalla: state.admin.usuarioFalla,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(FormCrearUsuario);
