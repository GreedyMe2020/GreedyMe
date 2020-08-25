import React, { useState, useEffect } from "react";
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
import { editarDatos } from "../../redux/actions/comActions";
import Map from "../Map/Map";
import { subirFoto } from "../../redux/actions/comActions";
import firebase from "../../firebase/config";
/* import { db } from "../firebase/config"; */
import { useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";

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
const libraries = ["places"];

function Perfil(props) {
  const [formData, setFormData] = React.useState({
    id: props.auth.uid,
    web: props.profile.web,
    sucursal: props.profile.sucursal,
    rubro: props.profile.rubro,
    telefono: props.profile.telefono,
    redesSociales: props.profile.redesSociales,
    direccion: props.profile.direccion[0],
    lat: props.profile.direccion[1].Ra,
    lng: props.profile.direccion[1].Pa,
  });

  const [picture, setPicture] = useState(props.profile.photoURL);

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
  };

  const form = React.createRef();

  //MAPA*************************************************************************************************
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const {
    //VARIABLES QUE DEVUELVE "usePlacesAutocomplete"
    value,
    suggestions: { status, data }, //Opciones que devuelve la api de google
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => -31.4058194, lng: () => -64.1967167 }, //BUSCA LUGARES CERCA DE ESTAS COORDENADAS (CENTRO DE CORDOBA)
      radius: 100 * 1000, //100 metros * 1000 = 100 kilometros.
    },
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    //Agarra este address y lo pasa por parametro a getgeocode. es el resultado del onSelect
    //"address se recibe segun lo que el usuario selecciona."
    setValue(address, false); // Cambia el valor de address
    clearSuggestions(); //Limpia el combo box.
    //setFormData((direccion = value));

    try {
      const results = await getGeocode({ address }); //nos devuelve muchso resultados, pero nos interesa el primero.
      const { lat, lng } = await getLatLng(results[0]); //Llamamos la funcion getLatLng y le pasamos el primer resultado.
      setFormData({ lat: lat, lng: lng });
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <ValidatorForm ref={form} onSubmit={handleSubmit} id="validator-form">
        <h4 className="tituloCardAdminP1">Información de inicio de sesión</h4>
        <Card className="cardAdminCuenta">
          <Card.Body className="contCardPerfil1">
            <div className="inputPerfil">
              <TextField
                disabled
                fullWidth
                id="outlined-disabled"
                label="Usuario"
                defaultValue={props.profile.nombreComercio}
                variant="outlined"
                name="usuario"
                validators={["required"]}
                errorMessages={["*Este campo es obligatorio"]}
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
                validators={["required", "isEmail"]}
                errorMessages={[
                  "*Este campo es obligatorio",
                  "El email no es válido",
                ]}
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

            {/* <TextValidator
                variant="outlined"
                fullWidth
                disabled
                name="usuario"
                value={props.profile.nombreComercio}
                validators={["required"]}
                errorMessages={["*Este campo es obligatorio"]}
              />
              <Typography>Email</Typography>
              <TextValidator
                variant="outlined"
                fullWidth
                disabled
                name="email"
                value={props.auth.email}
                validators={["required", "isEmail"]}
                errorMessages={[
                  "*Este campo es obligatorio",
                  "El email no es válido",
                ]}
              />
              <Typography>Contraseña</Typography>
              <TextValidator
                variant="outlined"
                fullWidth
                disabled
                name="contraseña"
                value="***********"
                validators={["required"]}
                errorMessages={["*Este campo es obligatorio"]}
              /> */}
            <div className="imagenPerfil">
              <img
                src={picture}
                style={{ height: 200 + "px" }}
                alt="imagen usuario"
              ></img>
              <input type="file" onChange={handleUpload}></input>
            </div>
          </Card.Body>
        </Card>
        <div className="tituloCardAdminP2">
          <h4 className="tituloCardAdminP">Información general</h4>
          <p className="opcional">(algunos campos son opcionales)</p>
        </div>
        <Card className="cardAdminCuenta">
          <Card.Body className="contCardPerfil2">
            <div className="inputPerfil2">
              <TextValidator
                variant="outlined"
                id="outlined-disabled"
                fullWidth
                disabled
                name="cuit"
                defaultValue={props.profile.CUIT}
                label="CUIT"
              />
            </div>
            <div className="inputPerfil2">
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
            </div>
            <div className="inputPerfil2">
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
            </div>
            <div className="inputPerfil2">
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
            </div>
            <div className="inputPerfil2">
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
            </div>
            <div className="inputPerfil2">
              <TextValidator
                variant="outlined"
                id="outlined-basic"
                label="Redes sociales"
                fullWidth
                onChange={handleChange}
                name="redesSociales"
                defaultValue={formData.redesSociales}
                validators={["matchRegexp:^([a-zA-Z ]){2,30}$"]}
                errorMessages={["El usuario no es válido"]}
              />
            </div>
            <div className="inputPerfil2">
              <TextValidator
                variant="outlined"
                id="outlined-basic"
                label="Dirección"
                fullWidth
                onChange={handleChange}
                name="direccion"
                defaultValue={formData.direccion}
                validators={["matchRegexp:^([a-zA-Z ]){2,30}$"]}
                errorMessages={["El usuario no es válido"]}
              />
            </div>
            <Map
              direccion={formData.direccion}
              lat={formData.lat}
              lng={formData.lng}
            />
            <Button
              color="primary"
              variant="contained"
              className={classes.margin}
              type="submit"
              onClick={handleSubmit}
            >
              Guardar cambios
            </Button>
          </Card.Body>
        </Card>
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
    editarDatos: (datos) => dispatch(editarDatos(datos)),
    subirFoto: (downloadURL) => dispatch(subirFoto(downloadURL)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Perfil);

//---------------------------FUNCIONES PARA EL MAPA
/*
function Map(props) {
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ address, lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
    setMapData({ address, lat, lng });
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <Search panTo={panTo} />
      <GoogleMap
        id="map"
        zoom={14}
        center={{
          lat: mapData.lat,
          lng: mapData.lng,
        }}
        options={options}
        onLoad={onMapLoad}
      >
        {mapData.lat ? (
          <Marker position={{ lat: mapData.lat, lng: mapData.lng }} />
        ) : null}
      </GoogleMap>
    </div>
  );
}

function Search({ panTo }, { direccion }) {
  return <div></div>;
}
*/
