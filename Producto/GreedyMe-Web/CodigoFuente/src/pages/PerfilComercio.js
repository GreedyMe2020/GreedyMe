import React from "react";
import Perfil from "../components/Perfil/Perfil";
import { connect } from "react-redux";
import { Redirect, Link } from "@reach/router";

function PerfilComercio(props) {
  if (!props.auth.uid) return <Redirect to="/login" />;
  return <Perfil />;
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(PerfilComercio);
