import React, { useState } from "react";
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
} from "react-material-ui-form-validator";
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

const CelesteRadio = withStyles({
  root: {
    color: "#707070",
    "&$checked": {
      color: "#76B39D",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ModalPromociones(props) {
  const classes = useStyles();

  const [formData, setFormData] = React.useState({
    id: props.auth.uid,
    tipoPromo: "",
    proveedor: "",
    descripcion: "",
  });
  const [desdeVigencia, handleDesdeVigencia] = React.useState(new Date()); //Estados para cada datePicker
  const [hastaVigencia, handleHastaVigencia] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);

  //esto es para los dias
  const [state, setState] = React.useState({
    lunes: false,
    martes: false,
    miercoles: false,
    jueves: false,
    viernes: false,
    sabado: false,
    domingo: false,
    todoslosdias: true,
  });
  const {
    lunes,
    martes,
    miercoles,
    jueves,
    viernes,
    sabado,
    domingo,
    todoslosdias,
  } = state;
  const [errorD, setErrorDias] = React.useState(false);
  const [helperTextD, setHelperTextDias] = React.useState("");

  const handleChangec = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    setHelperTextDias("");
    setErrorDias(false);
  };

  //esto es para la forma de pago
  const [value, setValue] = React.useState({ value: false });
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("");

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText("");
    setError(false);
  };
  function generateUUID() {
    var d = new Date().getTime();
    var uuid = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (
      c
    ) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  }
  const id = generateUUID();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      state.lunes === false &&
      state.martes === false &&
      state.miercoles === false &&
      state.jueves === false &&
      state.viernes === false &&
      state.sabado === false &&
      state.domingo === false &&
      state.todoslosdias === false
    ) {
      setHelperTextDias("*Este campo es obligatorio");
      setErrorDias(true);
    } else if (
      state.todoslosdias === true &&
      (state.lunes === true ||
        state.martes === true ||
        state.miercoles === true ||
        state.jueves === true ||
        state.viernes === true ||
        state.sabado === true ||
        state.domingo === true)
    ) {
      setHelperTextDias("*Hay inconsistencia en la selección");
      setErrorDias(true);
    } else if (value != "Efectivo" && value != "Todos los medios de pago") {
      setHelperText("*Este campo es obligatorio");
      setError(true);
    } else {
      props.crear(formData, id, state, value, desdeVigencia, hastaVigencia);
      setOpen(true);
    }
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
      <ValidatorForm
        className={classes.root}
        ref={form}
        onSubmit={handleSubmit}
      >
        <p className="subtit-p">Promoción</p>
        <div className="col-subgrid">
          <SelectValidator
            className="select-tipopromo"
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
            className="selectpromo"
            fullWidth
            label="Promoción"
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
          <TextField
            disabled
            id="outlineddisabled"
            label="Otros"
            defaultValue="Otros"
            variant="outlined"
          />
        </div>
        <Divider className="dividerH" />
        <p className="subtit">Proveedor</p>
        <div className="col-subgrid-2">
          <SelectValidator
            className="select-tipoproveedor"
            fullWidth
            label="Tipo de proveedor"
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
            className="selectproveedor"
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
          <TextField
            disabled
            id="outlineddisabled"
            label="Otros"
            defaultValue="Otros"
            variant="outlined"
          />
        </div>
        <Divider className="dividerH" />
        <p className="subtit">Periodo de vigencia de la promoción</p>
        <div className="col-subgrid-3">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              className="desde"
              autoOk
              disableToolbar
              fullWidth
              inputVariant="outlined"
              name="desdeVigencia"
              label="Disponible desde el"
              minDate={new Date()}
              minDateMessage="*La fecha no puede ser menor al día de hoy"
              format="dd/MM/yyyy"
              value={desdeVigencia}
              variant="inline"
              onChange={(data) => handleDesdeVigencia(data)}
            />
            <DatePicker
              className="hasta"
              autoOk
              disableToolbar
              fullWidth
              inputVariant="outlined"
              name="hastaVigencia"
              label="Disponible hasta el"
              format="dd/MM/yyyy"
              minDate={desdeVigencia}
              minDateMessage="*La fecha no puede ser menor al 'desde'"
              value={hastaVigencia}
              variant="inline"
              onChange={(data) => handleHastaVigencia(data)}
            ></DatePicker>
          </MuiPickersUtilsProvider>
        </div>
        <Divider className="dividerH" />
        <div className="contenedorCol2">
          <p className="subtit">¿Qué días aplica la promoción?</p>
          <FormControl
            required
            error={errorD}
            className="cargar-promo-check-group"
          >
            <FormControlLabel
              id="cargar-promo-checkbox"
              className="cargar-promo-checkbox-1"
              control={
                <CelesteCheckbox
                  checked={lunes}
                  onChange={handleChangec}
                  name="lunes"
                />
              }
              label="Lunes"
            />
            <FormControlLabel
              id="cargar-promo-checkbox"
              className="cargar-promo-checkbox-2"
              control={
                <CelesteCheckbox
                  checked={martes}
                  onChange={handleChangec}
                  name="martes"
                />
              }
              label="Martes"
            />
            <FormControlLabel
              id="cargar-promo-checkbox"
              className="cargar-promo-checkbox-3"
              control={
                <CelesteCheckbox
                  checked={miercoles}
                  onChange={handleChangec}
                  name="miercoles"
                />
              }
              label="Miércoles"
            />
            <FormControlLabel
              id="cargar-promo-checkbox"
              className="cargar-promo-checkbox-4"
              control={
                <CelesteCheckbox
                  checked={jueves}
                  onChange={handleChangec}
                  name="jueves"
                />
              }
              label="Jueves"
            />
            <FormControlLabel
              id="cargar-promo-checkbox"
              className="cargar-promo-checkbox-5"
              control={
                <CelesteCheckbox
                  checked={viernes}
                  onChange={handleChangec}
                  name="viernes"
                />
              }
              label="Viernes"
            />
            <FormControlLabel
              id="cargar-promo-checkbox"
              className="cargar-promo-checkbox-6"
              control={
                <CelesteCheckbox
                  checked={sabado}
                  onChange={handleChangec}
                  name="sabado"
                />
              }
              label="Sábado"
            />
            <FormControlLabel
              id="cargar-promo-checkbox"
              className="cargar-promo-checkbox-7"
              control={
                <CelesteCheckbox
                  checked={domingo}
                  onChange={handleChangec}
                  name="domingo"
                />
              }
              label="Domingo"
            />
            <FormControlLabel
              id="cargar-promo-checkbox"
              className="cargar-promo-checkbox-8"
              control={
                <CelesteCheckbox
                  checked={todoslosdias}
                  onChange={handleChangec}
                  name="todoslosdias"
                />
              }
              label="Todos los días"
            />
            <FormHelperText>{helperTextD}</FormHelperText>
          </FormControl>
          <Divider className="dividerH" />
          <p className="subtit">Forma de pago</p>
          <FormControl error={error} required>
            <RadioGroup value={value} onChange={handleRadioChange}>
              <FormControlLabel
                value="Efectivo"
                control={<CelesteRadio />}
                label="Efectivo"
              />
              <FormControlLabel
                value="Todos los medios de pago"
                control={<CelesteRadio />}
                label="Todos los medios de pago"
              />
            </RadioGroup>
            <FormHelperText>{helperText}</FormHelperText>
          </FormControl>
          <Divider className="dividerH" />
          <p className="subtit">Agregar descripción</p>
          <form className={classes.root} noValidate autoComplete="off">
            <div>
              <TextField
                fullWidth
                variant="outlined"
                id="standard-textarea"
                name="descripcion"
                label="Descripción (opcional)"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Descripción (opcional)"
                multiline
                rows={2}
                inputProps={{ maxLength: 140 }}
              />
            </div>
          </form>
        </div>
        <div className="cargar-promo-buttons-container">
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
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            open={open}
            autoHideDuration={8000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="success">
              La promoción se cargo correctamente!
            </Alert>
            {/* <Alert onClose={handleClose} severity="error">
              Faltan campos de completar
            </Alert> */}
          </Snackbar>
        </div>
      </ValidatorForm>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(ModalPromociones);
