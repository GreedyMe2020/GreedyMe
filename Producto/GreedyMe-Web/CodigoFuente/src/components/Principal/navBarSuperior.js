/*import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import ListItemCustom from "../ListItemCustom";
import { Notificaciones } from "../Notificaciones";
import Perfil from "../Perfil";
import { Link } from "@reach/router";
import { connect } from "react-redux";

export function NavBarSup({ appBar }) {
  return (
    <AppBar position="fixed" className={appBar}>
      <Toolbar className="nav-container">
        <a id="titulo">
          <h1 className="gre">gre</h1>
          <h1 className="edy">edy</h1>
          <h1 className="me">me</h1>
        </a>

        <Notificaciones />
        <Perfil />
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(NavBarSup);*/

import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Notificaciones } from "../Notificaciones";
import Perfil from "../Perfil";
import { Link } from "@reach/router";
import { connect } from "react-redux";

export function NavBarSup({ appBar, seleccionado, setSeleccionado }) {
  return (
    <AppBar position="fixed" className={appBar}>
      <Toolbar className="nav-container">
        <a id="titulo">
          <h1 className="gre">gre</h1>
          <h1 className="edy">edy</h1>
          <h1 className="me">me</h1>
        </a>

        <Notificaciones />
        <Perfil seleccionado={seleccionado} setSeleccionado={setSeleccionado} />
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(NavBarSup);
