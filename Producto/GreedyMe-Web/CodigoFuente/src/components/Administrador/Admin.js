import React from "react";
import { connect } from "react-redux";
import { signOut } from "../../redux/actions/authActions";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

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
    usuarios: state.firestore.ordered.usuarioComercio,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "usuarioComercio" }])
)(Admin);
