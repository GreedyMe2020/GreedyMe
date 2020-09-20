import React from "react";
import { connect } from "react-redux";
import { signOut } from "../../redux/actions/authActions";
import FormCrearUsuario from "./FormCrearUsuario";
import ListaUsuarios from "./ListaUsuarios";
import ListaPromocion from "./ListaPromocion";
import FormPromocion from "./FormPromocion";
import ListaProveedores from "./ListaProveedores";
import FormProveedores from "./FormProveedores";
import FormTipoProveedores from "./FormTipoProveedores";
import FormTipoPromocion from "./FormTipoPromocion";

function Admin(props) {
  const handleCloseSesion = () => {
    props.signOut();
  };
  return (
    <>
      <button onClick={handleCloseSesion}>Cerrar sesion</button>
      <FormCrearUsuario />
      <ListaUsuarios />
      <FormTipoPromocion />
      <FormPromocion />
      <ListaPromocion />
      <FormTipoProveedores />
      <FormProveedores />
      <ListaProveedores />
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
