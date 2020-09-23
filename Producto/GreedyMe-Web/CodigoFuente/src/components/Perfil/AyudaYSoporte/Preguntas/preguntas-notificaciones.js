import * as React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionPreguntas from "./accordion-preguntas";

export default function PreguntasNotificaciones() {
  return (
    <div>
      <Accordion>
        <AccordionPreguntas
          pregunta=" Quiero notificar a los clientes sobre un beneficio de mi tienda"
          respuesta=""
        />
        <AccordionPreguntas
          pregunta="Quiero acceder a un mayor público con mis notificaciones"
          respuesta=""
        />
        <AccordionPreguntas
          pregunta="Envié una notificación errónea"
          respuesta=""
        />
        <AccordionPreguntas
          pregunta="Se me terminaron las notificaciones disponibles en el mes"
          respuesta=" 
          "
        />
        <AccordionPreguntas
          pregunta="Quiero programar una notificación para una fecha y hora determinada"
          respuesta=""
        />
        <AccordionPreguntas
          pregunta="Quiero acceder a un mayor número de notificaciones por mes"
          respuesta="
          "
        />
        <AccordionPreguntas
          pregunta="Quiero enviar notificaciones los clientes que pasan cerca de mi comercio"
          respuesta=""
        />
      </Accordion>
    </div>
  );
}
