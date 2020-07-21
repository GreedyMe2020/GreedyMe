import React from "react";
import { CardInfo, CardPlanes } from "../components/CardInfo";
import { ModalButton } from "../components/modal-button";
import { Button } from "react-bootstrap";

export function Landing() {
  return (
    <div>
      <div className="principal">
        <h1>Titulo greedyMe con fondo y demas</h1>
        <Button className="btn-round" href="#">
          Conoce mas
        </Button>
      </div>

      <div className="caractSistema">
        <div className="contenedorCard">
          <CardInfo
            color="azul"
            src={require("../../Multimedia/Landing/Iconos/price-tag.png")}
            titulo="AUTOGESTIÓN"
            contenido="Gestioná todos los descuentos y promociones con los que trabaja
          tu comercio para mejorar y agilizar la experiencia comercio-cliente."
          ></CardInfo>
          <CardInfo
            color="celeste"
            src={require("../../Multimedia/Landing/Iconos/profits.png")}
            titulo="ESTADÍSTICAS"
            contenido="Obtene estadisticas sobre el comprtamiento de tus clientes que
          ayudaran a tomar decisiones estrategicas sobre los descuentos."
          ></CardInfo>
          <CardInfo
            color="naranja"
            src={require("../../Multimedia/Landing/Iconos/star (1).png")}
            titulo="GREEDY POINTS"
            contenido="Los clientes sumaran puntos por cada cupon de descuento que
          utilicen en tu comercio y podran cangearlo por recompensas."
          ></CardInfo>
        </div>
      </div>

      <div className="planes">
        <h1 className="tituloPlanes">Nuestros planes</h1>
        <div className="contenedorCard">
          <CardPlanes
            titulo="PRUEBA"
            precio="Gratis 30 días"
            src1={require("../../Multimedia/Landing/Iconos/check.png")}
            contenido1="bskfj"
            src2={require("../../Multimedia/Landing/Iconos/check.png")}
            contenido2="kjsdfkjb"
            src3={""}
            src4={""}
          ></CardPlanes>
          <CardPlanes
            titulo="BASE"
            precio="$25"
            src1={require("../../Multimedia/Landing/Iconos/check.png")}
            contenido1="bskfj"
            src2={require("../../Multimedia/Landing/Iconos/check.png")}
            contenido2="kjsdfkjb"
            src3={require("../../Multimedia/Landing/Iconos/close (1).png")}
            contenido3="kjdbf"
            src4={""}
          ></CardPlanes>
          <CardPlanes
            titulo="PREMIUM"
            precio="$35"
            src1={require("../../Multimedia/Landing/Iconos/check.png")}
            contenido1="bsksdffj"
            src2={require("../../Multimedia/Landing/Iconos/check.png")}
            contenido2="kjsdfsdfkjb"
            src3={require("../../Multimedia/Landing/Iconos/close (1).png")}
            contenido3="kdsfjdbf"
            src4={require("../../Multimedia/Landing/Iconos/close (1).png")}
            contenido4="kdfgfbf"
          ></CardPlanes>
        </div>
      </div>

      <div className="formulario">
        <div className="register-group">
          <h1>
            Queres que tu comercio cuente con nuestro sistema de gestion de
            descuentos y promociones?
          </h1>
          <ModalButton>Registralo aca</ModalButton>
        </div>
      </div>
    </div>
  );
}
