import * as React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionPreguntas from "./accordion-preguntas";

export default function PreguntasGreedyShop() {
  return (
    <div>
      <Accordion>
        <AccordionPreguntas
          pregunta="Quiero agregar una recompensa a la tienda GreedyShop"
          respuesta=""
        />
        <AccordionPreguntas
          pregunta="Quiero eliminar una recompensa de la tienda GreedyShop"
          respuesta=""
        />
      </Accordion>
    </div>
  );
}
