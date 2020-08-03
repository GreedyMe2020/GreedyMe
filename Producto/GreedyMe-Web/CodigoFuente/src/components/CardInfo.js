import React from "react";
import { Card } from "react-bootstrap";

export function CardInfo({ color, src, titulo, contenido }) {
  return (
    <div className="cardInfo">
      <Card className="cardI">
        <Card.Img variant="top" className="circulo" id={color} />
        <Card.Img variant="top" className="icono" src={src} />
        <Card.Body>
          <Card.Title className="tituloCard">{titulo}</Card.Title>
          <Card.Text className="textoCard">{contenido}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export function CardPlanes({
  titulo,
  precio,
  src1,
  src2,
  src3,
  src4,
  src5,
  src6,
  contenido1,
  contenido2,
  contenido3,
  contenido4,
  contenido5,
  contenido6,
}) {
  return (
    <div className="cardPlanes">
      <Card id="cardP" className="hvr-float-shadow">
        <Card.Body>
          <Card.Title className="tituloCardP">{titulo}</Card.Title>
          <Card.Text className="precioCardP">{precio}</Card.Text>
          <div className="contTexto">
            <div id="textoenlinea">
              {src1}
              <Card.Text className="textoCardP">{contenido1}</Card.Text>
            </div>
            <div id="textoenlinea">
              {src2}
              <Card.Text className="textoCardP">{contenido2}</Card.Text>
            </div>
            <div id="textoenlinea">
              {src3}
              <Card.Text className="textoCardP">{contenido3}</Card.Text>
            </div>
            <div id="textoenlinea">
              {src4}
              <Card.Text className="textoCardP">{contenido4}</Card.Text>
            </div>
            <div id="textoenlinea">
              {src5}
              <Card.Text className="textoCardP">{contenido5}</Card.Text>
            </div>
            <div id="textoenlinea">
              {src6}
              <Card.Text className="textoCardP">{contenido6}</Card.Text>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
