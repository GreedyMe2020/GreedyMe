import React from "react";
import ProgramarNotificaciones from "./programarNotif";
import LateralNotificaciones from "./cardLateralNotif";
import HacermePremium from "./haztePremium";

function Notificaciones() {
  return (
    <div>
      <div className="prom-title-container">
        <h1>Notificaciones</h1>
      </div>
      <div className="subtitulo-notif">
        <h6>Gestioná las notificaciones push que enviás a los usuarios</h6>
      </div>
      <div className="contenedor-notificaciones-todo">
        <div className="card-programar">
          <ProgramarNotificaciones />
        </div>
        <div className="card-lateral">
          <LateralNotificaciones />
        </div>
        <div className="card-lateral-premium">
          <HacermePremium />
        </div>
      </div>
    </div>
  );
}

export default Notificaciones;
