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
  contenido1,
  contenido2,
  contenido3,
  contenido4,
}) {
  return (
    <div className="cardPlanes">
      <Card id="cardP" className="hvr-float-shadow">
        <Card.Body>
          <Card.Title className="tituloCardP">{titulo}</Card.Title>
          <Card.Text className="precioCardP">{precio}</Card.Text>
          <div className="contTexto">
            <div>
              <Card.Img id="textoenlinea" className="iconoPlan" src={src1} />
              <Card.Text id="textoenlinea" className="textoCardP">
                {contenido1}
              </Card.Text>
            </div>
            <div>
              <Card.Img id="textoenlinea" className="iconoPlan" src={src2} />
              <Card.Text id="textoenlinea" className="textoCardP">
                {contenido2}
              </Card.Text>
            </div>
            <div>
              <Card.Img id="textoenlinea" className="iconoPlan" src={src3} />
              <Card.Text id="textoenlinea" className="textoCardP">
                {contenido3}
              </Card.Text>
            </div>
            <div>
              <Card.Img id="textoenlinea" className="iconoPlan" src={src4} />
              <Card.Text id="textoenlinea" className="textoCardP">
                {contenido4}
              </Card.Text>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
