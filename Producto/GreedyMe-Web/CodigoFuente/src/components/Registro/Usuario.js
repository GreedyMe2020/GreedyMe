import React from "react";
import { Link } from "@reach/router"; //ACA HABRIA QUE CARGAR Y VALIDAR TODOS LOS DATOS DE USUARIO.
export default function Usuario({ id }) {
  // se puede agregar funcionalidad en cada variable.
  return <Link to={`/main/${id}`}></Link>;
}
