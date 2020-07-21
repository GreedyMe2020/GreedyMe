import React from "react";
import { CardInfo, CardPlanes } from "../components/CardInfo";
import { ModalButton } from "../components/modal-button";
import { Button } from "react-bootstrap";

export function Landing() {
  return (
    <div>
      <div>
        <h1>Titulo greedyMe con fondo y demas</h1>
        <Button className="btn-round" href="#">
          Conoce mas
        </Button>
      </div>

      <div className="contenedorCardInfo">
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
      <hr></hr>
      <div>
        <h1>Nuestros planes</h1>
        <CardPlanes></CardPlanes>
      </div>
      <hr></hr>
      <div className="register-group">
        <h1>
          Queres que tu comercio cuente con nuestro sistema de gestion de
          descuentos y promociones?
        </h1>
        <ModalButton>Registralo aca</ModalButton>
      </div>
      <hr></hr>
    </div>
  );
}
