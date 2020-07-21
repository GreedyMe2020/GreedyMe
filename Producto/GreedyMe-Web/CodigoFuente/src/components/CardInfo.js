import React from "react";
import { Card, CardDeck } from "react-bootstrap";

export function CardInfo({ color, src, titulo, contenido }) {
  return (
    <div className="cardInfo">
      <Card className="card">
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

export function CardPlanes() {
  return (
    <div>
      <CardDeck>
        <Card className="cardPlanes">
          <Card.Body>
            <Card.Title className="cardTitle">Prueba</Card.Title>
            <Card.Text className="cardText" style={{ fontSize: "20px" }}>
              Gratis
            </Card.Text>
            <Card.Text className="cardText">Acceso por 30 dias</Card.Text>
          </Card.Body>
        </Card>
        <Card className="cardPlanes">
          <Card.Body>
            <Card.Title className="cardTitle">Base</Card.Title>
            <Card.Text className="cardText" style={{ fontSize: "20px" }}>
              $20
            </Card.Text>
            <Card.Text className="cardText">Blabla</Card.Text>
          </Card.Body>
        </Card>
        <Card className="cardPlanes">
          <Card.Body>
            <Card.Title className="cardTitle">Premium</Card.Title>
            <Card.Text className="cardText" style={{ fontSize: "20px" }}>
              $35
            </Card.Text>
            <Card.Text className="cardText">Blabla</Card.Text>
          </Card.Body>
        </Card>
      </CardDeck>
    </div>
  );
}
