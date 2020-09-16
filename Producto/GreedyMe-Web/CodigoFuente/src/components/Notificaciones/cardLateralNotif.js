import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

function LateralNotificaciones() {
  return (
    <div className="lateral-notif">
      <Card className="contenedor-card-pequeña">
        <CardContent className="cont-card-pequeña">
          <div className="texto-1">
            <p>Te quedan</p>
          </div>
          <div className="cantidad-notif">
            <p>12</p>
          </div>
          <div className="texto-3">
            <p>Notificaciones disponibles para enviar este mes</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default LateralNotificaciones;
