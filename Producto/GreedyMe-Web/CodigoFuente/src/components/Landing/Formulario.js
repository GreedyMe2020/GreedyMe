import React from "react";
import FormDialog from "../Modal";

export function Formulario() {
  return (
    <div className="formulario">
      <p className="introForm">
        ¿Querés que tu comercio
        <br />
        cuente con nuestro sistema
        <br />
        de gestión de descuentos
        <br />y promociones?
      </p>
      <FormDialog />
    </div>
  );
}
