import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import DialogComponent from '../../Dialog';
import Tooltip from '@material-ui/core/Tooltip';
import { Grid, Avatar, CssBaseline } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import FormTipoPromocion from './FormTipoPromocion';
import FormPromocion from './FormPromocion';
import ModalAdministradorPr from '../modal-admin-pr';
import Snackbar from '@material-ui/core/Snackbar';
import { eliminarTipoPromocion } from '../../../redux/actions/adminActions';
import { eliminarPromocion } from '../../../redux/actions/adminActions';
import Chip from '@material-ui/core/Chip';
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

function ListaPromocion(props) {
  const classes = useStyles();

  //Estado del dialog (abierto/cerrado)
  const [open, setOpen] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  //Estado del dialog (abierto/cerrado)
  const [open2, setOpen2] = React.useState(false);
  //para eliminar
  const [eliminar, setEliminar] = React.useState(null);
  const [currentId, setCurrentId] = React.useState(null);

  //Snackbar cuando se elimina
  const [eliminada, setEliminada] = React.useState(false);

  const [listaPromociones, setListaPromociones] = React.useState(
    props.tipoPromo,
  );
  const [text, setText] = React.useState('');
  const [texto, setTexto] = React.useState(false);


  React.useEffect(() => {
    if (currentId) {
      props.eliminarTipoPromocion({
        id: currentId,
      });
      setOpenSnack(true);
    }
  }, [currentId]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleMouseDownPromo = (event) => {
    event.preventDefault();
  };

  const filter = (text) => {
    if (props.tipoPromo) {
      let textoBuscar = text.target.value;
      const datos = props.tipoPromo;
      const newDatos = datos.filter(function (item) {
        const tipo = item.tipo.toUpperCase();
        const campo = tipo;
        const textData = textoBuscar.toUpperCase();

        return campo.indexOf(textData) > -1;
      });
      setListaPromociones(newDatos);
      setText(text);
      if (text.target.value != '') {
        setTexto(true);
      } else {
        setTexto(false);
      }
    }
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  const handleClose2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen2(false);
  };

  //elimina la promocion
  const handleDelete = (promocion, idPromocion) => {
    props.eliminarPromocion(promocion, idPromocion);
    setOpen2(true);
  };

  const form = React.createRef();
  return (
    <div>
      <ModalAdministradorPr
        title="Beneficios ofrecidos por locales"
        button="Cargar beneficio"
        button2="Cargar tipo beneficio"
        titleModal="Cargar nuevo beneficio"
        titleModal2="Cargar nuevo tipo de beneficio"
        openContent={<FormPromocion />}
        openContent2={<FormTipoPromocion />}
        placeholder="Buscar beneficio…"
        onChange={(text) => filter(text)}
      />
      <div className="contenedorTodo">
        <Card className="cardPromo">
          <CardContent className="cardContentePromo">
            <Grid item xs={12} md={12}>
              <div className={classes.demo}>
                <List>
                  {props.tipoPromo && texto === false
                    ? props.tipoPromo.map((item) => {
                      return (
                        <ListItem key={item.id}>
                          <ListItemAvatar key={item.id}>
                            <Avatar
                              variant="square"
                              src={require('../../../../Multimedia/Sistema-svg/price-tag (5).svg')}
                            ></Avatar>
                          </ListItemAvatar>

                          <div className="elementoListaProm">
                            <ListItemText key={item.id}
                              primary={
                                <React.Fragment>
                                  <Typography
                                    className={classes.inline}
                                  >
                                    {item.tipo}
                                  </Typography>
                                  {item.lista.map((ite) => {
                                    return (
                                      <Chip
                                        label={ite.valor}
                                        variant="outlined"
                                        size="small"
                                        key={ite.photoURL}
                                        style={{
                                          margin: '0px 4px 4px 0px',
                                        }}
                                        onDelete={() => handleDelete(ite.valor, item.id)}
                                      />
                                    );
                                  })}
                                </React.Fragment>
                              }
                            />
                          </div>
                          <ListItemSecondaryAction>
                            <Tooltip title="Eliminar" arrow>
                              <IconButton
                                onClick={() => {
                                  setEliminar(item.id);
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
                                'Una vez que aceptes eliminar el beneficio, el misma no podrá ser recuperada.'
                              }
                              btnText={'Eliminar'}
                            />
                          </ListItemSecondaryAction>
                        </ListItem>
                      );
                    })
                    : listaPromociones
                      ? listaPromociones.map((item) => {
                        return (
                          <ListItem key={item.id}>
                            <ListItemAvatar key={item.id}>
                              <Avatar
                                variant="square"
                                src={require('../../../../Multimedia/Sistema-svg/price-tag (5).svg')}
                              ></Avatar>
                            </ListItemAvatar>

                            <div className="elementoListaProm">
                              <ListItemText key={item.id}
                                primary={
                                  <React.Fragment>
                                    <Typography
                                      className={classes.inline}
                                    >
                                      {item.tipo}
                                    </Typography>
                                    {item.lista.map((ite) => {
                                      return (
                                        <Chip
                                          label={ite.valor}
                                          variant="outlined"
                                          size="small"
                                          key={ite.photoURL}
                                          style={{
                                            margin: '0px 4px 4px 0px',
                                          }}
                                          onDelete={() => handleDelete(ite.valor, item.id)}
                                        />
                                      );
                                    })}
                                  </React.Fragment>
                                }
                              />
                            </div>
                            <ListItemSecondaryAction>
                              <Tooltip title="Eliminar" arrow>
                                <IconButton
                                  onClick={() => {
                                    setEliminar(item.id);
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
                                  'Una vez que aceptes eliminar el beneficio, el misma no podrá ser recuperada.'
                                }
                                btnText={'Eliminar'}
                              />
                            </ListItemSecondaryAction>
                          </ListItem>
                        );
                      }) : null}
                </List>
                {eliminada ? (
                  <Snackbar
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    open={openSnack}
                    autoHideDuration={8000}
                    onClose={handleCloseSnack}
                  >
                    <Alert
                      onClose={handleCloseSnack}
                      severity="error"
                    >
                      El tipo de beneficio se ha eliminado
                    </Alert>
                  </Snackbar>
                ) : (
                  ''
                )}
              </div>
            </Grid>
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              open={open2}
              autoHideDuration={8000}
              onClose={handleClose2}
            >
              <Alert onClose={handleClose2} severity="success">
                El beneficio se ha eliminado.
              </Alert>
            </Snackbar>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    proveedores: state.firestore.ordered.proveedorServicio,
    tipoPromo: state.firestore.ordered.tipoPromocion,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    eliminarTipoPromocion: (formData) =>
      dispatch(eliminarTipoPromocion(formData)),
    eliminarPromocion: (promocion, idPromocion) =>
      dispatch(eliminarPromocion(promocion, idPromocion)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'proveedorServicio' },
    { collection: 'tipoPromocion' },
  ]),
)(ListaPromocion);
