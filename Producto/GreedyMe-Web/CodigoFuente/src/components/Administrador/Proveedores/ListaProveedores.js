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
import { Grid, Avatar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import FormTipoProveedores from './FormTipoProveedores';
import FormProveedores from './FormProveedores';
import ModalAdministradorPr from '../modal-admin-pr';
import { eliminarTipoProveedor } from '../../../redux/actions/adminActions';
import { eliminarProveedor } from '../../../redux/actions/adminActions';
import { eliminarProveedorBanco } from '../../../redux/actions/adminActions';
import Snackbar from '@material-ui/core/Snackbar';
import Chip from '@material-ui/core/Chip';
import { set } from 'date-fns';
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

function ListaProveedores(props) {
  const classes = useStyles();
  //Estado del dialog (abierto/cerrado)
  const [open, setOpen] = React.useState(false);
  //Estado del dialog (abierto/cerrado)
  const [open2, setOpen2] = React.useState(false);
  //para eliminar
  const [eliminar, setEliminar] = React.useState(null);
  const [currentId, setCurrentId] = React.useState(null);

  //Snackbar cuando se elimina
  const [eliminada, setEliminada] = React.useState(false);
  //estados para buscadores
  const [listaProveedores, setListaProveedores] = React.useState(
    props.proveedores,
  );
  const [text, setText] = React.useState('');
  const [texto, setTexto] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleMouseDownPromo = (event) => {
    event.preventDefault();
  };

  const filter = (text) => {
    if (props.proveedores) {
      let textoBuscar = text.target.value;
      const datos = props.proveedores;
      const newDatos = datos.filter(function (item) {
        const tipo = item.tipo ? item.tipo.toUpperCase() : 'BANCOS';
        const campo = tipo;
        const textData = textoBuscar.toUpperCase();
        return campo.indexOf(textData) > -1;
      });
      setListaProveedores(newDatos);
      setText(text);
      if (text.target.value != '') {
        setTexto(true);
      } else {
        setTexto(false);
      }
    }
  };

  React.useEffect(() => {
    if (currentId) {
      props.eliminarTipoProveedor({
        id: currentId,
      });
    }
  }, [currentId]);

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setEliminada(false);
  };

  const handleClose2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen2(false);
  };

  const handleDelete = (proveedor, idProveedor) => {
    props.eliminarProveedor(proveedor, idProveedor);
    setOpen2(true);
  };

  const handleDeleteBanco = (banco) => {
    props.eliminarProveedorBanco(banco);
    setOpen2(true);
  };

  const form = React.createRef();
  return (
    <div>
      <ModalAdministradorPr
        title="Proveedores de beneficios"
        button="Cargar proveedor"
        button2="Cargar tipo proveedor"
        titleModal="Cargar nuevo proveedor"
        titleModal2="Cargar nuevo tipo de proveedor"
        openContent={<FormProveedores />}
        openContent2={<FormTipoProveedores />}
        placeholder="Buscar proveedor…"
        onChange={(text) => filter(text)}
      />
      <div className="contenedorTodo">
        <Card className="cardPromo">
          <CardContent className="cardContentePromo">
            <Grid item xs={12} md={12}>
              <div className={classes.demo}>
                <List>
                  {props.proveedores && texto === false
                    ? props.proveedores.map((item) => {
                      return (
                        <ListItem key={item.id}>
                          <ListItemAvatar key={item.id}>
                            <Avatar
                              variant="square"
                              src={require('../../../../Multimedia/Sistema-svg/id-card.svg')}
                            ></Avatar>
                          </ListItemAvatar>

                          <div className="elementoListaProm">
                            <ListItemText key={item.id}
                              primary={
                                <React.Fragment>
                                  <Typography
                                    className={classes.inline}
                                  >
                                    {item.tipo
                                      ? item.tipo
                                      : 'Bancos'}
                                  </Typography>
                                  {item.lista
                                    ? item.lista.map((ite) => {
                                      return (
                                        <Chip
                                          label={ite.nombre}
                                          variant="outlined"
                                          key={ite.photoURL}
                                          size="small"
                                          style={{
                                            margin:
                                              '0px 4px 4px 0px',
                                          }}
                                          onDelete={() => handleDelete(ite.nombre, item.id)}
                                        />
                                      );
                                    })
                                    : item.bancos.map((ite) => {
                                      return (
                                        <Chip
                                          key={ite.id}
                                          label={ite.nombre}
                                          variant="outlined"
                                          size="small"
                                          style={{
                                            margin:
                                              '0px 4px 4px 0px',
                                          }}
                                          onDelete={() => handleDeleteBanco(ite.nombre)}
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
                                '¿Estás seguro de eliminar la promoción?'
                              }
                              text={
                                'Una vez que aceptes eliminar la promoción, la misma no podrá ser recuperada.'
                              }
                              btnText={'Eliminar'}
                            />
                          </ListItemSecondaryAction>
                        </ListItem>
                      );
                    })
                    : listaProveedores
                      ? listaProveedores.map((item) => {
                        return (
                          <ListItem key={item.id}>
                            <ListItemAvatar key={item.id}>
                              <Avatar
                                variant="square"
                                src={require('../../../../Multimedia/Sistema-svg/id-card.svg')}
                              ></Avatar>
                            </ListItemAvatar>

                            <div className="elementoListaProm">
                              <ListItemText key={item.id}
                                primary={
                                  <React.Fragment>
                                    <Typography
                                      className={classes.inline}
                                    >
                                      {item.tipo
                                        ? item.tipo
                                        : 'Bancos'}
                                    </Typography>
                                    {item.lista
                                      ? item.lista.map((ite) => {
                                        return (
                                          <Chip
                                            label={ite.nombre}
                                            variant="outlined"
                                            key={ite.photoURL}
                                            size="small"
                                            style={{
                                              margin:
                                                '0px 4px 4px 0px',
                                            }}
                                            onDelete={() => handleDelete(ite.nombre, item.id)}
                                          />
                                        );
                                      })
                                      : item.bancos.map((ite) => {
                                        return (
                                          <Chip
                                            key={ite.id}
                                            label={ite.nombre}
                                            variant="outlined"
                                            size="small"
                                            style={{
                                              margin:
                                                '0px 4px 4px 0px',
                                            }}
                                            onDelete={() => handleDeleteBanco(ite.nombre)}
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
                                  '¿Estás seguro de eliminar la promoción?'
                                }
                                text={
                                  'Una vez que aceptes eliminar la promoción, la misma no podrá ser recuperada.'
                                }
                                btnText={'Eliminar'}
                              />
                            </ListItemSecondaryAction>
                          </ListItem>
                        );
                      })
                      : listaProveedores
                        ? listaProveedores.map((item) => {
                          return (
                            <ListItem key={item.id}>
                              <ListItemAvatar>
                                <Avatar
                                  variant="square"
                                  src={require('../../../../Multimedia/Sistema-svg/price-tag (5).svg')}
                                ></Avatar>
                              </ListItemAvatar>

                              <div className="elementoListaProm">
                                <ListItemText
                                  primary={
                                    <React.Fragment>
                                      <Typography
                                        className={classes.inline}
                                      >
                                        {item.tipo}
                                      </Typography>
                                      {item.lista
                                        ? item.lista.map((ite) => {
                                          return (
                                            <Chip
                                              label={ite.nombre}
                                              variant="outlined"
                                              size="small"
                                              style={{
                                                margin:
                                                  '0px 4px 4px 0px',
                                              }}
                                              onDelete={handleDelete}
                                            />
                                          );
                                        })
                                        : item.bancos.map((ite) => {
                                          return (
                                            <Chip
                                              label={ite.nombre}
                                              variant="outlined"
                                              size="small"
                                              style={{
                                                margin:
                                                  '0px 4px 4px 0px',
                                              }}
                                              onDelete={handleDelete}
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
                        : null}
                </List>
                {eliminada ? (
                  <Snackbar
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    open={eliminada}
                    autoHideDuration={8000}
                    onClose={handleCloseSnack}
                  >
                    <Alert
                      onClose={handleCloseSnack}
                      severity="error"
                    >
                      El tipo de proveedor se ha eliminado
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
                El proveedor se ha eliminado.
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
    eliminarTipoProveedor: (formData) =>
      dispatch(eliminarTipoProveedor(formData)),
    eliminarProveedor: (proveedor, idProveedor) =>
      dispatch(eliminarProveedor(proveedor, idProveedor)),
    eliminarProveedorBanco: (banco) =>
      dispatch(eliminarProveedorBanco(banco)),

  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'proveedorServicio' },
    { collection: 'tipoPromocion' },
  ]),
)(ListaProveedores);
