import React from "react";
import NavBarSup from "../../components/Principal/navBarSuperior";
import { Card } from "react-bootstrap";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import classes from "../../components/Modal";
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

function Perfil() {
  const [formData, setFormData] = React.useState({
    //contraseña: "",
    sitioWeb: "",
    sucursal: "",
    rubro: "",
    telefono: "",
    redesSociales: "",
    direccion: "",
  });

  const handleChange = (event) => {
    formData[event.target.name] = event.target.value;
    setFormData({ ...formData });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    return;
  };
  const form = React.createRef();

  return (
    <div>
      <NavBarSup></NavBarSup>
      <section className="contenedor-inicio">
        <ValidatorForm ref={form} onSubmit={handleSubmit} id="validator-form">
          <Typography>Información de inicio de sesión</Typography>
          <Card>
            <Card.Body>
              <Grid container>
                <Grid xs={8}>
                  <Grid container>
                    <Grid xs={4}>
                      <Typography>Usuario</Typography>
                    </Grid>
                    <Grid xs={8}>
                      <TextValidator
                        label="Usuario"
                        variant="outlined"
                        fullWidth
                        disabled
                        name="usuario"
                        value="GM36-Adidas"
                        validators={["required"]}
                        errorMessages={["*Este campo es obligatorio"]}
                      />
                    </Grid>
                    <Grid className="mt-5" xs={4}>
                      <Typography>Email</Typography>
                    </Grid>
                    <Grid className="mt-5" xs={8}>
                      <TextValidator
                        label="Email"
                        variant="outlined"
                        fullWidth
                        disabled
                        name="email"
                        value="juanmanuelcerutti@gmail.com"
                        validators={["required", "isEmail"]}
                        errorMessages={[
                          "*Este campo es obligatorio",
                          "El email no es válido",
                        ]}
                      />
                    </Grid>
                    <Grid className="mt-5" xs={4}>
                      <Typography>Contraseña</Typography>
                    </Grid>
                    <Grid className="mt-5" xs={8}>
                      <TextValidator
                        label="Contraseña"
                        variant="outlined"
                        fullWidth
                        name="contraseña"
                        value="***********"
                        validators={["required"]}
                        errorMessages={["*Este campo es obligatorio"]}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid xs={4}>
                  <p>imagen perrona del usuario</p>
                </Grid>
              </Grid>
            </Card.Body>
          </Card>
          <Typography>Información general</Typography>

          <Typography>(algunos de los campos son opcionales)</Typography>
          <Card>
            <Card.Body>
              <Grid container>
                <Grid xs={4}>
                  <Typography>CUIT</Typography>
                </Grid>
                <Grid xs={8}>
                  <TextValidator
                    label="CUIT"
                    variant="outlined"
                    fullWidth
                    disabled
                    name="cuit"
                    value="24-40247604-5"
                    validators={["required"]}
                    errorMessages={["*Este campo es obligatorio"]}
                  />
                </Grid>
                <Grid className="mt-5" xs={4}>
                  <Typography>Sitio web</Typography>
                </Grid>
                <Grid className="mt-5" xs={8}>
                  <TextValidator
                    label="Sitio web"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    name="sitioWeb"
                    value={formData.sitioWeb}
                    validators={[
                      "matchRegexp:^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$",
                    ]}
                    errorMessages={["La dirección no es válida"]}
                  />
                </Grid>
                <Grid className="mt-5" xs={4}>
                  <Typography>Sucursal</Typography>
                </Grid>
                <Grid className="mt-5" xs={8}>
                  <TextValidator
                    label="Sucursal"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    name="sucursal"
                    value={formData.sucursal}
                    validators={["matchRegexp:^([a-zA-Z ]){2,30}$"]}
                    errorMessages={["La sucursal no es válida"]}
                  />
                </Grid>
                <Grid className="mt-5" xs={4}>
                  <Typography>Rubro</Typography>
                </Grid>
                <Grid className="mt-5" xs={8}>
                  <SelectValidator
                    label="Rubro"
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
                </Grid>
                <Grid className="mt-5" xs={4}>
                  <Typography>Teléfono</Typography>
                </Grid>
                <Grid className="mt-5" xs={8}>
                  <TextValidator
                    label="Teléfono"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    name="telefono"
                    value={formData.telefono}
                    validators={["matchRegexp:^([0-9 ]){2,20}$"]}
                    errorMessages={["El teléfono no es válido"]}
                  />
                </Grid>
                <Grid className="mt-5" xs={4}>
                  <Typography>Redes sociales</Typography>
                </Grid>
                <Grid className="mt-5" xs={8}>
                  <TextValidator
                    label="Redes sociales"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    name="redesSociales"
                    value={formData.redesSociales}
                    validators={["matchRegexp:^([a-zA-Z ]){2,30}$"]}
                    errorMessages={["El usuario no es válido"]}
                  />
                </Grid>
                <Grid className="mt-5" xs={4}>
                  <Typography>Dirección</Typography>
                </Grid>
                <Grid className="mt-5" xs={8}>
                  <TextValidator
                    label="Dirección"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    name="direccion"
                    value={formData.direccion}
                    validators={["required"]}
                    errorMessages={["*Este campo es obligatorio"]}
                  />
                </Grid>
                <Grid className="mt-5" xs={12}>
                  <p>IMAGEN DEL MAPA CON LA DIRECCION BIEN PERRONA</p>
                </Grid>

                <Grid item>
                  <Button
                    color="primary"
                    variant="contained"
                    className={classes.margin}
                    type="submit"
                    /*onClick={handleSubmit}*/
                  >
                    Guardar cambios
                  </Button>
                </Grid>
              </Grid>
            </Card.Body>
          </Card>
        </ValidatorForm>
      </section>
    </div>
  );
}

export default Perfil;
