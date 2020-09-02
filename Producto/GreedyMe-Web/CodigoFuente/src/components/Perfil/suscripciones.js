import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardPlanes from "../CardPlanes";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Suscripciones(props) {
  const [promocion, setPromocion] = React.useState(0);
  const classes = useStyles();
  return (
    <div>
      <div className="prom-title-container">
        <h1>Mis suscripciones</h1>
      </div>
      <div className="contenedorTodo">
        <Card className="cardPromo">
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
                    <Box lineHeight={1.75} m={1}>
                      -
                    </Box>,
                    "-",
                  ]}
                  style1="planes-title planes-basico-1"
                  style2="planes-precio planes-basico-2"
                />
                {promocion === 0 ? (
                  "Tu promoción actual"
                ) : (
                  <Button
                    variant="contained"
                    className={classes.margin}
                    id="planes-promo-submit"
                    type="submit"
                  >
                    Actualizar promoción
                  </Button>
                )}
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
                {promocion === 1 ? (
                  "Tu promoción actual"
                ) : (
                  <Button
                    variant="contained"
                    className={classes.margin}
                    id="planes-promo-submit"
                    type="submit"
                  >
                    Actualizar promoción
                  </Button>
                )}
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
                {promocion === 2 ? (
                  "Tu promoción actual"
                ) : (
                  <Button
                    variant="contained"
                    className={classes.margin}
                    id="planes-promo-submit"
                    type="submit"
                  >
                    Actualizar promoción
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
