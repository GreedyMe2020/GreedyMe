import React from "react";
import { connect } from "react-redux";
import { signOut } from "../../redux/actions/authActions";
import FormCrearUsuario from "./FormCrearUsuario";
import ListaUsuarios from "./ListaUsuarios";
import NavSup from "./Navbars/NavSup";
import NavIzq from "./Navbars/NavIzq";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import ListaPromocion from "./ListaPromocion";
import FormPromocion from "./FormPromocion";
import ListaProveedores from "./ListaProveedores";
import FormProveedores from "./FormProveedores";
import FormTipoProveedores from "./FormTipoProveedores";
import FormTipoPromocion from "./FormTipoPromocion";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: "#ececec",
  },
}));

function Admin(props) {
  const classes = useStyles();
  const [seleccionado, setSeleccionado] = React.useState(0);

  const handleCloseSesion = () => {
    props.signOut();
  };

  const getOpcionSeleccionada = (seleccionado) => {
    if (seleccionado === 0) {
      return <FormCrearUsuario />;
    }
    if (seleccionado === 1) {
      return <ListaUsuarios />;
    }
    if (seleccionado === 2) {
      return <FormTipoPromocion />;
    }
    if (seleccionado === 3) {
      return <FormPromocion />;
    }
    if (seleccionado === 4) {
      return <FormTipoProveedores />;
    }
    if (seleccionado === 5) {
      return <FormProveedores />;
    }
    if (seleccionado === 6) {
      return <ListaProveedores />;
    }
  };

  return (
    <>
      <CssBaseline />
      <NavSup appBar={classes.appBar} />
      <NavIzq seleccionado={seleccionado} setSeleccionado={setSeleccionado} />
      <main className={classes.content}>
        <Toolbar />
        <button onClick={handleCloseSesion}>Cerrar sesion</button>
        {getOpcionSeleccionada(seleccionado)}
      </main>
    </>
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
