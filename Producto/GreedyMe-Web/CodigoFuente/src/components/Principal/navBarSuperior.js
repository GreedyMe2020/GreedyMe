import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import MenuList from "@material-ui/core/MenuList";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Divider from "@material-ui/core/Divider";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Drawer from "@material-ui/core/Drawer";
import ListItemCustom from "../ListItemCustom";
import { Notificaciones } from "../Notificaciones";
import Perfil from "../Perfil";

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

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className="nav-container">
          <div id="titulo">
            <h1 className="gre">gre</h1>
            <h1 className="edy">edy</h1>
            <h1 className="me">me</h1>
          </div>
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
              text="Inicio"
              src={require("../../../Multimedia/Sistema-svg/home-grey.svg")}
            />
          </List>
          <Divider variant="middle" />
          <List>
            <ListItemCustom
              text="Cargar cupón"
              src={require("../../../Multimedia/Sistema-svg/promo-grey.svg")}
            />
            <ListItemCustom
              text="Cargar promoción"
              src={require("../../../Multimedia/Sistema-svg/percentage-grey.svg")}
            />
          </List>
          <Divider />
          <List>
            <ListItemCustom
              text="Mis promociones"
              src={require("../../../Multimedia/Sistema-svg/coupon-grey.svg")}
            />
            <ListItemCustom
              text="Estadísticas"
              src={require("../../../Multimedia/Sistema-svg/statistics-grey.svg")}
            />
            <ListItemCustom
              text="Notificaciones"
              src={require("../../../Multimedia/Sistema-svg/bell-grey.svg")}
            />
          </List>
        </div>
      </Drawer>
    </div>
  );
}

export default NavBarSup;
