import React from "react";
import { Link } from "@reach/router";
import { connect } from "react-redux";
import { signOut } from "../../redux/actions/authActions";
import { crearPromocion } from "../../redux/actions/promActions";
import { NavBarSup } from "../../components/Principal/navBarSuperior";
import { NavBarIzq } from "../../components/Principal/navBarIzquierda";
//pagina vacia

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
//pruebas style

function MainPage(props) {
  return (
    <div>
      <NavBarSup></NavBarSup>
      {/* <NavBarIzq /> */}
      {/* <h1>Pagina principal</h1>
      <Link to="/">
        <button onClick={props.signOut}>Cerrar Sesion</button>
      </Link>
      <Link to="./promociones">
        <button onClick={props.crearPromocion}>Cargar promoción</button>
      </Link> */}
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(null, mapDispatchToProps)(MainPage);
