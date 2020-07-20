import React from "react";
import { CardInfo, CardPlanes } from "../components/CardInfo";
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
      <hr></hr>
      <div>
        <h1>Hay que ver el css y html de Lau para las cards con info</h1>
        <CardInfo></CardInfo>
      </div>
      <hr></hr>
      <div>
        <h1>Nuestros planes</h1>
        <CardPlanes></CardPlanes>
      </div>
      <hr></hr>
      <div>
        <h1>
          Queres que tu comercio cuente con nuestro sistema de gestion de
          descuentos y promociones?
        </h1>
        <Button href="#">Registralo aca</Button>
      </div>
      <hr></hr>
    </div>
  );
}
