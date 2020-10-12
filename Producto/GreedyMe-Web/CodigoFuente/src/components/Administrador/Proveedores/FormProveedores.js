import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { MenuItem } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import firebase from "../../../firebase/config";
import { connect } from "react-redux";
import {
  ValidatorForm,
  SelectValidator,
  TextValidator,
} from "react-material-ui-form-validator";
import Grid from "@material-ui/core/Grid";
import {
  cargarProveedor,
  cargarBanco,
} from "../../../redux/actions/adminActions";
import _ from "lodash";
import Snackbar from "@material-ui/core/Snackbar";
import Avatar from "@material-ui/core/Avatar";
import { subirFoto, eliminarFoto } from "../../../redux/actions/comActions";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

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
  input: {
    display: "none",
  },
  contenedor: {
    display: "grid",
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    gridTemplateColumns: "1fr 2fr",
    gridTemplateRows: "1fr",
  },
  avatar: {
    gridColumn: 1 / 2,
    gridRow: 1 / 3,
  },
  ava: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  botones: {
    gridColumn: 2 / 3,
    gridRow: 1 / 2,
    justifySelf: "center",
    alignSelf: "center",
    marginLeft: 35,
  },
  boton: {
    backgroundColor: "#76b39d",
    color: "white",
    fontSize: 13,
  },
  elim: {
    cursor: "pointer",
    color: "#707070",
    fontSize: 15,
    marginLeft: 27,
    top: 5,
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function FormProveedores(props) {
  const classes = useStyles();

  const [picture, setPicture] = useState(null);
  const [valorCarga, setValorCarga] = useState(0)

  const [formData, setFormData] = React.useState({
    tipoProveedor: "",
    valueProveedor: "",
    downloadURL: null,
  });
  //Estado para manejar el snackbar
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (e) => {
    if (formData.tipoProveedor === "Bancos") {
      props.cargarBanco({
        id: "ndbKpkm6GorM0g5kHNkF",
        valueProveedor: formData.valueProveedor,
      });
      //Abro el snackbar
      setOpen(true);
    } else {
      props.cargarProveedor({
        tipoProveedor: formData.tipoProveedor,
        valueProveedor: formData.valueProveedor,
      });
      //Abro el snackbar
      setOpen(true);
    }
  };

  const handleDelete = () => {
    setPicture(null);
    setValorCarga(0)
    formData.downloadURL = null
    setFormData({...formData})
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

  const handleUpload = (event) => {
    const file = event.target.files[0];
    const storageRef = firebase
      .storage()
      .ref(`/proveedores/${file.name}`);
    const task = storageRef.put(file);
    task.on(
      "state_changed",
      function (snapshot) {      
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            let porcentaje = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setValorCarga(porcentaje)
            break;
        }
      },
      function (error) {
        console.log(error);
      },
      function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          setPicture(downloadURL);
          formData.downloadURL = downloadURL
          setFormData({...formData})
          console.log(formData)
        });
      } 
    ); 
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
          <div className={classes.contenedor}>
            <div className={classes.avatar}>
              <Avatar
                src={picture}
                alt="imagen proveedor"
                className={classes.ava}
              ></Avatar>
            </div>

            <div className={classes.botones}>
              <div>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                  //onChange={handleUpload}
                />
                <label htmlFor="contained-button-file">
                  <Button
                    variant="contained"
                    className={classes.boton}
                    component="span"
                    startIcon={<PhotoCamera />}
                  >
                    Cargar imagen
                  </Button>
                </label>
              </div>
              <div className={classes.elim}>
                <a className="eliminar-img" onClick={""}>
                  Eliminar imagen
                </a>
              </div>

            </div>
            <div>
                <progress value={valorCarga} max="100">{valorCarga}</progress>
            </div>
          </div>
          <Grid item xs={12} md={12}>
            <SelectValidator
              className="select-tipoprove"
              fullWidth
              label="Tipo de proveedor"
              onChange={handleChange}
              name="tipoProveedor"
              required
              value={formData.tipoProveedor}
              variant="outlined"
              validators={["required"]}
              errorMessages={["*Este campo es obligatorio"]}
            >
              {props.proveedores &&
                props.proveedores.map((option) => (
                  <MenuItem
                    key={option.tipo}
                    value={option.tipo ? option.tipo : "Bancos"}
                  >
                    {option.tipo ? option.tipo : "Bancos"}
                  </MenuItem>
                ))}
            </SelectValidator>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextValidator
              variant="outlined"
              id="outlined-basic"
              label="Ingresa aqui el nuevo proveedor"
              fullWidth
              required
              onChange={handleChange}
              name="valueProveedor"
              value={formData.valueProveedor}
            />
          </Grid>
          <Grid item xs={12} md={12} className="admin-btn-cont">
            <Button
              variant="contained"
              id="btn-azul"
              className="btn-azul"
              type="submit"
              startIcon={<SaveIcon />}
            >
              Guardar proveedor
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
            ¡Se guardó el proveedor correctamente!
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
    cargarProveedor: (formData) => dispatch(cargarProveedor(formData)),
    cargarBanco: (formData) => dispatch(cargarBanco(formData)),

  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: "proveedorServicio" },
    { collection: "tipoPromocion" },
  ])
)(FormProveedores);
