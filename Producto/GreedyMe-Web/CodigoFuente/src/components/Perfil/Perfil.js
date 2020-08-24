import React from "react";
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
/* import { db } from "../firebase/config"; */

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

function Perfil(props) {
  const [formData, setFormData] = React.useState({
    id: props.auth.uid,
    web: props.profile.web,
    sucursal: props.profile.sucursal,
    rubro: props.profile.rubro,
    telefono: props.profile.telefono,
    redesSociales: props.profile.redesSociales,
    direccion: props.profile.direccion,
  });

  const handleChange = (event) => {
    formData[event.target.name] = event.target.value;
    setFormData({ ...formData });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.editarDatos(formData);
  };
  const form = React.createRef();

  return (
    <div>
      <NavBarSup></NavBarSup>
      <section className="contenedor-inicio">
        <ValidatorForm ref={form} onSubmit={handleSubmit} id="validator-form">
          <p className="tituloCard">Información de inicio de sesión</p>
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
                  variant="outlined"
                  //defaultValue={props.auth.contraseña}
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
              <div className="imagenPerfil">Deposite aca lo de la foto</div>
            </Card.Body>
          </Card>
          <Typography>Información general</Typography>
          <Typography>(algunos de los campos son opcionales)</Typography>
          <Card className="cardAdminCuenta">
            <Card.Body className="contCardPerfil2">
              <TextValidator
                variant="outlined"
                fullWidth
                disabled
                name="cuit"
                value={props.profile.CUIT}
                validators={["required"]}
                errorMessages={["*Este campo es obligatorio"]}
              />
              <TextValidator
                variant="outlined"
                fullWidth
                onChange={handleChange}
                name="sitioWeb"
                value={formData.web}
                validators={[
                  "matchRegexp:^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$",
                ]}
                errorMessages={["La dirección no es válida"]}
              />
              <TextValidator
                variant="outlined"
                fullWidth
                onChange={handleChange}
                name="sucursal"
                value={formData.sucursal}
                validators={["matchRegexp:^([a-zA-Z ]){2,30}$"]}
                errorMessages={["La sucursal no es válida"]}
              />
              <SelectValidator
                variant="outlined"
                onChange={handleChange}
                name="rubro"
                fullWidth
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
              <TextValidator
                variant="outlined"
                fullWidth
                onChange={handleChange}
                name="telefono"
                value={formData.telefono}
                validators={["matchRegexp:^([0-9 ]){2,20}$"]}
                errorMessages={["El teléfono no es válido"]}
              />
              <TextValidator
                variant="outlined"
                fullWidth
                onChange={handleChange}
                name="redesSociales"
                value={formData.redesSociales}
                validators={["matchRegexp:^([a-zA-Z ]){2,30}$"]}
                errorMessages={["El usuario no es válido"]}
              />
              <TextValidator
                variant="outlined"
                fullWidth
                onChange={handleChange}
                name="direccion"
                value={formData.direccion}
                validators={["required"]}
                errorMessages={["*Este campo es obligatorio"]}
              />
              <p>IMAGEN DEL MAPA CON LA DIRECCION BIEN PERRONA</p>
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
      </section>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Perfil);
