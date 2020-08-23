import * as React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
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

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor: "#d8d8d8",
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
    marginTop: "40px",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export function NavBarSup(props) {
  const classes = useStyles();
  const [seleccionado, setSeleccionado] = React.useState(0);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
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

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItemCustom
              id="listItemCustom"
              text="Inicio"
              src1={require("../../../Multimedia/Sistema-svg/home-grey.svg")}
              src2={require("../../../Multimedia/Sistema-svg/home-run-orange.svg")}
              className="inicio-img"
              seleccionado={seleccionado}
              setSeleccionado={setSeleccionado}
              elementIndex={0}
            />
          </List>
          <Divider variant="middle" />
          <List>
            <ListItemCustom
              id="listItemCustom"
              text="Cargar cupón"
              src1={require("../../../Multimedia/Sistema-svg/promo-grey.svg")}
              src2={require("../../../Multimedia/Sistema-svg/promo-naranja.svg")}
              className="cargar-cupon"
              seleccionado={seleccionado}
              setSeleccionado={setSeleccionado}
              elementIndex={1}
            />
            <ListItemCustom
              id="listItemCustom"
              text="Cargar promoción"
              src1={require("../../../Multimedia/Sistema-svg/percentage-grey.svg")}
              src2={require("../../../Multimedia/Sistema-svg/percent-orange.svg")}
              className="cargar-promo"
              seleccionado={seleccionado}
              setSeleccionado={setSeleccionado}
              elementIndex={2}
            />
          </List>
          <Divider variant="middle" />
          <List>
            <ListItemCustom
              id="listItemCustom"
              text="Mis promociones"
              src1={require("../../../Multimedia/Sistema-svg/coupon-grey.svg")}
              src2={require("../../../Multimedia/Sistema-svg/coupon-orange.svg")}
              className="mis-promociones"
              seleccionado={seleccionado}
              setSeleccionado={setSeleccionado}
              elementIndex={3}
            />
            <ListItemCustom
              id="listItemCustom"
              text="Estadísticas"
              src1={require("../../../Multimedia/Sistema-svg/statistics-grey.svg")}
              src2={require("../../../Multimedia/Sistema-svg/statistics-orange.svg")}
              className="estadisticas"
              seleccionado={seleccionado}
              setSeleccionado={setSeleccionado}
              elementIndex={4}
            />
            <ListItemCustom
              id="listItemCustom"
              text="Notificaciones"
              src1={require("../../../Multimedia/Sistema-svg/bell-grey.svg")}
              src2={require("../../../Multimedia/Sistema-svg/notification-orange.svg")}
              className="notificaciones"
              seleccionado={seleccionado}
              setSeleccionado={setSeleccionado}
              elementIndex={5}
            />
          </List>
        </div>
      </Drawer>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(NavBarSup);
