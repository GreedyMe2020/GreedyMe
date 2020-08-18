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
    cont: {
      flexGrow: 1,
    },
  },
  cruz: {
    position: "absolute",
    top: theme.spacing(1.8),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function CargaPromociones() {
  const classes = useStyles();

  const [formData, setFormData] = React.useState({
    //idUsuario: "",
    tipoPromo: "",
    proveedor: "",
    //imagenURL: "",
    //fechaInicio: "", //VER EL ID DE USUARIO COMO ES EN REALIDAD.
    //fechaFin: "",
    //titulo: "",
    //descripcion: "",
    mesVigencia: "",
    diaVigencia: "",
  });

  const handleSubmit = () => {
    setSubmitted({ submitted: true }, () => {
      setTimeout(() => setSubmitted({ submitted: false }), 5000);
    });
  };

  const handleChange = (event) => {
    formData[event.target.name] = event.target.value;
    setFormData({ ...formData });
  };

  return (
    <div className={classes.cruz}>
      <h1>Promociones</h1>
      <h4>Cargar la promoción o el descuento que aplica en su comercio</h4>
      <Grid container className={classes.cont} spacing={1}>
        <Grid item md={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Tipo promo</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData.tipoPromo}
              onChange={handleChange}
              className={classes.selectEmpty}
            >
              {tipoPromo.map((option) => (
                <MenuItem key={option.nombre} value={option.nombre}>
                  {option.nombre}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item md={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-required-label">
              Proveedor
            </InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={formData.proveedor}
              onChange={handleChange}
              className={classes.selectEmpty}
            >
              {proveedor.map((option) => (
                <MenuItem key={option.nombre} value={option.nombre}>
                  {option.nombre}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item md={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-required-label">
              Mes de Vigencia
            </InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={formData.mesVigencia}
              onChange={handleChange}
              className={classes.selectEmpty}
            >
              {mesVigencia.map((option) => (
                <MenuItem key={option.nombre} value={option.nombre}>
                  {option.nombre}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item md={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-required-label">
              Días de Vigencia
            </InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={formData.diaVigencia}
              onChange={handleChange}
              className={classes.selectEmpty}
            >
              {diaVigencia.map((option) => (
                <MenuItem key={option.nombre} value={option.nombre}>
                  {option.nombre}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            className={classes.margin}
            type="submit"
            onClick={handleSubmit}
            //onClick={handleClose} //se desactiva el modal.
          >
            Cargar Promoción
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
/*const mapDispatchToProps = (dispatch) => {
  return {
    null: () => dispatch(null),
  };
};
*/
