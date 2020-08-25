import React from "react";
import { Link } from "@reach/router";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import { NavBarSup } from "../../components/Principal/navBarSuperior";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
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
} from "react-material-ui-form-validator";
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
    },
  },
}));

const CelesteCheckbox = withStyles({
  root: {
    color: "#707070",
    "&$checked": {
      color: "#76B39D",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

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
    descripcion: "",
    diaVigencia: "",
    mesVigencia: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    props.crearPromocion(formData);
  };

  const [state, setState] = React.useState({
    checkedEfectivo: false,
    checkedTD: false,
    checkedL: false,
    checkedM: false,
    checkedMi: false,
    checkedJ: false,
    checkedV: false,
    checkedS: false,
    checkedD: false,
  });

  const handleChange = (event) => {
    formData[event.target.name] = event.target.value;
    setFormData({ ...formData });
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const form = React.createRef();

  return (
    <div>
      <div className="contenedorTodo">
        <div className="prom-title-container">
          <h1>Promociones</h1>
        </div>
        <Card className="cardPromo">
          <CardContent className="cardContentePromo">
            <div className="contenedorPromo">
              <div className="subtituloProm">
                <h5>Cargue un nuevo beneficio</h5>
              </div>

              <ValidatorForm
                className={classes.root}
                ref={form}
                onSubmit={handleSubmit}
              >
                <div className="contCargarProm">
                  <div className="contenedorCol1">
                    <SelectValidator
                      fullWidth
                      label="Tipo de promoción"
                      onChange={handleChange}
                      name="tipoPromo"
                      value={formData.tipoPromo}
                      variant="outlined"
                      validators={["required"]}
                      errorMessages={["*Este campo es obligatorio"]}
                    >
                      {tipoPromo.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </SelectValidator>
                    <SelectValidator
                      fullWidth
                      label="Proveedor de promoción"
                      onChange={handleChange}
                      name="proveedor"
                      value={formData.proveedor}
                      variant="outlined"
                      validators={["required"]}
                      errorMessages={["*Este campo es obligatorio"]}
                    >
                      {proveedor.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </SelectValidator>
                    <SelectValidator
                      fullWidth
                      label="Dia de vigencia"
                      onChange={handleChange}
                      name="diaVigencia"
                      value={formData.diaVigencia}
                      variant="outlined"
                      validators={["required"]}
                      errorMessages={["*Este campo es obligatorio"]}
                    >
                      {diaVigencia.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </SelectValidator>
                    <SelectValidator
                      fullWidth
                      label="Mes de vigencia"
                      onChange={handleChange}
                      name="mesVigencia"
                      value={formData.mesVigencia}
                      variant="outlined"
                      validators={["required"]}
                      errorMessages={["*Este campo es obligatorio"]}
                    >
                      {mesVigencia.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </SelectValidator>
                    <FormControlLabel
                      id="cargar-promo-checkbox"
                      label="Efectivo"
                      control={
                        <CelesteCheckbox
                          checked={state.checkedEfectivo}
                          onChange={handleChange}
                          name="checkedEfectivo"
                        />
                      }
                    />
                  </div>
                  <Divider className="dividerVertical" orientation="vertical" />
                  <Divider className="dividerHorizontal" />
                  <div className="contenedorCol2">
                    <p>¿Qué días aplica la promoción?</p>
                    <div className="cargar-promo-check-group">
                      <FormControlLabel
                        id="cargar-promo-checkbox"
                        className="cargar-promo-checkbox-1"
                        control={
                          <CelesteCheckbox
                            checked={state.checkedL}
                            onChange={handleChange}
                            name="checkedL"
                          />
                        }
                        label="Lunes"
                      />

                      <FormControlLabel
                        id="cargar-promo-checkbox"
                        className="cargar-promo-checkbox-2"
                        control={
                          <CelesteCheckbox
                            checked={state.checkedM}
                            onChange={handleChange}
                            name="checkedM"
                          />
                        }
                        label="Martes"
                      />
                      <FormControlLabel
                        id="cargar-promo-checkbox"
                        className="cargar-promo-checkbox-3"
                        control={
                          <CelesteCheckbox
                            checked={state.checkedMi}
                            onChange={handleChange}
                            name="checkedMi"
                          />
                        }
                        label="Miércoles"
                      />

                      <FormControlLabel
                        id="cargar-promo-checkbox"
                        className="cargar-promo-checkbox-4"
                        control={
                          <CelesteCheckbox
                            checked={state.checkedJ}
                            onChange={handleChange}
                            name="checkedJ"
                          />
                        }
                        label="Jueves"
                      />
                      <FormControlLabel
                        id="cargar-promo-checkbox"
                        className="cargar-promo-checkbox-5"
                        control={
                          <CelesteCheckbox
                            checked={state.checkedV}
                            onChange={handleChange}
                            name="checkedV"
                          />
                        }
                        label="Viernes"
                      />

                      <FormControlLabel
                        id="cargar-promo-checkbox"
                        className="cargar-promo-checkbox-6"
                        control={
                          <CelesteCheckbox
                            checked={state.checkedS}
                            onChange={handleChange}
                            name="checkedS"
                          />
                        }
                        label="Sábado"
                      />
                      <FormControlLabel
                        id="cargar-promo-checkbox"
                        className="cargar-promo-checkbox-7"
                        control={
                          <CelesteCheckbox
                            checked={state.checkedD}
                            onChange={handleChange}
                            name="checkedD"
                          />
                        }
                        label="Domingo"
                      />
                      <FormControlLabel
                        id="cargar-promo-checkbox"
                        className="cargar-promo-checkbox-8"
                        control={
                          <CelesteCheckbox
                            checked={state.checkedTD}
                            onChange={handleChange}
                            name="checkedTD"
                          />
                        }
                        label="Todos los días"
                      />
                    </div>
                    <p className="cargar-promo-desc">Agregar descripción</p>
                    <form
                      className={classes.root}
                      noValidate
                      autoComplete="off"
                    >
                      <div>
                        <TextField
                          fullWidth
                          variant="outlined"
                          id="standard-textarea"
                          label="Descripción (opcional)"
                          value={formData.descripcion}
                          onChange={handleChange}
                          placeholder="Descripción (opcional)"
                          multiline
                          rows={2}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </ValidatorForm>
            </div>
          </CardContent>
          <CardActions className="cargar-promo-buttons-container">
            <div className="btn-cargar-prom">
              <Button
                variant="contained"
                className={classes.margin}
                id="cargar-promo-submit"
                type="submit"
              >
                Cargar promoción
              </Button>
            </div>
          </CardActions>
        </Card>
      </div>
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
