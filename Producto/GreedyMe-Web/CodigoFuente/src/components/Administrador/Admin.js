import React from "react";
import { connect } from "react-redux";
import { signOut } from "../../redux/actions/authActions";

function Admin(props) {
  const handleCloseSesion = () => {
    props.signOut();
  };
  return (
    <>
      <p>Hola bromigos administradores</p>
      <button onClick={handleCloseSesion}>Cerrar sesion</button>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
