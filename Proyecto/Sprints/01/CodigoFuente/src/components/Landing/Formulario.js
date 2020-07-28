import React from "react";
import FormDialog from "../Modal";

export function Formulario() {
  return (
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
  );
}
