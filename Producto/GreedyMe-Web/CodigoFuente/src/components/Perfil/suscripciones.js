import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardPlanes from "../CardPlanes";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core";
import { editarSuscripcion } from "../../redux/actions/comActions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
}));

function Suscripciones(props) {
  const [submitted, setSubmitted] = React.useState(false);

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
  });
  const [plan, setPlan] = React.useState(formData.tipoSuscripcion);
  const classes = useStyles();

  function handlePlan(number) {
    setPlan(number);
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
                GreedyMe te brinda una comparación entre los diferentes planes
                ofrecidos para que elijas el que mas se ajuste a tus
                necesidades.
              </p>
            </div>
            <div className="susc-body-container">
              <div className="susc-plan-uno">
                <CardPlanes
                  title="PLAN BÁSICO"
                  precio="GRATIS"
                  text={[
                    "Estadísticas base",
                    "4 notificaciones por mes",
                    "Notificaciones a cientes favoritos",
                    <Box lineHeight={1.75} m={1}>
                      -
                    </Box>,
                    ,
                    <Box lineHeight={1.75} m={1}>
                      -
                    </Box>,
                    "-",
                    <Box lineHeight={1.7} m={1}>
                      -
                    </Box>,
                    "-",
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
                      onClick={() => {
                        handlePlan(0);
                      }}
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
                    "Estadísticas avanzadas",
                    "8 notificaciones por mes",
                    "Notificaciones a todos los usuarios",
                    <Box lineHeight={1.75} m={1}>
                      -
                    </Box>,
                    "Figurar en búsquedas por geolocalización",
                    "-",
                    "Publicidad dentro de la aplicación mobile\n ",
                    "-",
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
                    <Button
                      variant="contained"
                      className={classes.margin}
                      id="planes-promo-submit"
                      onClick={() => {
                        handlePlan(1);
                      }}
                    >
                      Actualizar plan
                    </Button>
                  )}
                </div>
              </div>
              <div className="susc-plan-tres">
                <CardPlanes
                  title="PLAN PREMIUM"
                  precio="US$ 35"
                  text={[
                    "Estadísticas avanzadas",
                    "30 notificaciones por mes",
                    "Notificaciones a todos los usuarios",
                    "Notificaciones a usuarios cerca del negocio",
                    "Figurar en búsquedas por geolocalización",
                    "Exportación de reportes estadísticos",
                    <Box lineHeight={1.75} m={1}>
                      Publicidad dentro de la aplicación
                    </Box>,
                    "Recompensas propias en GreedyStore",
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
                    <Button
                      variant="contained"
                      className={classes.margin}
                      id="planes-promo-submit"
                      onClick={() => {
                        handlePlan(2);
                      }}
                    >
                      Actualizar plan
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Suscripciones);
