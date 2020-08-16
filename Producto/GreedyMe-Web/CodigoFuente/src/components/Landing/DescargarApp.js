import React from "react";
import { Image } from "react-bootstrap";

export function DescargarApp() {
  return (
    <div className="descargaApp">
      <p className="textoApp">
        Próximamente podrás descargarte la app en tu celular y empezar a
        gestionar todos tus descuentos
      </p>
      <div className="contenedorCel">
        <Image
          className="imgCelular"
          src={require("../../../Multimedia/Landing/Imagenes/celular.png")}
        />
      </div>
      <div className="contenedorDescarga">
        <Image
          className="icoApp"
          src={require("../../../Multimedia/Landing/Imagenes/googleplay1.png")}
        />
        <Image
          className="icoApp"
          src={require("../../../Multimedia/Landing/Imagenes/appstore1.png")}
        />
      </div>
    </div>
  );
}
