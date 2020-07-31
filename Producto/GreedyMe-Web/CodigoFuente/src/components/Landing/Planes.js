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
          contenido1="Accedé a estadísticas base"
          src2={
            <IconButton id="btn" className={classes.root}>
              <Check />
            </IconButton>
          }
          contenido2="Envia notificaciones a tus clientes favoritos"
          src3={
            <IconButton id="btn" className={classes.root}>
              <Check />
            </IconButton>
          }
          contenido3="Hasta 4 notificaciones por mes"
          src4={""}
          src5={""}
        ></CardPlanes>
        <CardPlanes
          titulo="ESTANDAR"
          precio="$25"
          src1={
            <IconButton id="btn" className={classes.root}>
              <Check />
            </IconButton>
          }
          contenido1="Un mayor número de estadísticas"
          src2={
            <IconButton id="btn" className={classes.root}>
              <Check />
            </IconButton>
          }
          contenido2="Notificaciones a todos los usuarios de la plataforma "
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
          contenido4="Publicitá tu negocio dentro de la aplicación"
          src5={
            <IconButton id="btn" className={classes.root}>
              <Check />
            </IconButton>
          }
          contenido5="Aparecé en búsquedas por geolocalización"
        ></CardPlanes>
        <CardPlanes
          titulo="PREMIUM"
          precio="$35"
          src1={
            <IconButton id="btn" className={classes.root}>
              <Check />
            </IconButton>
          }
          contenido1="Estadísticas avanzadas "
          src2={
            <IconButton id="btn" className={classes.root}>
              <Check />
            </IconButton>
          }
          contenido2="Exportá los reportes estadísticos"
          src3={
            <IconButton id="btn" className={classes.root}>
              <Check />
            </IconButton>
          }
          contenido3="Notificá a los usuarios que estén cerca de tu negocio "
          src4={
            <IconButton id="btn" className={classes.root}>
              <Check />
            </IconButton>
          }
          contenido4="30 notificaciones por mes "
          src5={
            <IconButton id="btn" className={classes.root}>
              <Check />
            </IconButton>
          }
          contenido5="Posicionate primero en la app "
          src6={
            <IconButton id="btn" className={classes.root}>
              <Check />
            </IconButton>
          }
          contenido6="Ofrece recompensas propias por GreedyPoints"
        ></CardPlanes>
      </div>
    </div>
  );
}
