import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import ListItemCustom from "../../ListItemCustom";

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

export default function NavIzq({ seleccionado, setSeleccionado }) {
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
            id="listItemCustom"
            text="Comercios"
            src1={require("../../../../Multimedia/Sistema-svg/comercio-gris.svg")}
            src2={require("../../../../Multimedia/Sistema-svg/comercio.svg")}
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
            text="Proveedores"
            src1={require("../../../../Multimedia/Sistema-svg/proveedor.svg")}
            src2={require("../../../../Multimedia/Sistema-svg/proveedor-naranja.svg")}
            className="cargar-cupon"
            seleccionado={seleccionado}
            setSeleccionado={setSeleccionado}
            elementIndex={1}
          />
        </List>
        <Divider variant="middle" />
        <List>
          <ListItemCustom
            id="listItemCustom"
            text="Promociones"
            src1={require("../../../../Multimedia/Sistema-svg/promocion.svg")}
            src2={require("../../../../Multimedia/Sistema-svg/promocion-naranja.svg")}
            className="cargar-cupon"
            seleccionado={seleccionado}
            setSeleccionado={setSeleccionado}
            elementIndex={2}
          />
        </List>
      </div>
    </Drawer>
  );
}
