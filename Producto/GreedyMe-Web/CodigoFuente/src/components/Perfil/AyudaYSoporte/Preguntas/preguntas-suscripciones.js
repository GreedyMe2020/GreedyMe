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

function PreguntasSuscripcion(props) {
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
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(PreguntasSuscripcion);
