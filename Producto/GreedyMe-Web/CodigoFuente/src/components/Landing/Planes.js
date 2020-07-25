import React from "react";
import { CardPlanes } from "../CardInfo";

export function Planes() {
  return (
    <div className="planes">
      <h1 className="tituloPlanes">Nuestros planes</h1>
      <div className="contenedorCard">
        <CardPlanes
          titulo="PRUEBA"
          precio="Gratis 30 días"
          src1={require("../../../Multimedia/Landing/Iconos/check.png")}
          contenido1="bskfj"
          src2={require("../../../Multimedia/Landing/Iconos/check.png")}
          contenido2="kjsdfkjb"
          src3={""}
          src4={""}
        ></CardPlanes>
        <CardPlanes
          titulo="BASE"
          precio="$25"
          src1={require("../../../Multimedia/Landing/Iconos/check.png")}
          contenido1="bskfj"
          src2={require("../../../Multimedia/Landing/Iconos/check.png")}
          contenido2="kjsdfkjb"
          src3={require("../../../Multimedia/Landing/Iconos/close (1).png")}
          contenido3="kjdbf"
          src4={""}
        ></CardPlanes>
        <CardPlanes
          titulo="PREMIUM"
          precio="$35"
          src1={require("../../../Multimedia/Landing/Iconos/check.png")}
          contenido1="bsksdffj"
          src2={require("../../../Multimedia/Landing/Iconos/check.png")}
          contenido2="kjsdfsdfkjb"
          src3={require("../../../Multimedia/Landing/Iconos/close (1).png")}
          contenido3="kdsfjdbf"
          src4={require("../../../Multimedia/Landing/Iconos/close (1).png")}
          contenido4="kdfgfbf"
        ></CardPlanes>
      </div>
    </div>
  );
}
