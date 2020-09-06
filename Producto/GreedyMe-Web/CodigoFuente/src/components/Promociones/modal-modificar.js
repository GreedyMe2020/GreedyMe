import React, { useState } from "react";
import ModalPromocionesActualizar from "./modalPromocionesActualizar";

export default function ModalPromosActualizar(props) {
  return (
    <div>
      <ModalPromocionesActualizar
        promo={props.promo}
        actualizar={props.actualizar}
      />
    </div>
  );
}
