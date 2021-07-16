import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import ListItemCustomAdmin from '../../ListItemCustomAdmin';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#ececec',
  },
  drawerContainer: {
    overflow: 'auto',
    marginTop: '40px',
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
      id="navbar-izq"
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          <ListItemCustomAdmin
            id="comercios"
            text="Comercios"
            src1={require('../../../../Multimedia/Sistema-svg/comercio-gris.svg')}
            src2={require('../../../../Multimedia/Sistema-svg/comercio.svg')}
            className="inicio-img"
            seleccionado={seleccionado}
            setSeleccionado={setSeleccionado}
            elementIndex={0}
          />
        </List>
        <Divider variant="middle" />
        <List>
          <ListItemCustomAdmin
            id="proveedores"
            text="Proveedores"
            src1={require('../../../../Multimedia/Sistema-svg/proveedor.svg')}
            src2={require('../../../../Multimedia/Sistema-svg/proveedor-naranja.svg')}
            className="cargar-cupon"
            seleccionado={seleccionado}
            setSeleccionado={setSeleccionado}
            elementIndex={1}
          />
        </List>
        <Divider variant="middle" />
        <List>
          <ListItemCustomAdmin
            id="beneficios"
            text="Beneficios"
            src1={require('../../../../Multimedia/Sistema-svg/promocion.svg')}
            src2={require('../../../../Multimedia/Sistema-svg/promocion-naranja.svg')}
            className="cargar-cupon"
            seleccionado={seleccionado}
            setSeleccionado={setSeleccionado}
            elementIndex={2}
          />
        </List>
        <Divider variant="middle" />
        <List>
          <ListItemCustomAdmin
            id="greedyShop"
            text="GreedyPremios"
            src1={require('../../../../Multimedia/Sistema-svg/trofeo.svg')}
            src2={require('../../../../Multimedia/Sistema-svg/trofeo-naranja.svg')}
            className="cargar-cupon"
            seleccionado={seleccionado}
            setSeleccionado={setSeleccionado}
            elementIndex={3}
          />
        </List>
        <List>
          <ListItemCustomAdmin
            id="productos-canjeados"
            text="GreedyCanjes"
            src1={require('../../../../Multimedia/Sistema-svg/shopping-cart.svg')}
            src2={require('../../../../Multimedia/Sistema-svg/shopping-cart-naranja.svg')}
            className="cargar-cupon"
            seleccionado={seleccionado}
            setSeleccionado={setSeleccionado}
            elementIndex={4}
          />
        </List>
        <List>
          <ListItemCustomAdmin
            id="punto-retiro"
            text="Puntos de retiro"
            src1={require('../../../../Multimedia/Sistema-svg/pin.svg')}
            src2={require('../../../../Multimedia/Sistema-svg/pin-naranja.svg')}
            className="cargar-cupon"
            seleccionado={seleccionado}
            setSeleccionado={setSeleccionado}
            elementIndex={5}
          />
        </List>
        <Divider variant="middle" />
        <List>
          <ListItemCustomAdmin
            id="estadisticas"
            text="Estadísticas"
            src1={require('../../../../Multimedia/Sistema-svg/statistics-grey.svg')}
            src2={require('../../../../Multimedia/Sistema-svg/statistics-orange.svg')}
            className="estadisticas"
            seleccionado={seleccionado}
            setSeleccionado={setSeleccionado}
            elementIndex={6}
          />
        </List>
      </div>
    </Drawer>
  );
}
