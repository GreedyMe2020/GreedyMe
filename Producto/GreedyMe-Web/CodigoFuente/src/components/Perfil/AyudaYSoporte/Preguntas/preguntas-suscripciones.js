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
          respuesta=""
        />
        <AccordionPreguntas
          pregunta="Quiero informarme de las funcionalidades de los otros planes"
          respuesta=""
        />
        <AccordionPreguntas
          pregunta="Quiero cambiar mi suscripción"
          respuesta=""
        />
        <AccordionPreguntas
          pregunta="Quiero dar de baja a mi suscripción"
          respuesta=" 
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
