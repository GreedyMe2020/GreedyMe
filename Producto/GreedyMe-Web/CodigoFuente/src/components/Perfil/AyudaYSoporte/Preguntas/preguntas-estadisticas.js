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

function PreguntasEstadisticas(props) {
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
          pregunta="Quiero crear una estadística nueva"
          respuesta="Para crear una estadística nueva, deberás dirigirte a la sección Estadísticas desde la barra lateral de la pantalla.
          Una vez en dicha sección, podrás ver las estadísticas base de un mes y año determinado a través de la selección de estos en la parte superior de la pantalla.
          En el caso que desees crear una estadística distinta a las que se muestran inicialmente, deberás seleccionar la opción “Nuevo reporte”. Se te dirigirá a una vista donde podrás seleccionar la estadística deseada insertando las opciones (por ejemplo: proveedor de beneficio, mes, año) correspondientes.
          Por último, seleccionas la opción “Generar reporte” para ver los resultados.
          "
        />
        <AccordionPreguntas
          pregunta="Quiero acceder a más estadísticas de las que poseo"
          respuesta="Las estadísticas son una de las funcionalidades que varían según el plan al que te encuentres suscripto. La exportación del reporte también varía según el plan.
          Por lo tanto, para acceder a otro tipo de reportes que no están incluidos en tu plan, deberás suscribirte a uno mayor a través de la sección Suscripciones de la página de GreedyMe. 
          "
        />
        <AccordionPreguntas
          pregunta="Quiero descargar una estadística en mi computadora"
          respuesta="La exportación de un reporte es una de las funcionalidades que varían según el plan al que te encuentres suscripto. El tipo de estadísticas a las que tenes acceso también varía según el plan.
          Por lo tanto, si tu plan no incluye la posibilidad de exportar una estadística y guardarla en tu computadora, deberás primero suscribirte a un plan que contemple esa funcionalidad.
          Por otro lado, si tu plan incluye dicha funcionalidad, una vez creada la estadística deseada deberás seleccionar la opción “Exportar reporte”. Se te abrirá una ventana para que almacenes el reporte en la ubicación deseada de tu computadora con un nombre de preferencia.
          "
        />
        <AccordionPreguntas
          pregunta="Quiero obtener la estadística de un periodo de tiempo determinado"
          respuesta="Para visualizar las estadísticas de tu comercio, deberás dirigirte a la sección Estadísticas desde la barra lateral de la pantalla.
          Una vez en dicha sección, podrás ver las estadísticas base de un mes y año determinado a través de la selección de estos en la parte superior de la pantalla. Por defecto, se muestran aquellas pertenecientes al mes y año actual.
          En el caso que desees crear una estadística distinta a las que se muestran inicialmente, deberás seleccionar la opción “Nuevo reporte”. Se te dirigirá a una vista donde podrás seleccionar la estadística deseada pudiendo especificar ahí el período correspondiente a conocer. Por último, seleccionas la opción “Generar reporte” para ver los resultados.
          "
        />
        <AccordionPreguntas
          pregunta="Cómo se obtienen los datos para la experiencia del cliente en mi comercio"
          respuesta="Cuando un cliente ingresa el código de validación en la aplicación tras haber usado un beneficio de tu comercio, al mismo se le provee una encuesta de experiencia de compra. A través de esta, el cliente evalúa la atención y otros aspectos, que luego se reflejarán en la sección de Reseñas en el perfil de su comercio desde la aplicación móvil. Estas preguntas se responden por medio de calificaciones al servicio y al cumplimiento con el beneficio publicado.
          Además, los datos de los códigos validados junto con otros más colaboran a la elaboración de estadísticas de interés para el comercio.
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

export default connect(mapStateToProps)(PreguntasEstadisticas);
