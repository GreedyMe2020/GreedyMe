import React from "react";
import { Principal } from "../components/Landing/Principal";
/* import { Caracteristicas } from "../components/Landing/Caracteristicas";
 */ import { Planes } from "../components/Landing/Planes";
import { Formulario } from "../components/Landing/Formulario";
import { DescargarApp } from "../components/Landing/DescargarApp";
import { Footer } from "../components/Landing/Footer";

export function Landing() {
  return (
    <div>
      <Principal />
      <Planes />
      <Formulario />
      <DescargarApp />
      <Footer />
    </div>
  );
}
