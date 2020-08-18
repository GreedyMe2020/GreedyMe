import React from "react";
import { Link } from "@reach/router";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";
import MenuItem from "@material-ui/core/MenuItem";
import {
  Container,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
  Select,
  Grid,
} from "@material-ui/core";
import { crearPromocion } from "../../redux/actions/promActions";

//pagina vacia

const tipoPromo = [
  {
    value: "10%",
    nombre: "Descuento",
  },
  {
    value: "2x1",
    nombre: "Promocion",
  },
];

const proveedor = [
  {
    value: "Club Personal",
    nombre: "Personal",
  },
  {
    value: "Banco Galicia",
    nombre: "Galicia",
  },
];

const mesVigencia = [
  {
    value: "Septiembre",
    nombre: "Septiembre",
  },
  {
    value: "Noviembre",
    nombre: "Noviembre",
  },
];

const diaVigencia = [
  {
    value: "Lunes",
    nombre: "Lunes",
  },
  {
    value: "Martes",
    nombre: "Martes",
  },
  {
    value: "Miércoles",
    nombre: "Miércoles",
  },
  {
    value: "Jueves",
    nombre: "Jueves",
  },
  {
    value: "Viernes",
    nombre: "Viernes",
  },
  {
    value: "Sábado",
    nombre: "Sábado",
  },
  {
    value: "Domingo",
    nombre: "Domingo",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    /* cont: {
      flexGrow: 1,
    }, */
  },
  /*   cruz: {
    position: "absolute",
    top: theme.spacing(1.8),
  }, */
  /* formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  }, */
}));

function CargaPromociones(props) {
  const classes = useStyles();

  const [formData, setFormData] = React.useState({
    id: props.auth.uid,
    tipoPromo: "",
    proveedor: "",
    //imagenURL: "",
    //fechaInicio: "", //VER EL ID DE USUARIO COMO ES EN REALIDAD.
    //fechaFin: "",
    //titulo: "",
    //descripcion: "",

    diaVigencia: "",
    mesVigencia: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    props.crearPromocion(formData);
  };

  const handleChange = (event) => {
    formData[event.target.name] = event.target.value;
    setFormData({ ...formData });
  };

  const form = React.createRef();

  return (
    <div className={classes.cruz}>
      <h1>Promociones</h1>
      <h4>Cargar la promoción o el descuento que aplica en su comercio</h4>

      <ValidatorForm
        className={classes.root}
        ref={form}
        onSubmit={handleSubmit}
      >
        <Grid container className={classes.cont} spacing={1}>
          <Grid md={6}>
            <SelectValidator
              label="Tipo de promoción"
              onChange={handleChange}
              name="tipoPromo"
              value={formData.tipoPromo}
              validators={["required"]}
              errorMessages={["*Este campo es obligatorio"]}
            >
              {tipoPromo.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </SelectValidator>
          </Grid>
          <Grid md={6}>
            <SelectValidator
              label="Proveedor de promoción"
              onChange={handleChange}
              name="proveedor"
              value={formData.proveedor}
              validators={["required"]}
              errorMessages={["*Este campo es obligatorio"]}
            >
              {proveedor.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </SelectValidator>
          </Grid>
          <Grid md={6}>
            <SelectValidator
              label="Dia de vigencia"
              onChange={handleChange}
              name="diaVigencia"
              value={formData.diaVigencia}
              validators={["required"]}
              errorMessages={["*Este campo es obligatorio"]}
            >
              {diaVigencia.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </SelectValidator>
          </Grid>
          <Grid md={6}>
            <SelectValidator
              label="Mes de vigencia"
              onChange={handleChange}
              name="mesVigencia"
              value={formData.mesVigencia}
              validators={["required"]}
              errorMessages={["*Este campo es obligatorio"]}
            >
              {mesVigencia.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </SelectValidator>
          </Grid>
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              className={classes.margin}
              type="submit"
            >
              Enviar
            </Button>
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

const mapDispatchToProps = (dispatch) => {
  return {
    crearPromocion: (promocion) => dispatch(crearPromocion(promocion)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CargaPromociones);
