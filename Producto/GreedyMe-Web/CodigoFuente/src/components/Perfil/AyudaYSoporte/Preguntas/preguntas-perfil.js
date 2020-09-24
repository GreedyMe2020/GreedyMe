import * as React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionPreguntas from "./accordion-preguntas";

export default function PreguntasPerfil() {
  return (
    <div>
      <Accordion>
        <AccordionPreguntas
          pregunta="Quiero cambiar datos de mi cuenta (opcionales, obligatorios)"
          respuesta="Para cambiar los datos de tu cuenta, debes primero iniciar sesión.
          Una vez iniciada la sesión, en la sección superior derecha de la página principal encontraras un icono de una persona. Haciendo clic en él, seleccionas la sección Mi Perfil.
          Al ser redirigido a dicha sección encontraras un formulario con todos tus datos personales, debes tener en cuenta que algunos de ellos son editables mientras que otros no, así como también existen datos obligatorios y opcionales.
          Respecto a la información de inicio de sesión, podrás modificar la contraseña seleccionando la opción “Cambiar contraseña” así como también, la imagen de usuario, pudiendo cargar una nueva o eliminar la existente.
          En la sección Información general, los campos editables son la sucursal, el sitio web, el usuario de Instagram y Facebook de tu comercio, el rubo, el teléfono y la dirección, siendo estos últimos tres, obligatorios.
          Una vez realizados los cambios deseados, seleccionas la opción “Guardar cambios” y los mismos se actualizarán en la plataforma.
          "
        />
        <AccordionPreguntas
          pregunta="Quiero cambiar datos no modificables de mi cuenta"
          respuesta="Los datos no modificables de tu cuenta son: Nombre de Comercio, Email y CUIT.
            Para modificar alguno de esos datos, deberás comunicarte con el servicio de soporte de GreedyMe por medio de un correo a la dirección: greedyme.contacto@gmail.com con el asunto “Modificación de datos de comercio 'nombre-de-comercio'” 
            Luego el personal de GreedyMe se pondrá en contacto para continuar con el proceso.
            "
        />
        <AccordionPreguntas
          pregunta="Quiero cambiar mi contraseña"
          respuesta="Para cambiar la contraseña de tu cuenta existen alternativas:
            Una vez iniciada la sesión, en la sección superior derecha de la página principal encontraras un icono de una persona. Haciendo clic en él, seleccionas la sección Mi Perfil.
            Al ser redirigido a dicha sección encontraras un formulario con todos tus datos personales. 
            En la información de inicio de sesión, veras el campo de contraseña y debajo de él, la opción “Cambiar contraseña”. Seleccionando dicha opción, proseguirás al procedimiento de cambio de contraseña.
            Desde la página de inicio de sesión, seleccionas la opción “Olvide mi contraseña”. Se enviará un mail al correo registrado en tu perfil a través del cual podrás modificar tu contraseña por una nueva.  
            "
        />
        <AccordionPreguntas
          pregunta="Quiero eliminar mi cuenta"
          respuesta="Para eliminar tu cuenta de la plataforma, deberás comunicarte con el servicio de soporte de GreedyMe por medio de un correo a la dirección: greedyme.contacto@gmail.com con el asunto “Baja de usuario de comercio 'nombre-de-comercio'”. 
            Luego el personal de GreedyMe se pondrá en contacto para continuar con el proceso.
            "
        />
      </Accordion>
    </div>
  );
}
