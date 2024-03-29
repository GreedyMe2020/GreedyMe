import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogComponent from '../Dialog';
import { Grid, Avatar, IconButton } from '@material-ui/core';
import { format } from 'date-fns';
import ModalPromos from '../../components/modal-button';
import ModalPromosActualizar from '../../components/Promociones/modal-modificar';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import 'firebase/analytics';
import {
  cambiarVisibilidad,
  actualizarPromocion,
  eliminarPromocion,
} from '../../redux/actions/promActions';
import firebase from '../../firebase/config';
import { connect } from 'react-redux';
import _ from 'lodash';
import { crearPromocion } from '../../redux/actions/promActions';
import Typography from '@material-ui/core/Typography';
import NoBeneficios from '../../../Multimedia/Sistema-svg/no-beneficios.svg';

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
  proveedor: {
    height: '0%',
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function MisPromociones(props) {
  const classes = useStyles();
  //Estados de las promociones
  const [promos, setPromos] = React.useState([]);
  const [promos2, setPromos2] = React.useState([]);

  //Estado del dialog (abierto/cerrado)
  const [open, setOpen] = React.useState(false);

  //Estados para setear la promo a eliminar, y eliminar la promo
  const [eliminar, setEliminar] = React.useState(null);
  const [currentId, setCurrentId] = React.useState(null);

  //Snackbar cuando se elimina una promo
  const [eliminada, setEliminada] = React.useState(false);

  //Snackbar cuando se crea una promo igual
  const [mensajeAlerta, setMensajeAlerta] = React.useState(false);

  //Snackbar cuando se crea una promo igual
  const [promocionCreada, setPromocionCreada] = React.useState(false);

  //Snackbar cuando se crea una promo igual
  const [
    promocionActualizada,
    setPromocionActualizada,
  ] = React.useState(false);

  //Estados para crear nuevas promociones
  const [nuevaPromo, setNuevaPromo] = React.useState(null);
  const [text, setText] = React.useState('');

  //Estado de visibilidad para mostar u ocultar una promocion en la app mobile
  const [values, setValues] = React.useState(null);
  const [currentId2, setCurrentId2] = React.useState(null);

  //Para modificar la promo
  const [modificar, setModificar] = React.useState(null);
  const [modificado, setModificado] = React.useState(null);

  //use effect que trae los datos
  React.useEffect(() => {
    const obtenerPromociones = async () => {
      const firestore = firebase.firestore();
      try {
        const promociones = await firestore
          .collection('usuarioComercio')
          .doc(props.auth.uid)
          .collection('promociones')
          .get();
        const arrayPromociones = promociones.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPromos(arrayPromociones);
        setPromos2(arrayPromociones);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPromociones();
  }, []);

  //Para que la promo del inicio se actualice cuando entras aca
  React.useEffect(() => {
    if (promos) {
      props.setCantPromos(promos.length);
    }
  }, [promos]);

  //Eliminar una promo de la BD y renderizar la eliminacion de una promo
  React.useEffect(() => {
    if (currentId) {
      props.eliminarPromocion({
        id: props.auth.uid,
        idProm: currentId,
      });
      const promoteca = _.remove(promos, function (n) {
        return n.id === currentId;
      });
      setPromos([...promos]);
      setPromos2([...promos]);
      props.setCantPromos(promos.length);
    }
  }, [currentId]);

  //Renderizar nueva promo
  React.useEffect(() => {
    if (nuevaPromo) {
      promos.push(nuevaPromo);
      setPromos([...promos]);
      setPromos2([...promos]);
      props.setCantPromos(promos.length);
    }
  }, [nuevaPromo]);
  //Renderizar cambio de promo
  React.useEffect(() => {
    if (modificado) {
      const indiceACambiar = _.findIndex(promos, function (o) {
        return o.id === modificado.id;
      });
      const objCambiar = _.nth(promos, indiceACambiar);
      promos.splice(indiceACambiar, 1, {
        id: modificado.id,
        tipoPromo: modificado.tipoPromo,
        valuePromo: modificado.valuePromo,
        otraPromo: modificado.otraPromo,
        tipoProveedor: modificado.tipoProveedor,
        valueProveedor: modificado.valueProveedor,
        otroProveedor: modificado.otroProveedor,
        descripcion: modificado.descripcion,
        photoURL: modificado.photoURL,
        desdeVigencia: modificado.desdeVigencia,
        hastaVigencia: modificado.hastaVigencia,
        visible: modificado.visible,
        diaAplicacion: modificado.diaAplicacion,
        medioPago: modificado.medioPago,
      });
    }
  }, [modificado]);
  //cambiar visibilidad de promo
  React.useEffect(() => {
    if (currentId2) {
      props.cambiarVisibilidad({
        id: props.auth.uid,
        idProm: currentId2,
        visible: values,
      });

      const indiceACambiar = _.findIndex(promos, function (o) {
        return o.id === currentId2;
      });

      const objCambiar = _.nth(promos, indiceACambiar);

      promos.splice(indiceACambiar, 1, {
        id: objCambiar.id,
        tipoPromo: objCambiar.tipoPromo,
        valuePromo: objCambiar.valuePromo,
        otraPromo: objCambiar.otraPromo,
        tipoProveedor: objCambiar.tipoProveedor,
        valueProveedor: objCambiar.valueProveedor,
        otroProveedor: objCambiar.otroProveedor,
        descripcion: objCambiar.descripcion,
        photoURL: objCambiar.photoURL,
        desdeVigencia: objCambiar.desdeVigencia,
        hastaVigencia: objCambiar.hastaVigencia,
        visible: values,
        diaAplicacion: objCambiar.diaAplicacion,
        medioPago: objCambiar.medioPago,
      });

      setOpenAlert(true);
    }
    setCurrentId2(null);
  }, [currentId2]);

  const handleClickShowPromo = () => {
    setValues(!promo.id);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleMouseDownPromo = (event) => {
    event.preventDefault();
  };
  // funcion para el buscador
  const filter = (text) => {
    let textoBuscar = text.target.value;
    const datos = promos2;
    const newDatos = datos.filter(function (item) {
      const itemTipoPromo = item.tipoPromo.toUpperCase();
      const itemValuePromo = item.valuePromo.toUpperCase();
      const itemProveedor = item.tipoProveedor.toUpperCase();
      const itemValueProveedor = item.valueProveedor.toUpperCase();
      const itemDescripcion = item.descripcion.toUpperCase();
      const campo =
        itemTipoPromo +
        ' ' +
        itemValuePromo +
        ' ' +
        itemProveedor +
        ' ' +
        itemValueProveedor +
        ' ' +
        itemDescripcion;
      const textData = textoBuscar.toUpperCase();
      return campo.indexOf(textData) > -1;
    });
    setPromos(newDatos);
    setText(text);
  };
  //funcion para crear una promo
  const crear = (
    formData,
    id,
    state,
    value,
    desdeVigencia,
    hastaVigencia,
  ) => {
    let crearPromo = 0;
    let fechaPromoDesde = format(
      firebase.firestore.Timestamp.fromDate(desdeVigencia).toDate(),
      'dd/MM/yyyy',
    );
    let fechaPromoHasta = format(
      firebase.firestore.Timestamp.fromDate(hastaVigencia).toDate(),
      'dd/MM/yyyy',
    );
    promos.forEach((promo) => {
      let fechaDesde = format(
        promo.desdeVigencia.toDate(),
        'dd/MM/yyyy',
      );
      let fechaHasta = format(
        promo.hastaVigencia.toDate(),
        'dd/MM/yyyy',
      );
      if (
        promo.tipoPromo === formData.tipoPromo &&
        promo.valuePromo === formData.valuePromo &&
        promo.tipoProveedor === formData.tipoProveedor &&
        promo.valueProveedor === formData.valueProveedor &&
        promo.diaAplicacion.lunes === state.lunes &&
        promo.diaAplicacion.martes === state.martes &&
        promo.diaAplicacion.miercoles === state.miercoles &&
        promo.diaAplicacion.jueves === state.jueves &&
        promo.diaAplicacion.viernes === state.viernes &&
        promo.diaAplicacion.sabado === state.sabado &&
        promo.diaAplicacion.domingo === state.domingo &&
        promo.diaAplicacion.todoslosdias === state.todoslosdias &&
        promo.medioPago === value &&
        fechaDesde === fechaPromoDesde &&
        fechaHasta === fechaPromoHasta &&
        promo.otraPromo === formData.otraPromo &&
        promo.otroProveedor === formData.otroProveedor
      ) {
        crearPromo += 1;
      }
    });
    if (crearPromo === 0) {
      setPromocionCreada(true);
      props.crearPromocion(
        formData,
        id,
        state,
        value,
        desdeVigencia,
        hastaVigencia,
      );
      setNuevaPromo({
        id: id,
        tipoPromo: formData.tipoPromo,
        valuePromo: formData.valuePromo,
        otraPromo: formData.otraPromo,
        tipoProveedor: formData.tipoProveedor,
        valueProveedor: formData.valueProveedor,
        otroProveedor: formData.otroProveedor,
        descripcion: formData.descripcion,
        photoURL: formData.photoURL,
        desdeVigencia: firebase.firestore.Timestamp.fromDate(
          desdeVigencia,
        ),
        hastaVigencia: firebase.firestore.Timestamp.fromDate(
          hastaVigencia,
        ),
        visible: false,
        diaAplicacion: state,
        medioPago: value,
      });
    } else {
      setMensajeAlerta(true);
    }
  };

  const actualizar = (
    formData,
    state,
    value,
    desdeVigencia,
    hastaVigencia,
  ) => {
    let crearPromo = 0;
    let fechaPromoDesde = format(
      firebase.firestore.Timestamp.fromDate(desdeVigencia).toDate(),
      'dd/MM/yyyy',
    );
    let fechaPromoHasta = format(
      firebase.firestore.Timestamp.fromDate(hastaVigencia).toDate(),
      'dd/MM/yyyy',
    );
    promos.forEach((promo) => {
      let fechaDesde = format(
        promo.desdeVigencia.toDate(),
        'dd/MM/yyyy',
      );
      let fechaHasta = format(
        promo.hastaVigencia.toDate(),
        'dd/MM/yyyy',
      );
      if (
        promo.tipoPromo === formData.tipoPromo &&
        promo.valuePromo === formData.valuePromo &&
        promo.tipoProveedor === formData.tipoProveedor &&
        promo.valueProveedor === formData.valueProveedor &&
        promo.diaAplicacion.lunes === state.lunes &&
        promo.diaAplicacion.martes === state.martes &&
        promo.diaAplicacion.miercoles === state.miercoles &&
        promo.diaAplicacion.jueves === state.jueves &&
        promo.diaAplicacion.viernes === state.viernes &&
        promo.diaAplicacion.sabado === state.sabado &&
        promo.diaAplicacion.domingo === state.domingo &&
        promo.diaAplicacion.todoslosdias === state.todoslosdias &&
        promo.medioPago === value &&
        fechaDesde === fechaPromoDesde &&
        fechaHasta === fechaPromoHasta
      ) {
        crearPromo += 1;
      }
    });
    if (crearPromo === 0) {
      setPromocionActualizada(true);
      props.actualizarPromocion(
        formData,
        state,
        value,
        desdeVigencia,
        hastaVigencia,
      );
      setModificado({
        id: formData.idProm,
        tipoPromo: formData.tipoPromo,
        valuePromo: formData.valuePromo,
        otraPromo: formData.otraPromo,
        tipoProveedor: formData.tipoProveedor,
        valueProveedor: formData.valueProveedor,
        otroProveedor: formData.otroProveedor,
        descripcion: formData.descripcion,
        photoURL: formData.photoURL,
        desdeVigencia: firebase.firestore.Timestamp.fromDate(
          desdeVigencia,
        ),
        hastaVigencia: firebase.firestore.Timestamp.fromDate(
          hastaVigencia,
        ),
        visible: false,
        diaAplicacion: state,
        medioPago: value,
      });
    } else {
      setMensajeAlerta(true);
    }
  };

  const [openModificar, setOpenModificar] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('md');

  const handleClickOpenModificar = () => {
    setOpenModificar(true);
  };

  const handleCloseModificar = () => {
    setOpenModificar(false);
  };

  const [openAlert, setOpenAlert] = React.useState(false);

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
    setEliminada(false);
    setMensajeAlerta(false);
    setPromocionCreada(false);
    setPromocionActualizada(false);
  };

  function handleDias(promo) {
    const dias = [];
    for (const dia of promo) {
      if (dia) {
        dias.push(promo.key);
      }
    }
  }
  return (
    <div>
      <ModalPromos
        crear={crear}
        defaultValue={text}
        onChange={(text) => filter(text)}
      />
      <div className="contenedorTodo">
        <Card className="cardPromo">
          <CardContent className="cardContentePromo">
            <Grid item xs={12} md={12}>
              <div className={classes.demo}>
                <List>
                  {promos.length === 0 ? (
                    <div className="no-promo-cont">
                      <img
                        src={NoBeneficios}
                        alt="NoBeneficios"
                        height="400"
                        width="800"
                      />
                      <p className="no-promo-text">
                        No se encontraron beneficios
                      </p>
                    </div>
                  ) : null}
                  {promos &&
                    promos.map((promo) => {
                      return (
                        <ListItem
                          key={promo.id}
                          className={
                            promo.hastaVigencia.toDate() < new Date()
                              ? 'fondoGris'
                              : ''
                          }
                        >
                          <ListItemAvatar>
                            <Avatar
                              variant="square"
                              className={classes.proveedor}
                              src={promo.photoURL}
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
                                    {promo.tipoPromo +
                                      ' ' +
                                      (promo.valuePromo === 'Otro'
                                        ? promo.otraPromo
                                        : promo.valuePromo) +
                                      ' ' +
                                      (promo.valueProveedor === 'Otro'
                                        ? promo.otroProveedor
                                        : promo.valueProveedor ===
                                          'Todos'
                                        ? 'Todos los Bancos'
                                        : promo.valueProveedor) +
                                      ', ' +
                                      (promo.tipoProveedor ===
                                        'Tarjetas de crédito' ||
                                      promo.tipoProveedor ===
                                        'Tarjetas de débito'
                                        ? promo.otroProveedor + ' '
                                        : '') +
                                      (promo.otroProveedor === 'Todas'
                                        ? 'las Tarjetas '
                                        : '') +
                                      'válida desde el ' +
                                      format(
                                        promo.desdeVigencia.toDate(),
                                        'dd/MM/yyyy',
                                      ) +
                                      ' hasta el ' +
                                      format(
                                        promo.hastaVigencia.toDate(),
                                        'dd/MM/yyyy',
                                      ) +
                                      '.'}
                                  </Typography>
                                  {'Días que aplica: ' +
                                    ((promo.diaAplicacion.lunes
                                      ? 'Lunes.'
                                      : '') +
                                      ' ' +
                                      (promo.diaAplicacion.martes
                                        ? 'Martes.'
                                        : '') +
                                      ' ' +
                                      (promo.diaAplicacion.miercoles
                                        ? 'Miercoles.'
                                        : '') +
                                      ' ' +
                                      (promo.diaAplicacion.jueves
                                        ? 'Jueves.'
                                        : '') +
                                      ' ' +
                                      (promo.diaAplicacion.viernes
                                        ? 'Viernes.'
                                        : '') +
                                      ' ' +
                                      (promo.diaAplicacion.sabado
                                        ? 'Sábado.'
                                        : '') +
                                      ' ' +
                                      (promo.diaAplicacion.domingo
                                        ? 'Domingo.'
                                        : '') +
                                      ' ' +
                                      (promo.diaAplicacion
                                        .todoslosdias
                                        ? 'Todos los días.'
                                        : ''))}
                                </React.Fragment>
                              }
                              secondary={
                                'Forma de pago: ' +
                                promo.medioPago +
                                '. ' +
                                (promo.descripcion
                                  ? promo.descripcion
                                  : '')
                              }
                            />
                            {promo.hastaVigencia.toDate() <
                            new Date() ? (
                              <Chip
                                label="VENCIDO"
                                style={{
                                  color: '#D32F2F',
                                  borderColor: '#D32F2F',
                                  fontSize: 12,
                                }}
                                variant="outlined"
                                size="small"
                              />
                            ) : (
                              ''
                            )}
                          </div>
                          <ListItemSecondaryAction>
                            <Tooltip title="Editar" arrow>
                              <IconButton
                                aria-label="Editar"
                                onClick={() => {
                                  setModificar({
                                    id: promo.id,
                                    tipoPromo: promo.tipoPromo,
                                    valuePromo: promo.valuePromo,
                                    otraPromo: promo.otraPromo,
                                    tipoProveedor:
                                      promo.tipoProveedor,
                                    valueProveedor:
                                      promo.valueProveedor,
                                    otroProveedor:
                                      promo.otroProveedor,
                                    descripcion: promo.descripcion,
                                    diaAplicacion:
                                      promo.diaAplicacion,
                                    desdeVigencia:
                                      promo.desdeVigencia,
                                    hastaVigencia:
                                      promo.hastaVigencia,
                                    photoURL: promo.photoURL,
                                    visible: promo.visible,
                                    medioPago: promo.medioPago,
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
                              style={{
                                backgroundColor: 'transparent',
                              }}
                            >
                              <DialogTitle id="dialog-title-prom">
                                <h5>Modificar beneficio</h5>
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
                                  <ModalPromosActualizar
                                    promo={modificar}
                                    actualizar={actualizar}
                                  />
                                </DialogContentText>
                              </DialogContent>
                            </Dialog>
                            {promo.hastaVigencia.toDate() <
                            new Date() ? (
                              <IconButton
                                aria-label="Mostrar/Ocultar"
                                disabled
                              >
                                <VisibilityOff />
                              </IconButton>
                            ) : (
                              <Tooltip title="Mostrar/Ocultar" arrow>
                                <IconButton
                                  aria-label="Mostrar/Ocultar"
                                  onClick={() => {
                                    setValues(!promo.visible);
                                    setCurrentId2(promo.id);
                                  }}
                                  onMouseDown={handleMouseDownPromo}
                                >
                                  {promo.visible ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </Tooltip>
                            )}

                            <Tooltip title="Eliminar" arrow>
                              <IconButton
                                onClick={() => {
                                  setEliminar(promo.id);
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
                                '¿Estás seguro de eliminar el beneficio?'
                              }
                              text={
                                'Una vez que aceptes eliminar el beneficio, el mismo no podrá ser recuperado.'
                              }
                              btnText={'Eliminar'}
                            />
                          </ListItemSecondaryAction>
                        </ListItem>
                      );
                    })}
                </List>
                {eliminada ? (
                  <Snackbar
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    open={eliminada}
                    autoHideDuration={8000}
                    onClose={handleCloseAlert}
                  >
                    <Alert
                      onClose={handleCloseAlert}
                      severity="error"
                    >
                      El beneficio se ha eliminado
                    </Alert>
                  </Snackbar>
                ) : (
                  ''
                )}
                {values ? (
                  <Snackbar
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    open={openAlert}
                    autoHideDuration={8000}
                    onClose={handleCloseAlert}
                  >
                    <Alert onClose={handleCloseAlert} severity="info">
                      El beneficio está visible en la aplicación
                    </Alert>
                  </Snackbar>
                ) : (
                  <Snackbar
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    open={openAlert}
                    autoHideDuration={8000}
                    onClose={handleCloseAlert}
                  >
                    <Alert
                      onClose={handleCloseAlert}
                      severity="warning"
                    >
                      Se ocultó el beneficio en la aplicación
                    </Alert>
                  </Snackbar>
                )}
                {mensajeAlerta ? (
                  <Snackbar
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    open={mensajeAlerta}
                    autoHideDuration={8000}
                    onClose={handleCloseAlert}
                  >
                    <Alert
                      onClose={handleCloseAlert}
                      severity="error"
                    >
                      Ya se creo un beneficio con los mismos datos.
                    </Alert>
                  </Snackbar>
                ) : (
                  ''
                )}
                {promocionCreada ? (
                  <Snackbar
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    open={promocionCreada}
                    autoHideDuration={8000}
                    onClose={handleCloseAlert}
                  >
                    <Alert
                      onClose={handleCloseAlert}
                      severity="success"
                    >
                      El beneficio se cargo correctamente!
                    </Alert>
                  </Snackbar>
                ) : (
                  ''
                )}
                {promocionActualizada ? (
                  <Snackbar
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    open={promocionActualizada}
                    autoHideDuration={8000}
                    onClose={handleCloseAlert}
                  >
                    <Alert
                      onClose={handleCloseAlert}
                      severity="success"
                    >
                      ¡El beneficio se actualizo correctamente!
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
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actualizarPromocion: (
      promocion,
      dias,
      efectivo,
      desdeVigencia,
      hastaVigencia,
    ) =>
      dispatch(
        actualizarPromocion(
          promocion,
          dias,
          efectivo,
          desdeVigencia,
          hastaVigencia,
        ),
      ),
    eliminarPromocion: (promocion) =>
      dispatch(eliminarPromocion(promocion)),
    cambiarVisibilidad: (promocion) =>
      dispatch(cambiarVisibilidad(promocion)),
    crearPromocion: (
      promocion,
      id,
      dias,
      efectivo,
      desdeVigencia,
      hastaVigencia,
    ) =>
      dispatch(
        crearPromocion(
          promocion,
          id,
          dias,
          efectivo,
          desdeVigencia,
          hastaVigencia,
        ),
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MisPromociones);
