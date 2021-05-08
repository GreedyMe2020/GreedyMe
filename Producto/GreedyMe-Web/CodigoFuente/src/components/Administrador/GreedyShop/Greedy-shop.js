import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import DialogComponent from '../../Dialog';
import Dialog from '@material-ui/core/Dialog';
import { Grid, Avatar, IconButton } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import ModalAdministrador from '../modal-admin';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import CreateIcon from '@material-ui/icons/Create';
import CloseIcon from '@material-ui/icons/Close';
import { eliminarPremio } from '../../../redux/actions/adminActions';
import FormProducto from './FormProductos';
import Snackbar from '@material-ui/core/Snackbar';
import firebase from '../../../firebase/config';
import _ from 'lodash';
//esta es la funcion que trae los datos, tipo crea un array trae todos las promociones
//y la va acumulando en el array

const useStyles = makeStyles((theme) => ({
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
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ListaUsuarios(props) {
  const classes = useStyles();

  //Estado del dialog (abierto/cerrado) y propiedades del dialog
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('xs');
  const [openModificar, setOpenModificar] = React.useState(false);
  //estado de alerta
  const [openAlert, setOpenAlert] = React.useState(false);
  //estado para Modificar
  const [modificar, setModificar] = React.useState({
    id: '',
    nombre: '',
    greedyPoints: '',
    photoURL: '',
    descripcion: '',
  });
  const handleClose = () => {
    setOpen(false);
  };
  const handleMouseDownPromo = (event) => {
    event.preventDefault();
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setEliminada(false);
  };

  //estados solo para el buscador

  const [listaProductos, setListaProductos] = React.useState(
    props.premios,
  );
  const [texto, setTexto] = React.useState(false);
  const [text, setText] = React.useState('');

  //Estados para setear producto a eliminar, y eliminarlo
  const [eliminar, setEliminar] = React.useState(null);
  const [currentId, setCurrentId] = React.useState(null);

  //Snackbar cuando se elimina un producto
  const [eliminada, setEliminada] = React.useState(false);

  //Eliminar un producto de la BD y renderizar la eliminacion (cambiarlo para los productos)
  React.useEffect(() => {
    if (currentId) {
      props.eliminarPremio(currentId);
    }
  }, [currentId]);

  //funcion para buscar
  const filter = (text) => {
    if (props.premios) {
      let textoBuscar = text.target.value;
      const datos = props.premios;
      const newDatos = datos.filter(function (item) {
        const itemNombrePremio = item.nombre.toUpperCase();
        const itemGreedyPoints = item.greedyPoints.toUpperCase();
        const itemDescripcionPremio = item.descripcion.toUpperCase();
        const campo =
          itemNombrePremio +
          ' ' +
          itemGreedyPoints +
          ' ' +
          itemDescripcionPremio;
        const textData = textoBuscar.toUpperCase();
        return campo.indexOf(textData) > -1;
      });
      setListaProductos(newDatos);
      setText(text);
      if (text.target.value != '') {
        setTexto(true);
      } else {
        setTexto(false);
      }
    }
  };

  //abre y cierra el modal de modificar (el lapiz)
  const handleClickOpenModificar = () => {
    setOpenModificar(true);
  };

  const handleCloseModificar = () => {
    setOpenModificar(false);
  };

  /* const crearComercio = (formData) => {
    props.signUp(formData);
  };

  const actualizarComercio = (formData) => {
    props.modificarUsuarioComercio(formData);
  }; */

  return (
    <div>
      <ModalAdministrador
        title="Productos"
        titleModal="Cargar nuevo producto"
        button="Nuevo producto"
        openContent={<FormProducto />}
        placeholder="Buscar producto…"
        width="xs"
        onChange={(text) => filter(text)}
      />

      <div className="contenedorTodo">
        <Card className="cardPromo">
          <CardContent className="cardContentePromo">
            <Grid item xs={12} md={12}>
              <div className={classes.demo}>
                <List>
                  {props.premios && texto === false
                    ? props.premios.map((premio) => {
                        return (
                          <ListItem key={premio.id}>
                            <ListItemAvatar>
                              <Avatar
                                variant="square"
                                src={
                                  premio.photoURL !== null
                                    ? premio.photoURL
                                    : require('../../../../Multimedia/Sistema-svg/cafe.svg')
                                }
                              ></Avatar>
                            </ListItemAvatar>
                            <div className="elementoListaProm">
                              <ListItemText
                                //asi podes ir accediendo a todos los datos asi los acomodas como quieras
                                primary={
                                  <React.Fragment>
                                    <Typography
                                      className={classes.inline}
                                    >
                                      {premio.nombre}
                                    </Typography>
                                    <Typography>
                                      {premio.greedyPoints}
                                    </Typography>
                                  </React.Fragment>
                                }
                                secondary={premio.descripcion}
                              />
                            </div>
                            <ListItemSecondaryAction>
                              <Tooltip title="Editar" arrow>
                                <IconButton
                                  aria-label="Editar"
                                  onClick={() => {
                                    setModificar({
                                      id: premio.id,
                                      nombre: premio.nombre,
                                      greedyPoints:
                                        premio.greedyPoints,
                                      photoURL: premio.photoURL,
                                      descripcion: premio.descripcion,
                                    });
                                    handleClickOpenModificar();
                                  }}
                                >
                                  <CreateIcon />
                                </IconButton>
                              </Tooltip>
                              <Dialog
                                fullWidth={fullWidth}
                                maxWidth={maxWidth}
                                open={openModificar}
                                onClose={handleCloseModificar}
                              >
                                <DialogTitle id="dialog-title-prom">
                                  <h5>Modificar producto</h5>
                                  <IconButton
                                    aria-label="close"
                                    id="btn"
                                    className={classes.cruz}
                                    onClick={handleCloseModificar}
                                  >
                                    <CloseIcon />
                                  </IconButton>
                                </DialogTitle>
                                <DialogContent dividers>
                                  <DialogContentText>
                                    <FormProducto
                                      id={modificar.id}
                                      nombre={modificar.nombre}
                                      descripcion={
                                        modificar.descripcion
                                      }
                                      greedyPoints={
                                        modificar.greedyPoints
                                      }
                                      photoURL={modificar.photoURL}
                                      modificar={true}
                                    />{' '}
                                    {/* HAY QUE AGREGARLE PROPS PARA PASARLE LOS DATOS COMO PROPS */}
                                  </DialogContentText>
                                </DialogContent>
                              </Dialog>

                              <Tooltip title="Eliminar" arrow>
                                <IconButton
                                  onClick={() => {
                                    setEliminar(premio.id);
                                    setOpen(true);
                                  }}
                                  edge="end"
                                  aria-label="Eliminar"
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                              <DialogComponent
                                open={open}
                                setOpen={setOpen}
                                handleClose={handleClose}
                                eliminar={eliminar}
                                setEliminar={setEliminar}
                                setEliminada={setEliminada}
                                setCurrentId={setCurrentId}
                                title={
                                  '¿Estás seguro de eliminar el producto?'
                                }
                                text={
                                  'Una vez que aceptes eliminar el producto, el mismo no podrá ser recuperado.'
                                }
                                btnText={'Eliminar'}
                              />
                            </ListItemSecondaryAction>
                          </ListItem>
                        );
                      })
                    : listaProductos
                    ? listaProductos.map((premio) => {
                        return (
                          <ListItem key={premio.id}>
                            <ListItemAvatar>
                              <Avatar
                                variant="square"
                                src={
                                  premio.photoURL !== null
                                    ? premio.photoURL
                                    : require('../../../../Multimedia/Sistema-svg/cafe.svg')
                                }
                              ></Avatar>
                            </ListItemAvatar>
                            <div className="elementoListaProm">
                              <ListItemText
                                //asi podes ir accediendo a todos los datos asi los acomodas como quieras
                                primary={
                                  <React.Fragment>
                                    <Typography
                                      className={classes.inline}
                                    >
                                      {premio.nombre}
                                    </Typography>
                                    <Typography>
                                      {premio.greedyPoints}
                                    </Typography>
                                  </React.Fragment>
                                }
                                secondary={premio.descripcion}
                              />
                            </div>
                            <ListItemSecondaryAction>
                              <Tooltip title="Editar" arrow>
                                <IconButton
                                  aria-label="Editar"
                                  onClick={() => {
                                    setModificar({
                                      id: premio.id,
                                      nombre: premio.nombre,
                                      greedyPoints:
                                        premio.greedyPoints,
                                      photoURL: premio.photoURL,
                                      descripcion: premio.descripcion,
                                    });
                                    handleClickOpenModificar();
                                  }}
                                >
                                  <CreateIcon />
                                </IconButton>
                              </Tooltip>
                              <Dialog
                                fullWidth={fullWidth}
                                maxWidth={maxWidth}
                                open={openModificar}
                                onClose={handleCloseModificar}
                              >
                                <DialogTitle id="dialog-title-prom">
                                  <h5>Modificar producto</h5>
                                  <IconButton
                                    aria-label="close"
                                    id="btn"
                                    className={classes.cruz}
                                    onClick={handleCloseModificar}
                                  >
                                    <CloseIcon />
                                  </IconButton>
                                </DialogTitle>
                                <DialogContent dividers>
                                  <DialogContentText>
                                    <FormProducto
                                      id={modificar.id}
                                      nombre={modificar.nombre}
                                      descripcion={
                                        modificar.descripcion
                                      }
                                      greedyPoints={
                                        modificar.greedyPoints
                                      }
                                      photoURL={modificar.photoURL}
                                      modificar={true}
                                    />{' '}
                                    {/* HAY QUE AGREGARLE PROPS PARA PASARLE LOS DATOS COMO PROPS */}
                                  </DialogContentText>
                                </DialogContent>
                              </Dialog>

                              <Tooltip title="Eliminar" arrow>
                                <IconButton
                                  onClick={() => {
                                    setEliminar(premio.id);
                                    setOpen(true);
                                  }}
                                  edge="end"
                                  aria-label="Eliminar"
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                              <DialogComponent
                                open={open}
                                setOpen={setOpen}
                                handleClose={handleClose}
                                eliminar={eliminar}
                                setEliminar={setEliminar}
                                setEliminada={setEliminada}
                                setCurrentId={setCurrentId}
                                title={
                                  '¿Estás seguro de eliminar el producto?'
                                }
                                text={
                                  'Una vez que aceptes eliminar el producto, el mismo no podrá ser recuperado.'
                                }
                                btnText={'Eliminar'}
                              />
                            </ListItemSecondaryAction>
                          </ListItem>
                        );
                      })
                    : null}
                </List>
                {eliminada ? (
                  <Snackbar
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    open={eliminada}
                    autoHideDuration={7000}
                    onClose={handleCloseAlert}
                  >
                    <Alert
                      onClose={handleCloseAlert}
                      severity="error"
                    >
                      El producto se ha eliminado
                    </Alert>
                  </Snackbar>
                ) : (
                  ''
                )}
              </div>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    premios: state.firestore.ordered.greedyPremio,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    eliminarPremio: (id) => dispatch(eliminarPremio(id)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: 'greedyPremio' }]),
)(ListaUsuarios);
