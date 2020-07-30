import React from "react";
import { Image } from "react-bootstrap";

export function DescargarApp() {
  return (
    <div className="descargaApp">
      <div className="contenedorDescarga">
        <p className="textoApp">
          Proximamente podras descargarte la app en tu celular
          <br /> y empezar a gestionar todos tus descuentos
        </p>
        <Image
          className="icoApp"
          src={require("../../../Multimedia/Landing/Imagenes/googleplay1.png")}
        />
        <Image
          className="icoApp"
          src={require("../../../Multimedia/Landing/Imagenes/appstore1.png")}
        />
      </div>
      <div className="contenedorCel">
        <Image
          className="imgCelular"
          src={require("../../../Multimedia/Landing/Imagenes/celular.png")}
        />
      </div>
    </div>
  );
}
