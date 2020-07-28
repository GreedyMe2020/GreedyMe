import React from "react";
import { Card } from "react-bootstrap";
import { Check } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

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

const useStyles = makeStyles(() => ({
  root: {
    float: "left",
    color: "#fd5f00",
    width: "14px",
    height: "14px",
  },
}));

export function CardPlanes({
  titulo,
  precio,
  src2,
  src3,
  src4,
  src5,
  contenido1,
  contenido2,
  contenido3,
  contenido4,
  contenido5,
}) {
  const classes = useStyles();
  return (
    <div className="cardPlanes">
      <Card id="cardP" className="hvr-float-shadow">
        <Card.Body>
          <Card.Title className="tituloCardP">{titulo}</Card.Title>
          <Card.Text className="precioCardP">{precio}</Card.Text>
          <div className="contTexto">
            <div id="textoenlinea">
              <IconButton id="btn" className={classes.root}>
                <Check />
              </IconButton>
              <Card.Text className="textoCardP">{contenido1}</Card.Text>
            </div>
            <div id="textoenlinea">
              <Card.Img className="iconoPlan" src={src2} />
              <Card.Text className="textoCardP">{contenido2}</Card.Text>
            </div>
            <div id="textoenlinea">
              <Card.Img className="iconoPlan" src={src3} />
              <Card.Text className="textoCardP">{contenido3}</Card.Text>
            </div>
            <div id="textoenlinea">
              <Card.Img className="iconoPlan" src={src4} />
              <Card.Text className="textoCardP">{contenido4}</Card.Text>
            </div>
            <div id="textoenlinea">
              <Card.Img className="iconoPlan" src={src5} />
              <Card.Text className="textoCardP">{contenido5}</Card.Text>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
