import React, { useState, useEffect } from "react";
import Search from "../Map/Search";
import NavBarSup from "../../components/Principal/navBarSuperior";
import { Card } from "react-bootstrap";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import classes from "../../components/Modal";
import Avatar from "@material-ui/core/Avatar";
import { editarDatos } from "../../redux/actions/comActions";
import { subirFoto } from "../../redux/actions/comActions";
import firebase from "../../firebase/config";
import UseModal from "../useModal";
import { makeStyles } from "@material-ui/core/styles";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import SaveIcon from "@material-ui/icons/Save";
import Map from "../Map/Map";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import usePlacesAutocomplete from "use-places-autocomplete";
import { useLoadScript } from "@react-google-maps/api";
/* import { db } from "../firebase/config"; */
const libraries = ["places"];
/*const rubros = [];
const rubro = () => {
  db.collection("rubros")
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
rubro();*/
import Geocode from "react-geocode";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

const rubros = [
  {
    value: "Belleza",
    nombre: "Belleza",
  },
  {
    value: "Deportes",
    nombre: "Deportes",
  },
  {
    value: "Entretenimiento",
    nombre: "Entretenimiento",
  },
  {
    value: "Estetica",
    nombre: "Estética",
  },
  {
    value: "Farmacia",
    nombre: "Farmacia",
  },
  {
    value: "Gastronomia",
    nombre: "Gastronomía",
  },
  {
    value: "Hogar",
    nombre: "Hogar",
  },
  {
    value: "Indumentaria",
    nombre: "Indumentaria",
  },
  {
    value: "Librerias",
    nombre: "Librerías",
  },
  {
    value: "MueblesYDecoracion",
    nombre: "Muebles y Decoración",
  },
  {
    value: "Niños",
    nombre: "Niños",
  },
  {
    value: "Supermercados",
    nombre: "Supermercados",
  },
  {
    value: "Tecnologia",
    nombre: "Tecnologia",
  },
  {
    value: "Turismo",
    nombre: "Turismo",
  },
  {
    value: "Vehiculos",
    nombre: "Vehículos",
  },
  {
    value: "Otro",
    nombre: "Otro",
  },
];

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
}));

