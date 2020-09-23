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
  TextValidator,
} from "react-material-ui-form-validator";
import firebase from "../../../firebase/config";
import { SettingsCellOutlined } from "@material-ui/icons";
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

function ModalActualizarComercio(props) {
  const [open, setOpen] = React.useState(false);

  const [formData, setFormData] = React.useState({
    id: props.comercio.id,
    email: props.comercio.email,
    CUIT: props.comercio.CUIT,
    nombreComercio: props.comercio.nombreComercio,
    web: props.comercio.web,
    sucursal: props.comercio.sucursal,
    rubro: props.comercio.rubro,
    telefono: props.comercio.telefono,
    instagram: props.comercio.instagram,
    facebook: props.comercio.facebook,
    direccion: props.comercio.direccion,
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

  const handleChange = (event) => {
    formData[event.target.name] = event.target.value;
    setFormData({ ...formData });
  };

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
        <Grid item xs={12} md={12} className="admin-btn-cont">
          <Button
            variant="contained"
            id="btn-azul"
            className="btn-azul"
            type="submit"
            startIcon={<SaveIcon />}
          >
            Guardar cambios
          </Button>
        </Grid>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={open}
          autoHideDuration={8000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            El comercio se ha actualizado correctamente!!
          </Alert>
        </Snackbar>
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
