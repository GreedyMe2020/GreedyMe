import React from "react";
import { Card, CardDeck } from "react-bootstrap";

export function CardInfo() {
  return (
    <div>
      <CardDeck>
        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>AUTOGESTON</Card.Title>
            <Card.Text>
              Gestiona todos los descuentos y promociones con los que trabaja tu
              comercio para mejorar y agilizar la experiecia comercio-cliente.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>ESTADISTICAS</Card.Title>
            <Card.Text>
              Obtene estadisticas sobre el comprtamiento de tus clientes que
              ayudaran a tomar decisiones estrategicas sobre los descuentos.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>GREEDY POINTS</Card.Title>
            <Card.Text>
              Los clientes sumaran puntos por cada cupon de descuento que
              utilicen en tu comercio y podran cangearlo por recompensas.
            </Card.Text>
          </Card.Body>
        </Card>
      </CardDeck>
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