function Perfil(props) {
  const classes = useStyles();

  const [formData, setFormData] = React.useState({
    id: props.auth.uid,
    web: props.profile.web,
    sucursal: props.profile.sucursal,
    rubro: props.profile.rubro,
    telefono: props.profile.telefono,
    instagram: props.profile.instagram,
    facebook: props.profile.facebook,
    direccion: props.profile.direccion,
  });

  const [ubicacion, setUbicacion] = React.useState({
    lat: null,
    lng: null,
  });
  const [picture, setPicture] = useState(props.profile.photoURL);
  const [submitted, setSubmitted] = React.useState(false);
  const [showModal, setModal] = React.useState(false);

  const handleChange = (event) => {
    formData[event.target.name] = event.target.value;
    setFormData({ ...formData });
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    const storageRef = firebase
      .storage()
      .ref(`/fotosUsuariosComercios/${file.name}`);
    const task = storageRef.put(file);
    task.on(
      "state_changed",
      function (snapshot) {
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            break;
        }
      },
      function (error) {
        console.log(error);
      },
      function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          setPicture(downloadURL);
          props.subirFoto({
            id: props.auth.uid,
            url: downloadURL,
          });
        });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.editarDatos(formData);
    setSubmitted({ submitted: true }, () => {
      setTimeout(() => setSubmitted({ submitted: false }), 5000);
    });
  };

  const toggleModal = () => {
    setModal(!showModal);
  };

  const form = React.createRef();

  /*React.useEffect(() => {
    Geocode.fromAddress(formData.direccion).then((response) => {
      const { lat, lng } = response.results[0].geometry.location;
      setUbicacion({ lat: lat, lng: lng });
    }, console.error);
  }, [formData.direccion, setFormData]);*/

  const getCoords = () => {
    Geocode.fromAddress(formData.direccion).then((response) => {
      const { lat, lng } = response.results[0].geometry.location;
      setUbicacion({ lat: lat, lng: lng });
    });
  };

  const obtenerDireccion = React.useCallback(({ address }) => {
    formData.direccion = address;
    setFormData({ ...formData });
    formData.direccion ? getCoords() : null;
  }, []);

  useEffect(() => {
    //esto no corre en el primer render, se ejecuta luego del return
    formData.direccion ? getCoords() : null;
  }, []); //lista de dependencias de react, cosa de que se refresque el campo una vez y luego cada vez que se actualizan los elementos de la lista

  return (
    <div>
      <ValidatorForm ref={form} onSubmit={handleSubmit} id="validator-form">
        <h4 className="tituloCardAdminP1">Información de inicio de sesión</h4>
        <Card id="cardAdminCuenta">
          <Card.Body className="contCardPerfil1">
            <div className="inputPerfil">
              <TextField
                disabled
                fullWidth
                id="outlined-disabled"
                label="Nombre del comercio"
                defaultValue={props.profile.nombreComercio}
                variant="outlined"
                name="usuario"
              />
            </div>
            <div className="inputPerfil">
              <TextField
                id="outlined-disabled"
                label="Email"
                fullWidth
                disabled
                defaultValue={props.auth.email}
                variant="outlined"
                name="email"
              />
            </div>
            <div className="inputPerfil">
              <TextValidator
                id="outlined-password-input"
                label="Contraseña"
                type="password"
                autoComplete="current-password"
                disabled
                variant="outlined"
                defaultValue="***********"
                name="contraseña"
                fullWidth
                validators={["required"]}
                errorMessages={["*Este campo es obligatorio"]}
              />
            </div>
            <div className="imagenPerfil">
              <Avatar
                className="contImgSubir"
                src={picture}
                alt="imagen usuario"
              ></Avatar>
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleUpload}
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  className="btnCargarImg"
                  component="span"
                  startIcon={<PhotoCamera />}
                >
                  Cargar imagen
                </Button>
              </label>
            </div>
          </Card.Body>
        </Card>
        <div className="tituloCardAdminP2">
          <h4 className="tituloCardAdminP">Información general</h4>
          <p className="opcional">(algunos campos son opcionales)</p>
        </div>
        <Card id="cardAdminCuenta">
          <Card.Body className="contCardPerfil2">
            <Grid container spacing={1}>
              <Grid className="inputPerfil2" item xs={12} md={6}>
                <TextValidator
                  variant="outlined"
                  id="outlined-disabled"
                  fullWidth
                  disabled
                  name="cuit"
                  defaultValue={props.profile.CUIT}
                  label="CUIT"
                />
              </Grid>
              <Grid className="inputPerfil2" item xs={12} md={6}>
                <TextValidator
                  id="outlined-basic"
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  name="sitioWeb"
                  label="Sitio web"
                  defaultValue={formData.web}
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
                  defaultValue={formData.sucursal}
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
                  defaultValue={formData.telefono}
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
                  defaultValue={formData.rubro}
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
                  defaultValue={formData.instagram}
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
                  defaultValue={formData.facebook}
                  validators={["matchRegexp:^([a-zA-Z ]){2,30}$"]}
                  errorMessages={["El usuario no es válido"]}
                />
              </Grid>
              <Grid className="inputPerfil2" item xs={12} md={12}>
                <Search
                  obtenerDireccion={obtenerDireccion}
                  actual={formData.direccion}
                />
              </Grid>
              {formData.direccion ? (
                <Grid item xs={12} md={12}>
                  <Map lat={ubicacion.lat} lng={ubicacion.lng} />
                </Grid>
              ) : null}
            </Grid>
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
      {showModal ? (
        <UseModal>
          <div>
            <h5>Tus datos han sido actualizados.</h5>
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

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editarDatos: (datos) => dispatch(editarDatos(datos)),
    subirFoto: (downloadURL) => dispatch(subirFoto(downloadURL)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Perfil);
