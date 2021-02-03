import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { MenuItem } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import firebase from '../../../firebase/config';
import { connect } from 'react-redux';
import {
  ValidatorForm,
  SelectValidator,
  TextValidator,
} from 'react-material-ui-form-validator';
import Grid from '@material-ui/core/Grid';
import {
  cargarProveedor,
  cargarBanco,
} from '../../../redux/actions/adminActions';
import _ from 'lodash';
import Snackbar from '@material-ui/core/Snackbar';
import Avatar from '@material-ui/core/Avatar';
import {
  subirFoto,
  eliminarFoto,
} from '../../../redux/actions/comActions';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { cargarPremio, modificarPremio } from '../../../redux/actions/adminActions';

const useStyles = makeStyles((theme) => ({
  root: {
    gridColumn: '2/4',
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  cruz: {
    position: 'absolute',
    right: theme.spacing(1),
    top: '8px',
    color: theme.palette.grey[500],
  },
  inline: {
    display: 'block',
  },
  cont: {
    flexGrow: 1,
  },
  input: {
    display: 'none',
  },
  contenedor: {
    display: 'grid',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    gridTemplateColumns: '1fr 2fr',
    gridTemplateRows: '1fr',
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
    justifySelf: 'center',
    alignSelf: 'center',
    marginLeft: 35,
  },
  boton: {
    backgroundColor: '#76b39d',
    color: 'white',
    fontSize: 13,
  },
  elim: {
    cursor: 'pointer',
    color: '#707070',
    fontSize: 15,
    marginLeft: 27,
    top: 5,
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function FormProductos(props) {
  const classes = useStyles();

  //Estados para cargar la imagen y la barra de progreso de carga
  const [picture, setPicture] = useState(props.photoURL ? props.photoURL : null);
  const [valorCarga, setValorCarga] = useState(0);

  const [formData, setFormData] = React.useState({
    nombre: props.nombre ? props.nombre : '',
    descripcion: props.descripcion ? props.descripcion : '',
    greedypoints: props.greedyPoints ? props.greedyPoints : '',
    photoURL: props.photoURL ? props.photoURL : null,
  });
  //Estado para manejar el snackbar
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.modificar){
      props.modificarPremio(props.id, formData);
      setOpen(true);
    } else {
      props.cargarPremio(formData);
      setFormData({
        nombre: '',
        descripcion:  '',
        greedypoints: '',
        photoURL: null,
      })
      setOpen(true);
    }
    
  };

  const handleDelete = () => {
    setPicture(null);
    setValorCarga(0);
    formData.photoURL = null;
    setFormData({ ...formData });
  };

  const handleChange = (event) => {
    formData[event.target.name] = event.target.value;
    setFormData({ ...formData });
  };

  //Funcion para cerrar el snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  //Funcion para el manejo de la carga de la imagen con firebase
  const handleUpload = (event) => {
    const file = event.target.files[0];
    const storageRef = firebase
      .storage()
      .ref(`/proveedores/${file.name}`);
    const task = storageRef.put(file);
    task.on(
      'state_changed',
      function (snapshot) {
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            let porcentaje =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setValorCarga(porcentaje);
            break;
        }
      },
      function (error) {
        console.log(error);
      },
      function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        task.snapshot.ref
          .getDownloadURL()
          .then(function (downloadURL) {
            setPicture(downloadURL);
            formData.photoURL = downloadURL;
            setFormData({ ...formData });
          });
      },
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
                  onChange={handleUpload}
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
              <div className="ml-1">
                {valorCarga === 0 ? null : (
                  <progress value={valorCarga} max="100"></progress>
                )}
              </div>
              <div className={classes.elim}>
                <a className="eliminar-img" onClick={handleDelete}>
                  Eliminar imagen
                </a>
              </div>
            </div>
          </div>

          <Grid item xs={12} md={12}>
            <TextValidator
              variant="outlined"
              id="outlined-basic"
              label="Ingresa aqui el nuevo producto"
              fullWidth
              required
              onChange={handleChange}
              name="nombre"
              value={formData.nombre}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextValidator
              variant="outlined"
              id="outlined-basic"
              label="Ingresa aqui los GreedyPoints"
              fullWidth
              required
              onChange={handleChange}
              name="greedypoints"
              value={formData.greedypoints}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextValidator
              variant="outlined"
              id="outlined-basic"
              label="Ingresa aqui la descripción del producto"
              fullWidth
              required
              onChange={handleChange}
              name="descripcion"
              value={formData.descripcion}
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
              Guardar producto
            </Button>
          </Grid>
        </Grid>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={open}
          autoHideDuration={8000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            ¡Se guardó el producto correctamente!
          </Alert>
        </Snackbar>
      </ValidatorForm>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    premio: state.admin.premio,
    premioFalla: state.admin.premioFalla,
    premioEliminado: state.admin.premioEliminado,
    errorModificacionPremio: state.admin.errorModificacionPremio,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cargarPremio: (formData) => dispatch(cargarPremio(formData)),
    modificarPremio: (id, formData) => dispatch(modificarPremio(id, formData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormProductos);
