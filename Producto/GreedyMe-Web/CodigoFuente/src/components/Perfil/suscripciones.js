import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardPlanes from '../CardPlanes';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import { editarSuscripcion } from '../../redux/actions/comActions';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//import Express from 'express';
import { Redirect, Link } from '@reach/router';
import PaypalCheckoutButton from './payPalCheckOutButton';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
}));

// Funcion que retorna la alerta para el Snackbar
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Suscripciones(props) {
  const [submitted, setSubmitted] = React.useState(false);
  const [checkout, setCheckout] = React.useState(false);

  // Estado para el Snackbar de pago dependiendo si es exitoso o si hubo un error
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);

  const [formData, setFormData] = React.useState({
    id: props.auth.uid,
    web: props.profile.web,
    sucursal: props.profile.sucursal,
    rubro: props.profile.rubro,
    telefono: props.profile.telefono,
    instagram: props.profile.instagram,
    facebook: props.profile.facebook,
    direccion: props.profile.direccion,
    tipoSuscripcion: props.profile.tipoSuscripcion,
    fechaVencimiento: props.profile.fechaVencimiento,
    cantidadNotificaciones: props.profile.cantidadNotificaciones,
  });

  // Estado para el manejo del tipo de suscripcion actual del cliente
  const [plan, setPlan] = React.useState(
    props.profile.tipoSuscripcion,
  );

  // Estado del modal de confirmación
  const [openDialog, setOpenDialog] = React.useState(false);

  // Hook para setear el tipo de suscripcion actual del
  // cliente y renderizar la pagina en base al mismo
  useEffect(() => {
    setPlan(props.profile.tipoSuscripcion);
  }, [props.profile.tipoSuscripcion]);

  const classes = useStyles();

  function handlePlan(number) {
    formData.cantidadNotificaciones = 4;
    //ACA ESTARIA BUENO QUE SALGA UN CARTELITO DICIENDO: SEGURO QUE QUIERE ACTUALIZAR EL PLAN A ESTANDAR??? Porque sino queda muy pelado
    setPlan(number);
    formData.fechaVencimiento = new Date();
    formData.tipoSuscripcion = number;
    setFormData({ ...formData });
    handleSubmit();
  }

  const handleSubmit = () => {
    props.editarSuscripcion(formData);
    setSubmitted({ submitted: true }, () => {
      setTimeout(() => setSubmitted({ submitted: false }), 5000);
    });
  };

  // Funciones para el manejo del Snack bar de success
  const handleClickSuccess = () => {
    setOpenSuccess(true);
  };

  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
  };

  // Funciones para el manejo del Snack bar de error
  const handleClickError = () => {
    setOpenError(true);
  };

  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenError(false);
  };

  // Funciones para el manejo del modal de confirmación
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <div className="prom-title-container">
        <h1>Mis suscripciones</h1>
      </div>
      <div className="contenedorTodo">
        <Card className="cardPromo plan-container">
          <CardContent className="cardContentePromo">
            <div className="susc-title-container">
              <h3>Compará los planes</h3>
              <p>
                GreedyMe te brinda una comparación entre los
                diferentes planes ofrecidos para que elijas el que mas
                se ajuste a tus necesidades.
              </p>
            </div>
            <div className="susc-body-container">
              <div className="susc-plan-uno">
                <CardPlanes
                  title="PLAN BÁSICO"
                  precio="GRATIS"
                  text={[
                    'Estadísticas base',
                    '4 notificaciones por mes',
                    'Notificaciones a cientes favoritos',
                    <Box lineHeight={1.75} m={1}>
                      -
                    </Box>,
                    ,
                    <Box lineHeight={1.75} m={1}>
                      -
                    </Box>,
                    '-',
                    <Box lineHeight={1.7} m={1}>
                      -
                    </Box>,
                  ]}
                  style1="planes-title planes-basico-1"
                  style2="planes-precio planes-basico-2"
                />
                <div className="plan-actual">
                  {plan === 0 ? (
                    <Button
                      variant="outlined"
                      disabled
                      className={classes.margin}
                      id="planes-promo-actual"
                      type="submit"
                    >
                      TU PLAN ACTUAL
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      className={classes.margin}
                      id="planes-promo-submit"
                      onClick={() => setOpenDialog(true)}
                    >
                      Actualizar plan
                    </Button>
                  )}
                </div>
              </div>
              <div className="susc-plan-dos">
                <CardPlanes
                  title="PLAN ESTÁNDAR"
                  precio="US$ 25"
                  text={[
                    'Estadísticas avanzadas',
                    '8 notificaciones por mes',
                    'Notificaciones a todos los usuarios',
                    <Box lineHeight={1.75} m={1}>
                      -
                    </Box>,
                    'Figurar en búsquedas por geolocalización',
                    '-',
                    'Publicidad dentro de la aplicación mobile\n ',
                  ]}
                  style1="planes-title planes-estandar-1"
                  style2="planes-precio planes-estandar-2"
                />
                <div className="plan-actual">
                  {plan === 1 ? (
                    <Button
                      variant="outlined"
                      disabled
                      className={classes.margin}
                      id="planes-promo-actual"
                      type="submit"
                    >
                      TU PLAN ACTUAL
                    </Button>
                  ) : (
                    <div className="planes-paypal-btn">
                      <PaypalCheckoutButton
                        description={'Plan Estándar'}
                        value={25.0}
                        tipoPlan={1}
                        handleClickError={handleClickError}
                        handleClickSuccess={handleClickSuccess}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="susc-plan-tres">
                <CardPlanes
                  title="PLAN PREMIUM"
                  precio="US$ 35"
                  text={[
                    'Estadísticas avanzadas',
                    '30 notificaciones por mes',
                    'Notificaciones a todos los usuarios',
                    'Notificaciones a usuarios cerca del negocio',
                    'Figurar en búsquedas por geolocalización',
                    'Exportación de reportes estadísticos',
                    <Box lineHeight={1.75} m={1}>
                      Publicidad dentro de la aplicación
                    </Box>,
                  ]}
                  style1="planes-title planes-premuim-1"
                  style2="planes-precio planes-premuim-2"
                />
                <div className="plan-actual">
                  {plan === 2 ? (
                    <Button
                      variant="outlined"
                      disabled
                      className={classes.margin}
                      id="planes-promo-actual"
                      type="submit"
                    >
                      TU PLAN ACTUAL
                    </Button>
                  ) : (
                    <div className="planes-paypal-btn">
                      <PaypalCheckoutButton
                        description={'Plan Premium'}
                        value={35.0}
                        tipoPlan={2}
                        handleClickError={handleClickError}
                        handleClickSuccess={handleClickSuccess}
                      />
                    </div>
                  )}
                </div>
              </div>
              {/* Modal de confirmación de cambio de plan al básico */}
              <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {'¿Estás seguro de cambiar al plan '}
                  <b>Básico</b>
                  {'?'}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Una vez que aceptes cambiar al plan Básico, se te
                    cancelará la suscripción actual y perderás sus
                    beneficios.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleCloseDialog}
                    color="secondary"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={() => {
                      setOpenDialog(false);
                      handlePlan(0);
                    }}
                    color="primary"
                    autoFocus
                  >
                    Aceptar
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Snackbars para indicar si se actualizó el plan o no */}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={openSuccess}
        autoHideDuration={8000}
        onClose={handleCloseSuccess}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          ¡Plan actualizado correctamente!
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={openError}
        autoHideDuration={8000}
        onClose={handleCloseError}
      >
        <Alert onClose={handleCloseError} severity="error">
          Error en el pago de la suscripción
        </Alert>
      </Snackbar>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editarSuscripcion: (datos) => dispatch(editarSuscripcion(datos)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Suscripciones);
