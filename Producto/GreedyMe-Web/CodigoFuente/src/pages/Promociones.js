import React from "react";
import { Link } from "@reach/router";
import { connect } from "react-redux";
import CargaPromociones from "../components/Promociones/cargaPromociones";
import { Redirect } from "@reach/router";
//pagina vacia

function Promociones(props) {
  if (!props.auth.uid) return <Redirect to="/login" />;
  return (
    <div>
      <CargaPromociones />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(Promociones);
