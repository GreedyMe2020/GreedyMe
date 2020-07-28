import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { ButtonEj } from "../components/Button";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";
import Grid from "@material-ui/core/Grid";
import { db } from "../firebase/config";
import { registrarSolicitud } from "../firebase/apiLanding";

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

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    cont: {
      flexGrow: 1,
    },
  },
}));

export default function FormDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    nombre: "",
    apellido: "",
    email: "",
    comercio: "",
    telefono: "",
    web: "",
    sucursal: "",
    rubro: "",
    dudas: "",
  });
  const [submitted, setSubmitted] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    formData[event.target.name] = event.target.value;
    setFormData({ ...formData });
  };

  const handleSubmit = () => {
    setSubmitted({ submitted: true }, () => {
      setTimeout(() => setSubmitted({ submitted: false }), 5000);
    });

    mandarForm(formData);
  };

  const mandarForm = async (formData) => {
    return await registrarSolicitud(formData);
  };

  const form = React.createRef();

  return (
    <div>
      <div className="botonRegistarse">
        <ButtonEj
          text="Registralo aca"
          style="btnRegistro"
          onClick={handleClickOpen}
        ></ButtonEj>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Suscribirse</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Esperemos que ande bien el form y se valide.
          </DialogContentText>

          <ValidatorForm
            className={classes.root}
            ref={form}
            onSubmit={handleSubmit}
          >
            <Grid container className={classes.cont} spacing={1}>
              <Grid item xs={12} md={6}>
                <TextValidator
                  label="Nombre"
                  variant="outlined"
                  onChange={handleChange}
                  name="nombre"
                  value={formData.nombre}
                  validators={["required", "matchRegexp:^([a-zA-Z ]){2,30}$"]}
                  errorMessages={[
                    "*Este campo es obligatorio",
                    "El nombre no es válido",
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextValidator
                  label="Apellido"
                  variant="outlined"
                  onChange={handleChange}
                  name="apellido"
                  value={formData.apellido}
                  validators={["required", "matchRegexp:^([a-zA-Z ]){2,30}$"]}
                  errorMessages={[
                    "*Este campo es obligatorio",
                    "El apellido no es válido",
                  ]}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextValidator
                  label="Email"
                  variant="outlined"
                  onChange={handleChange}
                  name="email"
                  value={formData.email}
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    "*Este campo es obligatorio",
                    "El email no es válido",
                  ]}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextValidator
                  label="Teléfono"
                  variant="outlined"
                  onChange={handleChange}
                  name="telefono"
                  value={formData.telefono}
                  validators={["required", "matchRegexp:^([0-9 ]){2,20}$"]}
                  errorMessages={[
                    "*Este campo es obligatorio",
                    "El teléfono no es válido",
                  ]}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextValidator
                  label="Nombre del comercio"
                  variant="outlined"
                  onChange={handleChange}
                  name="comercio"
                  value={formData.comercio}
                  validators={["required"]}
                  errorMessages={["*Este campo es obligatorio"]}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextValidator
                  label="Sitio web"
                  variant="outlined"
                  onChange={handleChange}
                  name="web"
                  value={formData.web}
                  validators={[
                    "required",
                    "matchRegexp:^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$",
                  ]}
                  errorMessages={[
                    "*Este campo es obligatorio",
                    "La dirección no es válida",
                  ]}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextValidator
                  label="Sucursal"
                  variant="outlined"
                  onChange={handleChange}
                  name="sucursal"
                  value={formData.sucursal}
                  validators={["required"]}
                  errorMessages={["*Este campo es obligatorio"]}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <SelectValidator
                  label="Rubro"
                  variant="outlined"
                  onChange={handleChange}
                  name="rubro"
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

              <Grid item xs={12} md={12}>
                <TextField
                  id="outlined-multiline-static"
                  label="Dudas"
                  multiline
                  rows={4}
                  value={formData.dudas}
                  onChange={handleChange}
                  name="dudas"
                  variant="outlined"
                />
              </Grid>

              <Button
                color="primary"
                variant="contained"
                className={classes.margin}
                type="submit"
                disabled={submitted}
              >
                {(submitted && "Your form is submitted!") ||
                  (!submitted && "Submit")}
              </Button>
            </Grid>
          </ValidatorForm>
        </DialogContent>
      </Dialog>
    </div>
  );
}
/* 
export function MyModalWithGrid(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Formulario de registro
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <FormLanding />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

 */
