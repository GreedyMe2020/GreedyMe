import React from "react";
import { Link } from "@reach/router";
import { connect } from "react-redux";
import { signOut } from "../../redux/actions/authActions";
//pagina vacia

function MainPage(props) {
  return (
    <div>
      <h1>Pagina principal</h1>
      <Link to="/">
        <button onClick={props.signOut}>Cerrar Sesion</button>
      </Link>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(null, mapDispatchToProps)(MainPage);
