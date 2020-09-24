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

function PreguntasCupon(props) {
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
          pregunta="Como otorgar el código del beneficio aplicado a mi cliente"
          respuesta=""
        />
        <AccordionPreguntas
          pregunta="Otorgué un código de validación erróneo"
          respuesta=""
        />
        <AccordionPreguntas
          pregunta="Un cliente utilizó más de un beneficio en mi comercio"
          respuesta=""
        />
        <AccordionPreguntas
          pregunta="Para que le sirven a mi comercio los códigos de validación"
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

export default connect(mapStateToProps)(PreguntasCupon);
