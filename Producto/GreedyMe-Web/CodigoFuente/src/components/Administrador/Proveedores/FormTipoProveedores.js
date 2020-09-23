import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import MuiAlert from "@material-ui/lab/Alert";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { cargarTipoProveedor } from "../../../redux/actions/adminActions";
import Grid from "@material-ui/core/Grid";

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

function FormTipoProveedores(props) {
  const classes = useStyles();
  const [formData, setFormData] = React.useState({
    tipoProveedor: "",
  });

  const handleSubmit = (e) => {
    props.cargarTipoProveedor(formData);
  };

  const handleChange = (event) => {
    formData[event.target.name] = event.target.value;
    setFormData({ ...formData });
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
            <TextValidator
              variant="outlined"
              id="outlined-basic"
              label="Tipo proveedor"
              fullWidth
              required
              onChange={handleChange}
              name="tipoProveedor"
              value={formData.tipoProveedor}
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
              Guardar tipo proveedor
            </Button>
          </Grid>
        </Grid>
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
    cargarTipoProveedor: (formData) => dispatch(cargarTipoProveedor(formData)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: "proveedorServicio" },
    { collection: "tipoPromocion" },
  ])
)(FormTipoProveedores);
