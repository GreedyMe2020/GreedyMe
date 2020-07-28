import React from "react";
import { CardPlanes } from "../CardInfo";

export function Planes() {
  return (
    <div className="planes">
      <h1 className="tituloPlanes">Nuestros planes</h1>
      <div className="contenedorCard">
        <CardPlanes
          titulo="BASE"
          precio="Gratis"
          src1={require("../../../Multimedia/Landing/Iconos/check.png")}
          contenido1="Accede a estadísticas base"
          src2={require("../../../Multimedia/Landing/Iconos/check.png")}
          contenido2="Envía notificaciones a tus clientes favoritos"
          src3={require("../../../Multimedia/Landing/Iconos/check.png")}
          contenido3="Hasta 4 notificaciones por mes"
          src4={""}
          src5={""}
        ></CardPlanes>
        <CardPlanes
          titulo="ESTANDAR"
          precio="$25"
          src1={require("../../../Multimedia/Landing/Iconos/check.png")}
          contenido1="Un mayor número de estadísticas"
          src2={require("../../../Multimedia/Landing/Iconos/check.png")}
          contenido2="Notificaciones a todos los usuarios de la plataforma "
          src3={require("../../../Multimedia/Landing/Iconos/check.png")}
          contenido3="8 notificaciones por mes"
          src4={require("../../../Multimedia/Landing/Iconos/check.png")}
          contenido4="publicita tu negocio dentro de la aplicación"
          src5={require("../../../Multimedia/Landing/Iconos/check.png")}
          contenido5="aparece en búsquedas por geolocalización"
        ></CardPlanes>
        <CardPlanes
          titulo="PREMIUM"
          precio="$35"
          src1={require("../../../Multimedia/Landing/Iconos/check.png")}
          contenido1="Estadísticas avanzadas "
          src2={require("../../../Multimedia/Landing/Iconos/check.png")}
          contenido2="Exporta los reportes estadísticos"
          src3={require("../../../Multimedia/Landing/Iconos/check.png")}
          contenido3="Notificaciones a los usuarios que estén cerca de tu negocio "
          src4={require("../../../Multimedia/Landing/Iconos/check.png")}
          contenido4="30 notificaciones por mes "
          src5={require("../../../Multimedia/Landing/Iconos/check.png")}
          contenido5="posiciónate primero en la app "
          contenido6="ofrece recompensas propias por GreedyPoints"
        ></CardPlanes>
      </div>
    </div>
  );
}
