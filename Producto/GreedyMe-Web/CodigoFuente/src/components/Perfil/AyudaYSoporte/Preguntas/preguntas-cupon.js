import * as React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionPreguntas from "./accordion-preguntas";

export default function PreguntasCupon() {
  return (
    <div>
      <Accordion>
        <AccordionPreguntas
          pregunta="Como otorgar el código del beneficio aplicado a mi cliente"
          respuesta=""
        />
        <AccordionPreguntas
          pregunta="Otorgué un código de validación erróneo"
          respuesta=""
        />
        <AccordionPreguntas
          pregunta="Un cliente utilizó más de un beneficio en mi comercio"
          respuesta=""
        />
        <AccordionPreguntas
          pregunta="Para que le sirven a mi comercio los códigos de validación"
          respuesta=" 
          "
        />
      </Accordion>
    </div>
  );
}
