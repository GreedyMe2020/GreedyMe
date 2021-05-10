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
          contenido1="Acceso a estadísticas base"
          src2={
            <IconButton id="btn" className={classes.root}>
              <Check />
            </IconButton>
          }
          contenido2="Notificaciones a clientes favoritos"
          src3={
            <IconButton id="btn" className={classes.root}>
              <Check />
            </IconButton>
          }
          contenido3="4 notificaciones por mes"
          src4={""}
          src5={""}
        ></CardPlanes>
        <CardPlanes
          titulo="ESTÁNDAR"
          precio="US$ 25"
          src1={
            <IconButton id="btn" className={classes.root}>
              <Check />
            </IconButton>
          }
          contenido1="Mayor cantidad de estadísticas"
          src2={
            <IconButton id="btn" className={classes.root}>
              <Check />
            </IconButton>
          }
          contenido2="Notificaciones a todos los usuarios"
          src3={
            <IconButton id="btn" className={classes.root}>
              <Check />
            </IconButton>
          }
          contenido3="8 notificaciones por mes"
          src4={
            <IconButton id="btn" className={classes.root}>
              <Check />
            </IconButton>
          }
          contenido4="Publicidad de tu negocio"
          src5={
            <IconButton id="btn" className={classes.root}>
              <Check />
            </IconButton>
          }
          contenido5="Aparecer en búsquedas por geolocalización"
        ></CardPlanes>
        <CardPlanes
          titulo="PREMIUM"
          precio="US$ 35"
          src1={
            <IconButton id="btn" className={classes.root}>
              <Check />
            </IconButton>
          }
          contenido1="Estadísticas avanzadas"
          src2={
            <IconButton id="btn" className={classes.root}>
              <Check />
            </IconButton>
          }
          contenido2="Notificación a los usuarios cercanos a tu negocio"
          src3={
            <IconButton id="btn" className={classes.root}>
              <Check />
            </IconButton>
          }
          contenido3="30 notificaciones por mes"
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
          contenido5="Mejor posicionamiento en la app"
          // src6={
          //   <IconButton id="btn" className={classes.root}>
          //     <Check />
          //   </IconButton>
          // }
          // contenido6="Ofrecimiento de recompensas propias por GreedyPoints"
        ></CardPlanes>
      </div>
      {/*  <div>
        <span>
          *Cualquier tipo de suscripción comienza con un periodo de prueba de 30
          días del plan Premium
        </span>
      </div> */}
    </div>
  );
}
