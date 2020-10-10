import React, { useState, useEffect } from "react";
import NavBarSup from "../Principal/navBarSuperior";
import { makeStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Card } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { connect } from "react-redux";
import firebase from "../../firebase/config";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: "#ececec",
  },
}));

function NuevaContraseña(props) {
  const classes = useStyles();
  const [seleccionado, setSeleccionado] = React.useState(0);
  const [opcion, setOpcion] = React.useState(0);
  const [cambio, setCambio] = useState(false);

  const [formData, setFormData] = useState({
    contraseñaActual: "",
    nuevaContraseña: "",
    repeticion: "",
  });

  const handleChange = (event) => {
    formData[event.target.name] = event.target.value;
    setFormData({ ...formData });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var credentials = firebase.auth.EmailAuthProvider.credential(
          user.email,
          formData.contraseñaActual
        );
        user
          .reauthenticateWithCredential(credentials)
          .then(function () {
            user.updatePassword(formData.nuevaContraseña);
          })
          .then(() => {
            setCambio(true);
            console.log(cambio);
          })
          .catch(function (error) {
            setCambio(false);
          });
      } else {
        console.log("Error, no se pudo cambiar la contraseña");
      }
    });
  };

  ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
    if (value !== formData.nuevaContraseña) {
      return false;
    }
    return true;
  });
  const form = React.createRef();

  return (
    <div>
      <ValidatorForm ref={form} onSubmit={handleSubmit} id="validator-form">
        <Grid container spacing={1}>
          <Grid item xs={12} md={12}>
            <TextValidator
              id="outlined-password-input"
              label="Contraseña Actual"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              required
              value={formData.contraseñaActual}
              onChange={handleChange}
              name="contraseñaActual"
              fullWidth
              validators={["required"]}
              errorMessages={["*Este campo es obligatorio"]}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextValidator
              id="outlined-password-input"
              label="Nueva Contraseña"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              required
              value={formData.nuevaContraseña}
              onChange={handleChange}
              name="nuevaContraseña"
              fullWidth
              validators={[
                "matchRegexp:^(?=.{8,16}$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])",
              ]}
              errorMessages={[
                "La contraseña debe entre 8 y 16 caracteres y, por lo menos una mayúscula, una minúscula y un número",
              ]}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextValidator
              id="outlined-password-input"
              label="Repite la Contraseña"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              required
              value={formData.repeticion}
              onChange={handleChange}
              name="repeticion"
              fullWidth
              validators={["isPasswordMatch", "required"]}
              errorMessages={[
                "Las contraseñas deben ser iguales",
                "*Este campo es obligatorio",
              ]}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <div className="perfil-btnCont">
              <Button
                variant="contained"
                id="btn-azul"
                className="btnAdminPerfil"
                type="submit"
                startIcon={<SaveIcon />}
              >
                Guardar cambios
              </Button>
            </div>
          </Grid>
        </Grid>
      </ValidatorForm>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(NuevaContraseña);
