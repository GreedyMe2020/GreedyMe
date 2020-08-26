import React, { useState, useEffect } from "react";
import NavBarSup from "../Principal/navBarSuperior";
import { makeStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Card } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { connect } from "react-redux";
import { cambiarContraseña } from "../../redux/actions/comActions";
import firebase from "../../firebase/config";

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
          })
          .catch(function (error) {
            setCambio(false);
          });
      } else {
        console.log("no paso naranja");
      }
    });
  };

  const getOpcionSeleccionada = (seleccionado) => {
    if (seleccionado === 0) {
      return <h3>Pagina principal</h3>;
    }
    if (seleccionado === 1) {
      return <h3>En esta pagina iria lo de Carga cupón</h3>;
    }
    if (seleccionado === 2) {
      return <CargaPromociones />;
    }
    if (seleccionado === 3) {
      return <h3>Aca van Mis promociones</h3>;
    }
    if (seleccionado === 4) {
      return <h3>Aca las estadisticas</h3>;
    }
    if (seleccionado === 5) {
      return <h3>y aca las notificaciones</h3>;
    }
    if (seleccionado === 6) {
      return <Perfil />;
    }
    if (seleccionado === 7) {
      return <h3>Suscripciones</h3>;
    }
    if (seleccionado === 8) {
      return <h3>Ayuda y soporte</h3>;
    }
  };

  const form = React.createRef();

  return (
    <div>
      <NavBarSup
        appBar={classes.appBar}
        seleccionado={seleccionado}
        setSeleccionado={setSeleccionado}
      />

      <ValidatorForm ref={form} onSubmit={handleSubmit} id="validator-form">
        <h4 className="tituloCardAdminP1">Información de inicio de sesión</h4>
        <Card id="cardAdminCuenta">
          <Card.Body className="contCardPerfil1">
            <div className="inputPerfil">
              <div className="inputPerfil">
                <TextValidator
                  id="outlined-password-input"
                  label="Contraseña Actual"
                  type="password"
                  autoComplete="current-password"
                  variant="outlined"
                  defaultValue={formData.contraseñaActual}
                  onChange={handleChange}
                  name="contraseñaActual"
                  fullWidth
                  validators={["required"]}
                  errorMessages={["*Este campo es obligatorio"]}
                />
              </div>
              <div className="inputPerfil">
                <TextValidator
                  id="outlined-password-input"
                  label="Nueva Contraseña"
                  type="password"
                  autoComplete="current-password"
                  variant="outlined"
                  defaultValue={formData.nuevaContraseña}
                  onChange={handleChange}
                  name="nuevaContraseña"
                  fullWidth
                  validators={["required"]}
                  errorMessages={["*Este campo es obligatorio"]}
                />
              </div>
              <div className="inputPerfil">
                <TextValidator
                  id="outlined-password-input"
                  label="Repite la Contraseña"
                  type="password"
                  autoComplete="current-password"
                  variant="outlined"
                  defaultValue={formData.repeticion}
                  onChange={handleChange}
                  name="repeticion"
                  fullWidth
                  validators={["required"]}
                  errorMessages={["*Este campo es obligatorio"]}
                />
              </div>
            </div>
          </Card.Body>
        </Card>
        <div className="btnCont">
          <Button
            variant="contained"
            id="btnAdminPerfil"
            className="btnAdminPerfil"
            type="submit"
            onClick={handleSubmit}
            startIcon={<SaveIcon />}
          >
            Guardar cambios
          </Button>
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

const mapDispatchToProps = (dispatch) => {
  return {
    cambiarContraseña: (password) => dispatch(cambiarContraseña(password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NuevaContraseña);
