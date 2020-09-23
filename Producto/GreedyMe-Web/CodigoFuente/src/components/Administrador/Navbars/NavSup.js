import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CerrarSesion from "../cerrarSesion";
import { connect } from "react-redux";

export function NavSup({ appBar }) {
  return (
    <div>
      <AppBar position="fixed" className={appBar}>
        <Toolbar className="nav-container">
          <a id="titulo">
            <h1 className="gre">gre</h1>
            <h1 className="edy">edy</h1>
            <h1 className="me">me</h1>
          </a>
          <CerrarSesion />
        </Toolbar>
      </AppBar>
    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(NavSup);
