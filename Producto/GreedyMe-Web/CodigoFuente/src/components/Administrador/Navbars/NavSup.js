import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "@reach/router";
import { connect } from "react-redux";

export function NavSup({ appBar }) {
  return (
    <AppBar position="fixed" className={appBar}>
      <Toolbar className="nav-container">
        <a id="titulo">
          <h1 className="gre">gre</h1>
          <h1 className="edy">edy</h1>
          <h1 className="me">me</h1>
        </a>
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(NavSup);
