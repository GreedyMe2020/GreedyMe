import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Notificaciones } from "../Notificaciones";
import Perfil from "../Perfil";
import { Link } from "@reach/router";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

export function NavBarSup(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
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
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(NavBarSup);
