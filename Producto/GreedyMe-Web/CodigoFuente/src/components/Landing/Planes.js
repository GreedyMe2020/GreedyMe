import React from "react";
import { CardPlanes } from "../CardInfo";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { Check } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  root: {
    color: "#fd5f00",
    width: "14px",
    height: "14px",
    marginRight: "5px;",
  },
}));

export function Planes() {
  const classes = useStyles();

  return (
    <div className="planes">
      <h1 className="tituloPlanes">Nuestros planes</h1>
      <div className="contenedorCard">
        <CardPlanes
          titulo="BASE"
          precio="Gratis"
          src1={
            <IconButton id="btn" className={classes.root}>
              <Check />
            </IconButton>
          }
          contenido1="Autogestión de tus descuentos y promociones"
          src2={
            <IconButton id="btn" className={classes.root}>
              <Check />
            </IconButton>
          }
          contenido2="Acceso a estadísticas base"
          src3={
            <IconButton id="btn" className={classes.root}>
              <Check />
            </IconButton>
          }
          contenido3="Envío limitado de notificaciones a usuarios"
          src4={
            <IconButton id="btn" className={classes.root}>
              <Check />
            </IconButton>
          }
          contenido4="Hasta 4 notificaciones por mes"
        ></CardPlanes>
        <CardPlanes
          titulo="ESTÁNDAR"
          precio="US$ 25"
          src1={
            <IconButton id="btn" className={classes.root}>
              <Check />
            </IconButton>
          }
          contenido1="Autogestión de tus descuentos y promociones"
          src2={
            <IconButton id="btn" className={classes.root}>
              <Check />
            </IconButton>
          }
          contenido2="Acceso a estadísticas avanzadas"
          src3={
            <IconButton id="btn" className={classes.root}>
              <Check />
            </IconButton>
          }
          contenido3="Envío de notificaciones a todos los usuarios"
          src4={
            <IconButton id="btn" className={classes.root}>
              <Check />
            </IconButton>
          }
          contenido4="Hasta 8 notificaciones por mes"
        ></CardPlanes>
        <CardPlanes
          titulo="PREMIUM"
          precio="US$ 35"
          src1={
            <IconButton id="btn" className={classes.root}>
              <Check />
            </IconButton>
          }
          contenido1="Acceso a una mayor variedad de estadísticas"
          src2={
            <IconButton id="btn" className={classes.root}>
              <Check />
            </IconButton>
          }
          contenido2="Programá tus notificaciones para una fecha y hora determinada"
          src3={
            <IconButton id="btn" className={classes.root}>
              <Check />
            </IconButton>
          }
          contenido3="Hasta 30 notificaciones por mes"
          src4={
            <IconButton id="btn" className={classes.root}>
              <Check />
            </IconButton>
          }
          contenido4="Exportá tus reportes estadísticos"
          src5={
            <IconButton id="btn" className={classes.root}>
              <Check />
            </IconButton>
          }
          contenido5="Publicidad de tu negocio en la app"
        ></CardPlanes>
      </div>
    </div>
  );
}
