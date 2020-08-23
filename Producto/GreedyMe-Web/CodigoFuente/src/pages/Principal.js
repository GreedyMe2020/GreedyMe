import React from "react";
import MainPage from "../components/Principal/mainPage";
import cargaPromociones from "../components/Promociones/cargaPromociones";
import { connect } from "react-redux";
import { Redirect, Link } from "@reach/router";

function Principal(props) {
  if (!props.auth.uid) return <Redirect to="/login" />;
  return (
    <div>
      <MainPage />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(Principal);
