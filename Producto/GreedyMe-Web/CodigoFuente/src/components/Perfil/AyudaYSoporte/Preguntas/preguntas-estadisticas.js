import * as React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionPreguntas from "./accordion-preguntas";

export default function PreguntasEstadisticas() {
  return (
    <div>
      <Accordion>
        <AccordionPreguntas
          pregunta="Quiero crear una estadística nueva"
          respuesta=""
        />
        <AccordionPreguntas
          pregunta="Quiero acceder a más estadísticas de las que poseo"
          respuesta=""
        />
        <AccordionPreguntas
          pregunta="Quiero descargar una estadística en mi computadora"
          respuesta=""
        />
        <AccordionPreguntas
          pregunta="Quiero obtener la estadística de un periodo de tiempo determinado"
          respuesta=" 
          "
        />
        <AccordionPreguntas
          pregunta="Como se obtienen los datos para la experiencia del cliente en mi comercio"
          respuesta=""
        />
      </Accordion>
    </div>
  );
}
