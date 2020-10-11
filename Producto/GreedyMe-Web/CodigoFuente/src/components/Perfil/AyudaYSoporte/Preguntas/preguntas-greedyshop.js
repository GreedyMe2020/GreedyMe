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

function PreguntasGreedyShop(props) {
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
          pregunta="Quiero agregar una recompensa a la tienda GreedyShop"
          respuesta=""
        />
        <AccordionPreguntas
          pregunta="Quiero eliminar una recompensa de la tienda GreedyShop"
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

export default connect(mapStateToProps)(PreguntasGreedyShop);
