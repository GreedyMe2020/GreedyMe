import * as React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionPreguntas from "./accordion-preguntas";

export default function PreguntasCupon() {
  return (
    <div>
      <Accordion>
        <AccordionPreguntas
          pregunta="Como otorgar el código del beneficio aplicado a mi cliente"
          respuesta="Cuando un cliente utiliza un beneficio en tu local que se encuentra cargado en tu perfil, el mismo puede acceder a recompensas dentro de la aplicación. Para ello, necesita validar el beneficio una vez utilizado, ingresando un código de validación por su celular. Dicho código debe ser entregado por el vendedor que haya efectuado la venta.
          Para otorgar el código de validación, deberás dirigirte a la sección Cargar cupón desde la barra lateral de la pantalla.
          Una vez en dicha sección deberás elegir desde el desplegable cuál fue el beneficio utilizado por el cliente. Al seleccionarlo, se generará un código alfanumérico que deberás brindarle al cliente para que este pueda validar la utilización de su beneficio y obtener las recompensas.
          Cada código generado tiene validez por un solo uso, es decir, si luego existe otro cliente que haya utilizado la misma promoción, se deberá generar un nuevo código de validación. 
          "
        />
        <AccordionPreguntas
          pregunta="Otorgué un código de validación erróneo"
          respuesta="Si por algún motivo otorgaste un código de validación incorrecto, por ejemplo, generando un código con el beneficio equivocado, lo único que deberás hacer es seleccionar correctamente el beneficio utilizado por el cliente y generar un código nuevo. El código anterior se descarta, sin ocasionar ningún problema ni dato incorrecto para las estadísticas de tu comercio.
          En el caso que hayas dictado mal el código y el cliente haya ingresado un código erróneo, solo deberás dictarlo nuevamente de la forma correcta.
          "
        />
        <AccordionPreguntas
          pregunta="Un cliente utilizó más de un beneficio en mi comercio"
          respuesta="Si un cliente realizó una o más compras utilizando beneficios diferentes en tu comercio, para que este pueda validar sus cupones en la aplicación deberá ingresar un código de validación distinto para cada uno.
          Para otorgar el código de validación, deberás dirigirte a la sección Cargar cupón desde la barra lateral de la pantalla.
          Una vez en dicha sección deberás elegir desde el desplegable cuál fue el beneficio utilizado por el cliente. Al seleccionarlo, se generará un código alfanumérico que deberás brindarle al cliente para que este pueda validar la utilización de su beneficio y obtener las recompensas.
          "
        />
        <AccordionPreguntas
          pregunta="Para que le sirven a mi comercio los códigos de validación"
          respuesta="Cuando un cliente ingresa el código de validación en la aplicación tras haber usado un beneficio de tu comercio, al mismo se le provee una encuesta de experiencia de compra. A través de esta, el cliente evalúa la atención y otros aspectos, que luego se reflejarán en la sección de Reseñas en el perfil de su comercio desde la aplicación móvil.
          Además, los datos de los códigos validados junto con otros más colaboran a la elaboración de estadísticas de interés para el comercio.           
          "
        />
      </Accordion>
    </div>
  );
}
