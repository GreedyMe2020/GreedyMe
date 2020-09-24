import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import ListItemCustom from "../ListItemCustom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#ececec",
  },
  drawerContainer: {
    overflow: "auto",
    marginTop: "40px",
  },
}));

export default function NavBarIzq({ seleccionado, setSeleccionado }) {
  const classes = useStyles();

  return (
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
            id="inicio"
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
            id="cargar-cupon"
            text="Cargar cupón"
            src1={require("../../../Multimedia/Sistema-svg/promo-grey.svg")}
            src2={require("../../../Multimedia/Sistema-svg/promo-naranja.svg")}
            className="cargar-cupon"
            seleccionado={seleccionado}
            setSeleccionado={setSeleccionado}
            elementIndex={1}
          />
        </List>
        <Divider variant="middle" />
        <List>
          <ListItemCustom
            id="mis-beneficios"
            text="Mis beneficios"
            src1={require("../../../Multimedia/Sistema-svg/coupon-grey.svg")}
            src2={require("../../../Multimedia/Sistema-svg/coupon-orange.svg")}
            className="mis-promociones"
            seleccionado={seleccionado}
            setSeleccionado={setSeleccionado}
            elementIndex={3}
          />
          <ListItemCustom
            id="estadisticas"
            text="Estadísticas"
            src1={require("../../../Multimedia/Sistema-svg/statistics-grey.svg")}
            src2={require("../../../Multimedia/Sistema-svg/statistics-orange.svg")}
            className="estadisticas"
            seleccionado={seleccionado}
            setSeleccionado={setSeleccionado}
            elementIndex={4}
          />
          <ListItemCustom
            id="notificaciones"
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
  );
}
