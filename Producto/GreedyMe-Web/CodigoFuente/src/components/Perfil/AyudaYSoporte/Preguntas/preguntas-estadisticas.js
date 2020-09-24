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
          respuesta=""
        />
        <AccordionPreguntas
          pregunta="Quiero acceder a más estadísticas de las que poseo"
          respuesta=""
        />
        <AccordionPreguntas
          pregunta="Quiero descargar una estadística en mi computadora"
          respuesta=""
        />
        <AccordionPreguntas
          pregunta="Quiero obtener la estadística de un periodo de tiempo determinado"
          respuesta=" 
          "
        />
        <AccordionPreguntas
          pregunta="Como se obtienen los datos para la experiencia del cliente en mi comercio"
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

export default connect(mapStateToProps)(PreguntasEstadisticas);
