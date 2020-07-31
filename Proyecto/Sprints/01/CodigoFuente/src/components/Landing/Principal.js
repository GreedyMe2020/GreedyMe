import React from "react";
import { Image } from "react-bootstrap";
import { ButtonEj } from "../Button";
import { CardInfo } from "../CardInfo";

/* var divRef = document.getElementById("contenedorCard"); */

export function Principal() {
  /* const handleClick = () =>
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    }); */

  const divRef = React.useRef(null);
  const onButtonClick = () => {
    divRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div>
      <div className="principal">
        <Image
          className="imagenPrincipal"
          src={require("../../../Multimedia/Landing/Imagenes/1.jpg")}
          fluid
        />
        <svg className="fondo_degrade_blanco">
          <linearGradient
            id="fondo_degrade_blanco"
            spreadMethod="pad"
            x1="0.5"
            x2="0.5"
            y1="0"
            y2="1"
          >
            <stop offset="0" stopColor="#fff" stopOpacity="0.18"></stop>
            <stop offset="0.8326" stopColor="#fff" stopOpacity="0.761"></stop>
            <stop offset="1" stopColor="#fff" stopOpacity="1"></stop>
            <stop offset="1" stopColor="#808080" stopOpacity="1"></stop>
          </linearGradient>
          <rect
            id="fondo_degrade_blanco"
            rx="0"
            ry="0"
            x="0"
            y="0"
            width="1920"
            height="600"
          ></rect>
        </svg>
        <svg className="fondo_degrade_azul">
          <linearGradient
            id="fondo_degrade_azul"
            spreadMethod="pad"
            x1="0.5"
            x2="0.5"
            y1="0"
            y2="0.936"
          >
            <stop offset="0" stopColor="#05004e" stopOpacity="0.702"></stop>
            <stop
              offset="0.5647"
              stopColor="#3d3976"
              stopOpacity="0.706"
            ></stop>
            <stop offset="0.8744" stopColor="#d2d1df" stopOpacity="0.71"></stop>
            <stop offset="1" stopColor="#fff" stopOpacity="0.451"></stop>
          </linearGradient>
          <rect
            id="fondo_degrade_azul"
            x="0"
            y="0"
            width="1980"
            height="600"
          ></rect>
        </svg>
        <div id="Titulo_principal">
          <div id="titulo">
            <span style={{ color: "rgb(255, 255, 255)" }}>g r e</span>
            <span style={{ color: "rgba(120,227,188,1)" }}> e d y</span>
            <span style={{ color: "rgba(247,148,30,1)" }}> m e</span>
          </div>
          <div id="subtitulo">
            <span>
              Gestioná todos los descuentos y promociones
              <br />
              de tu comercio de una forma muy fácil y en un solo lugar
            </span>
          </div>
          <div id="contenedor_boton_conocermas">
            <ButtonEj
              text="Conocer mas"
              style="botonConocerMas"
              onClick={onButtonClick}
            />
          </div>
        </div>
        <ButtonEj text="Iniciar Sesion" style="btnIniciarSesion" onClick="" />
      </div>
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
    </div>
  );
}
