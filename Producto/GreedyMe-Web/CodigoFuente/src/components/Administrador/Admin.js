import React from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../redux/actions/authActions';
import ListaUsuarios from './Comercios/ListaUsuarios';
import NavSup from './Navbars/NavSup';
import NavIzq from './Navbars/NavIzq';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import ListaPromocion from './Promociones/ListaPromocion';
import ListaProveedores from './Proveedores/ListaProveedores';
import Estadisticas from './Estadisticas/Estadisticas';
import GreedyShop from './GreedyShop/Greedy-shop';
import PuntosEntrega from './GreedyShop/PuntosEntrega';
import ProductosCanjeados from './GreedyShop/ProductosCanjeados';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: '#ececec',
  },
}));

function Admin(props) {
  const classes = useStyles();
  const [seleccionado, setSeleccionado] = React.useState(0);

  const getOpcionSeleccionada = (seleccionado) => {
    if (seleccionado === 0) {
      return <ListaUsuarios />;
    }
    if (seleccionado === 1) {
      return <ListaProveedores />;
    }
    if (seleccionado === 2) {
      return <ListaPromocion />;
    }
    if (seleccionado === 3) {
      return <GreedyShop />;
    }
    if (seleccionado === 4) {
      return <ProductosCanjeados />;
    }
    if (seleccionado === 5) {
      return <PuntosEntrega />;
    }
    if (seleccionado === 6) {
      return <Estadisticas />;
    }
  };

  return (
    <div className="main-container">
      <div className={classes.root}>
        <CssBaseline />
        <NavSup appBar={classes.appBar} />
        <NavIzq
          seleccionado={seleccionado}
          setSeleccionado={setSeleccionado}
        />
        <main className={classes.content}>
          <Toolbar />
          {getOpcionSeleccionada(seleccionado)}
        </main>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
