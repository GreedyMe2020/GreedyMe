import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { MenuItem } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import {
  ValidatorForm,
  SelectValidator,
  TextValidator,
} from "react-material-ui-form-validator";
import Grid from "@material-ui/core/Grid";
import { cargarPromocion } from "../../../redux/actions/adminActions";
import _ from "lodash";

//esta es la funcion que trae los datos, tipo crea un array trae todos las promociones
//y la va acumulando en el array

const useStyles = makeStyles((theme) => ({
  root: {
    gridColumn: "2/4",
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  cruz: {
    position: "absolute",
    right: theme.spacing(1),
    top: "8px",
    color: theme.palette.grey[500],
  },
  inline: {
    display: "block",
  },
  cont: {
    flexGrow: 1,
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function FormPromocion(props) {
  const classes = useStyles();
  const [formData, setFormData] = React.useState({
    tipoPromo: "",
    valuePromo: "",
  });

  //Estado para manejar el snackbar
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (e) => {
    const promociones = props.tipoPromo;
    const indiceACambiar = _.findIndex(promociones, function (o) {
      return o.tipo === formData.tipoPromo;
    });
    const id = promociones[indiceACambiar].id;
    const lista = promociones[indiceACambiar].lista;

    const listaNueva = _.concat(lista, { valor: formData.valuePromo });
    console.log(lista);
    console.log(listaNueva);
    props.cargarPromocion({
      tipoPromo: formData.tipoPromo,
      valuePromo: formData.valuePromo,
      id: id,
      lista: listaNueva,
    });
    setOpen(true);
  };

  const handleChange = (event) => {
    formData[event.target.name] = event.target.value;
    setFormData({ ...formData });
  };

  //Funcion para cerrar el snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const form = React.createRef();
  return (
    <div className="contenedorTodo">
      <ValidatorForm
        className={classes.root}
        ref={form}
        onSubmit={handleSubmit}
      >
        <Grid container className={classes.cont} spacing={1}>
          <Grid item xs={12} md={12}>
            <SelectValidator
              className="select-tipoprove"
              fullWidth
              label="Tipo de beneficio"
              onChange={handleChange}
              name="tipoPromo"
              required
              value={formData.tipoPromo}
              variant="outlined"
              validators={["required"]}
              errorMessages={["*Este campo es obligatorio"]}
            >
              {props.tipoPromo &&
                props.tipoPromo.map((option) => (
                  <MenuItem key={option.tipo} value={option.tipo}>
                    {option.tipo}
                  </MenuItem>
                ))}
            </SelectValidator>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextValidator
              variant="outlined"
              id="outlined-basic"
              label="Ingresa aqui"
              fullWidth
              required
              onChange={handleChange}
              name="valuePromo"
              value={formData.valuePromo}
            />
          </Grid>
          <Grid item xs={12} md={12} className="admin-btn-cont">
            <Button
              variant="contained"
              id="btn-azul"
              className="btnAdminPerfil"
              type="submit"
              startIcon={<SaveIcon />}
            >
              Guardar beneficio
            </Button>
          </Grid>
        </Grid>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={open}
          autoHideDuration={8000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            ¡Se guardó el beneficio correctamente!
          </Alert>
        </Snackbar>
      </ValidatorForm>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    proveedores: state.firestore.ordered.proveedorServicio,
    tipoPromo: state.firestore.ordered.tipoPromocion,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cargarPromocion: (formData) => dispatch(cargarPromocion(formData)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: "proveedorServicio" },
    { collection: "tipoPromocion" },
  ])
)(FormPromocion);
