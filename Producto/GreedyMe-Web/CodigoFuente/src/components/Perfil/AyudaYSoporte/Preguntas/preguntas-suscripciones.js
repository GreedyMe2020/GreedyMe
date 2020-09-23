import * as React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionPreguntas from "./accordion-preguntas";

export default function PreguntasSuscripcion() {
  return (
    <div>
      <Accordion>
        <AccordionPreguntas
          pregunta="Quiero saber a qué plan estoy suscripto"
          respuesta=""
        />
        <AccordionPreguntas
          pregunta="Quiero informarme de las funcionalidades de los otros planes"
          respuesta=""
        />
        <AccordionPreguntas
          pregunta="Quiero cambiar mi suscripción"
          respuesta=""
        />
        <AccordionPreguntas
          pregunta="Quiero dar de baja a mi suscripción"
          respuesta=" 
          "
        />
      </Accordion>
    </div>
  );
}
