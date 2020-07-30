import React from "react";
import { CardInfo } from "../CardInfo";

export function Caracteristicas() {
  const divRef = React.useRef(null);
  return (
    <div className="caractSistema">
      <div className="contenedorCard" id="contenedorCard" ref={divRef}>
        <CardInfo
          color="azul"
          src={require("../../../Multimedia/Landing/Iconos/price-tag.png")}
          titulo="AUTOGESTIÓN"
          contenido="Gestioná todos los descuentos y promociones con los que trabaja
          tu comercio para mejorar y agilizar la experiencia comercio-cliente."
        ></CardInfo>
        <CardInfo
          color="celeste"
          src={require("../../../Multimedia/Landing/Iconos/profits.png")}
          titulo="ESTADÍSTICAS"
          contenido="Obtene estadisticas sobre el comprtamiento de tus clientes que
          ayudaran a tomar decisiones estrategicas sobre los descuentos."
        ></CardInfo>
        <CardInfo
          color="naranja"
          src={require("../../../Multimedia/Landing/Iconos/star (1).png")}
          titulo="GREEDY POINTS"
          contenido="Los clientes sumaran puntos por cada cupon de descuento que
          utilicen en tu comercio y podran cangearlo por recompensas."
        ></CardInfo>
      </div>
    </div>
  );
}
