import * as React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionPreguntas from "./accordion-preguntas";

export default function PreguntasSuscripcion() {
  return (
    <div>
      <Accordion>
        <AccordionPreguntas
          pregunta="Quiero saber a qué plan estoy suscripto"
          respuesta="Para visualizar cual es la suscripción con la que cuenta tu comercio, deberás dirigirte a la sección superior derecha de la página principal encontrarás un icono de una persona. Haciendo clic allí, justo debajo del nombre de tu comercio, aparece el tipo de suscripción actual.
          "
        />
        <AccordionPreguntas
          pregunta="Quiero informarme de las funcionalidades de los otros planes"
          respuesta="Para visualizar las funcionalidades incluidas en los distintos planes, deberás dirigirte a la sección superior derecha de la página principal encontrarás un icono de una persona. Haciendo clic ahí, verás el nombre de tu comercio junto con otras opciones de menú, y entre ellas, el menú de Suscripciones.
          Una vez en dicha sección, podrás observar un cuadro comparativo de los distintos planes que ofrece la plataforma.
          "
        />
        <AccordionPreguntas
          pregunta="Quiero cambiar mi suscripción"
          respuesta="Para modificar la suscripción que posees actualmente, deberás dirigirte a la sección superior derecha de la página principal encontrarás un icono de una persona. Haciendo clic ahí, verás el nombre de tu comercio junto con otras opciones de menú, y entre ellas, el menú de Suscripciones.
          Una vez en dicha sección, podrás observar un cuadro comparativo de los distintos planes que ofrece la plataforma.
          Por último, debajo de la columna de cada plan, se encuentra un botón permitiendo actualizar el plan de tu comercio. Haciendo clic, se te redirigirá a una plataforma de pago para abonar la suscripción deseada.
          "
        />
        <AccordionPreguntas
          pregunta="Quiero dar de baja a mi suscripción"
          respuesta="Para anular la suscripción que posees actualmente, deberás dirigirte a la sección superior derecha de la página principal encontrarás un icono de una persona. Haciendo clic ahí, verás el nombre de tu comercio junto con otras opciones de menú, y entre ellas, el menú de Suscripciones.
          Una vez en dicha sección, podrás observar un cuadro comparativo de los distintos planes que ofrece la plataforma.
          Por último, debajo de la columna de cada plan, se encuentra un botón permitiendo actualizar el plan de tu comercio. Para anular la suscripción solo deberás cambiarte al plan base, ya que es gratuito para todos los usuarios de la plataforma.
          "
        />
      </Accordion>
    </div>
  );
}
