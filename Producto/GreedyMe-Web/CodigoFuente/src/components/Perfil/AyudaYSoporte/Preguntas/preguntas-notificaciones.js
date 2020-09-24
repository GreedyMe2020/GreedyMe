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
