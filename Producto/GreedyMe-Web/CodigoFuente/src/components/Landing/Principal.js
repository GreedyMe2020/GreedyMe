import React from "react";
import { ButtonEj } from "../Button";
import { CardInfo } from "../CardInfo";
import { Registro } from "../../pages/Registro";
import { useHistory } from "react-router-dom";
import { Link } from "@reach/router";

/*var divRef = document.getElementById("contenedorCard");*/

export function Principal() {
  /*const handleClick = () =>
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });*/

  const history = useHistory(); // ESTA FUNCION NOS SIRVE PARA ENRUTAR.

  const routeChange = () => {
    // ESTA FUNCION NOS SIRVE PARA ENRUTAR.
    let path = `/login`; // ESTA FUNCION NOS SIRVE PARA ENRUTAR.
    history.push(path); // ESTA FUNCION NOS SIRVE PARA ENRUTAR.
  };

  const divRef = React.useRef(null);

  const onButtonClick = () => {
    divRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div>
      <main>
        <div className="principal">
          <div className="inicio">
            <Link to="/login">
              <ButtonEj
                text="Iniciar Sesión"
                style="btnIniciarSesion"
                onClick={null}
              />
            </Link>
          </div>
          <div id="Titulo_principal">
            <div id="titulo">
              <h3 className="gre">gre</h3>
              <h3 className="edy">edy</h3>
              <h3 className="me">me</h3>
            </div>
            <div id="subtitulo">
              <span>
                Gestioná todos los descuentos y promociones de tu comercio de
                una forma muy fácil y en un solo lugar
              </span>
            </div>
            <div id="contenedor_boton_conocermas">
              <ButtonEj
                text="Conocer más"
                style="botonConocerMas"
                onClick={onButtonClick}
              />
            </div>
          </div>
        </div>
        <section>
          <div className="caractSistema" ref={divRef}>
            <div className="contenedorCard" id="contenedorCard">
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
                contenido="Obtené estadísticas sobre el comportamiento de tus clientes que

          ayudarán a tomar decisiones estratégicas sobre los descuentos."
              ></CardInfo>
              <CardInfo
                color="naranja"
                src={require("../../../Multimedia/Landing/Iconos/star (1).png")}
                titulo="GREEDY POINTS"
                contenido="Los clientes sumarán puntos por cada cupón de descuento que
          utilicen en tu comercio y podrán cangearlo por recompensas."
              ></CardInfo>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
