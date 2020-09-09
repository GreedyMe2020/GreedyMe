import React from "react";
import { connect } from "react-redux";
import Admin from "../components/Administrador/Admin";
import { Redirect } from "@reach/router";
//pagina vacia

function Administrador(props) {
  if (!props.auth.uid) return <Redirect to="/login" />;
  return (
    <div>
      <Admin />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(Administrador);
