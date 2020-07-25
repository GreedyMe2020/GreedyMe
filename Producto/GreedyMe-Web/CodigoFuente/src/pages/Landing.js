import React from "react";
import { CardInfo, CardPlanes } from "../components/CardInfo";
import FormDialog from "../components/Modal";
import { Image } from "react-bootstrap";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText("#F7941E"),
    backgroundColor: "#F7941E",
    width: "170px",
    height: "50px",
    borderRadius: "50px",
    "&:hover": {
      backgroundColor: "#FD5F00",
      color: "#FFFFFF",
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export function Landing() {
  const classes = useStyles();
  return (
    <div>
      {/* -------------------------------PRINCIPAL------------------------------------------------------ */}
      <div className="principal">
        <Image
          className="imagenPrincipal"
          src={require("../../Multimedia/Landing/Imagenes/1.jpg")}
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
            <ColorButton
              variant="contained"
              color="primary"
              className={classes.margin}
            >
              Conocer más
            </ColorButton>
          </div>
        </div>
      </div>
      {/* -------------------------------CARACT SISTEMA------------------------------------------------------ */}
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
      {/* -------------------------------PLANES------------------------------------------------------ */}
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
      {/* -------------------------------FORMULARIO------------------------------------------------------ */}
      <div className="formulario">
        <p className="introForm">
          ¿Queres que tu comercio
          <br />
          cuente con nuestro sistema
          <br />
          de gestion de descuentos
          <br />y promociones?
        </p>
        <FormDialog />
      </div>
      {/* -------------------------------DESCARGATE LA APP------------------------------------------------------ */}
      <div className="descargaApp">
        <div className="contenedorDescarga">
          <p className="textoApp">
            Proximamente podras descargarte la app en tu celular
            <br /> y empezar a gestionar todos tus descuentos
          </p>
          <Image
            className="icoApp"
            src={require("../../Multimedia/Landing/Imagenes/googleplay1.png")}
          />
          <Image
            className="icoApp"
            src={require("../../Multimedia/Landing/Imagenes/appstore1.png")}
          />
        </div>
        <div className="contenedorCel">
          <Image
            className="imgCelular"
            src={require("../../Multimedia/Landing/Imagenes/celular.png")}
          />
        </div>
      </div>
      {/* -------------------------------FOOTER------------------------------------------------------ */}

      <div className="footer">
        <div className="textoFooter">
          <p>Terminos y condiciones</p>
          <p>Politica de privacidad</p>
        </div>
        <div className="logoFooter">
          <span style={{ color: "rgb(255, 255, 255)" }}>g r e</span>
          <span style={{ color: "#76B39D" }}> e d y</span>
          <span style={{ color: "rgba(247,148,30,1)" }}> m e</span>
        </div>
      </div>
    </div>
  );
}
