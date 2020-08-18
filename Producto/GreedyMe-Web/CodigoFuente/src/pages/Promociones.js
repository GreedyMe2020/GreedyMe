import React from "react";
import { Link } from "@reach/router";
import { connect } from "react-redux";
import CargaPromociones from "../components/Promociones/cargaPromociones";
//pagina vacia

export function Promociones() {
  return (
    <div>
      <CargaPromociones />
    </div>
  );
}
