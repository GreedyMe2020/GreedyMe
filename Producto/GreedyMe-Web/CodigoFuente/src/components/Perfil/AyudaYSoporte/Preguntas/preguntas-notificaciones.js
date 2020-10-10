import * as React from "react";
import AccordionPreguntas from "./accordion-preguntas";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Link } from "@reach/router";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "30px",
  },
}));

function PreguntasNotificaciones(props) {
  const classes = useStyles();
  return (
    <div>
      <div className="prom-title-container">
        <h1>Ayuda y soporte técnico</h1>
      </div>
      <Link
        to={"/main/" + props.auth.uid + "/ayuda-y-soporte"}
        className="ayuda-link-volver"
      >
        Volver
      </Link>
      <div className={classes.root}>
        <AccordionPreguntas
          pregunta=" Quiero notificar a los clientes sobre un beneficio de mi tienda"
          respuesta="Para enviar una notificación a los usuarios de la plataforma acerca de un beneficio determinado, deberás dirigirte a la sección Notificaciones desde la barra lateral de la pantalla.
          Una vez en dicha sección, verás un formulario para cargar los datos de la notificación a enviar. Al lado de este, se visualiza el número de notificaciones disponibles para enviar en el mes.
          Lo primero que se puede elegir es el público al cual irá dirigida la notificación (todos los usuarios, usuarios que tengan a tu local como favorito) y luego se seleccionará el beneficio que se desea notificar.
          Por último, se encuentran las opciones de dirigir la notificación a los usuarios que se encuentren cerca de la tienda y programar la notificación para que se envíe a una fecha y hora determinada.
          Para hacer efectivo el envío, debes seleccionar la opción “Enviar notificación”.
          "
        />
        <AccordionPreguntas
          pregunta="Quiero acceder a un mayor público con mis notificaciones"
          respuesta="Las notificaciones son una de las funcionalidades que varían según el plan al que te encuentres suscripto. Las características que varían son: cantidad de notificaciones mensuales, público al que se dirige, posibilidad de programar el envío y notificaciones por ubicación.
          Por lo tanto, para acceder a alguna característica que no está incluida en tu plan, deberás suscribirte a uno mayor a través de la sección Suscripciones de la página de GreedyMe.
          "
        />
        <AccordionPreguntas
          pregunta="Envié una notificación errónea"
          respuesta="Las notificaciones una vez enviadas no pueden deshacerse. Por esto recomendamos prestar extrema atención a los datos de una notificación antes de enviarla, ya que se descontará de las notificaciones disponibles a enviar en un mes."
        />
        <AccordionPreguntas
          pregunta="Se me terminaron las notificaciones disponibles en el mes"
          respuesta="Las notificaciones son una de las funcionalidades que varían según el plan al que te encuentres suscripto. Las características que varían son: cantidad de notificaciones mensuales, público al que se dirige, posibilidad de programar el envío y notificaciones por ubicación.
          Si se te agotaron las notificaciones disponibles en el mes, deberás esperar al próximo para restaurar dicho número. 
          Si en cambio deseas acceder a un mayor número de notificaciones mensuales en el momento, deberás suscribirte a un plan mayor a través de la sección Suscripciones de la página de GreedyMe. El máximo de notificaciones a enviar en un mes son 30.
          "
        />
        <AccordionPreguntas
          pregunta="Quiero programar una notificación para una fecha y hora determinada"
          respuesta="Las notificaciones son una de las funcionalidades que varían según el plan al que te encuentres suscripto. Las características que varían son: cantidad de notificaciones mensuales, público al que se dirige, posibilidad de programar el envío y notificaciones por ubicación.
          Por lo tanto, para acceder a alguna característica que no está incluida en tu plan, deberás suscribirte a uno mayor a través de la sección Suscripciones de la página de GreedyMe. 
          "
        />
        <AccordionPreguntas
          pregunta="Quiero acceder a un mayor número de notificaciones por mes"
          respuesta="Las notificaciones son una de las funcionalidades que varían según el plan al que te encuentres suscripto. Las características que varían son: cantidad de notificaciones mensuales, público al que se dirige, posibilidad de programar el envío y notificaciones por ubicación.
          Por lo tanto, para acceder a un mayor número de notificaciones mensuales, deberás suscribirte a un plan mayor a través de la sección Suscripciones de la página de GreedyMe. El máximo de notificaciones a enviar en un mes son 30.
          "
        />
        <AccordionPreguntas
          pregunta="Quiero enviar notificaciones los clientes que pasan cerca de mi comercio"
          respuesta="Las notificaciones son una de las funcionalidades que varían según el plan al que te encuentres suscripto. Las características que varían son: cantidad de notificaciones mensuales, público al que se dirige, posibilidad de programar el envío y notificaciones por ubicación.
          Las notificaciones por ubicación, parte del plan Premium, permiten que cuando un usuario de GreedyMe este pasando a una cierta distancia de tu comercio reciba una notificación acerca de los beneficios que presenta en él.
          Por lo tanto, para acceder a alguna característica que no está incluida en tu plan, deberás suscribirte a uno mayor a través de la sección Suscripciones de la página de GreedyMe. 
          "
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(PreguntasNotificaciones);
