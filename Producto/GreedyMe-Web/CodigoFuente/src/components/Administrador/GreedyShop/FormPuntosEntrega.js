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
import Snackbar from "@material-ui/core/Snackbar";
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

export default function FormPuntoEntrega(props) {
  const classes = useStyles();
  const [formData, setFormData] = React.useState({
    direccion: "",
    localidad: "",
    provincia: "",
    pais: "",
  });

  //Estado para manejar el snackbar
  const [open, setOpen] = React.useState(false);

   const handleSubmit = (e) => {
    /* props.cargarTipoProveedor(formData); */
    console.log(formData);
    formData.direccion = "";
    formData.localidad = "";
    formData.provincia = "";
    formData.pais = "";
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
            <TextValidator
              variant="outlined"
              id="outlined-basic"
              label="Dirección"
              fullWidth
              required
              onChange={handleChange}
              name="direccion"
              value={formData.direccion}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextValidator
              variant="outlined"
              id="outlined-basic"
              label="Localidad"
              fullWidth
              required
              onChange={handleChange}
              name="localidad"
              value={formData.localidad}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextValidator
              variant="outlined"
              id="outlined-basic"
              label="Provincia"
              fullWidth
              required
              onChange={handleChange}
              name="provincia"
              value={formData.provincia}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextValidator
              variant="outlined"
              id="outlined-basic"
              label="País"
              fullWidth
              required
              onChange={handleChange}
              name="pais"
              value={formData.pais}
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
              Guardar punto de retiro
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
            ¡Se guardó el punto de retiro correctamente!
          </Alert>
        </Snackbar>
      </ValidatorForm>
    </div>
  );
}