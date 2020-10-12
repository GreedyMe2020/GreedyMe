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
import { cambiarContraseña, resetearValoresCambiarContraseña } from "../../redux/actions/comActions"
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

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
  //estados de los carteles
  const [openContraseña, setOpenContraseña] = React.useState(false);
  const [open2Contraseña, setOpen2Contraseña] = React.useState(false);
  //funciones para cerrar carteles
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenContraseña(false);
  };

  const handleClose2 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen2Contraseña(false);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleChange2 = (event) => {
    formData[event.target.name] = event.target.value;
    setFormData({ ...formData });
  };

  const handleSubmit2 = () => {
    props.cambiarContraseña(formData)
    setFormData({
      contraseñaActual: "",
      nuevaContraseña: "",
      repeticion: "", 
    })
  };

  //Effects para abrir carteles
  /*const abrirCarteldeConfirmacion = React.useEffect(() => {
    if(props.contraseña !== null){
      setOpenContraseña(true);
      props.resetearValoresCambiarContraseña()
      setFormData({
        contraseñaActual: "",
        nuevaContraseña: "",
        repeticion: "",
      })
    }
  },[props.contraseña] )

  const abrirCarteldeError = React.useEffect(() => {
    if(props.contraseñaError !== null){
      setOpen2Contraseña(true);
      props.resetearValoresCambiarContraseña()
    }
  },[props.contraseñaError] )*/

  //validacion para que los campos sean iguales
  ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
    if (value !== formData.nuevaContraseña) {
      return false;
    }
    return true;
  });
  const form2 = React.createRef();

  return (
    <div>
      <ValidatorForm ref={form2} onSubmit={handleSubmit2} id="validator-form">
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
              onChange={handleChange2}
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
              onChange={handleChange2}
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
              onChange={handleChange2}
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
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={openContraseña}
          autoHideDuration={8000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            ¡La contraseña ha sido modificada correctamente!
          </Alert>
        </Snackbar>
          <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={open2Contraseña}
          autoHideDuration={8000}
          onClose={handleClose2}
        >
          <Alert onClose={handleClose2} severity="error">
            La contraseña actual es incorrecta.
          </Alert>
        </Snackbar>
      </ValidatorForm>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    contraseña: state.comercio.contraseña,
    contraseñaError: state.comercio.contraseñaError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cambiarContraseña: (formData) => dispatch(cambiarContraseña(formData)),
    resetearValoresCambiarContraseña: () => dispatch(resetearValoresCambiarContraseña()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NuevaContraseña);
