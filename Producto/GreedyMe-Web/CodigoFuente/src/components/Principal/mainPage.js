import * as React from "react";
import { Link } from "@reach/router";
import { connect } from "react-redux";
import { signOut } from "../../redux/actions/authActions";
import { crearPromocion } from "../../redux/actions/promActions";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import CargaPromociones from "../Promociones/cargaPromociones";
import MisPromociones from "../Promociones/misPromociones";
import Perfil from "../Perfil/Perfil";
import NavBarSup from "../../components/Principal/navBarSuperior";
import NavBarIzq from "../../components/Principal/navBarIzquierda";
import Suscripciones from "../Perfil/suscripciones";
import Inicio from "../Principal/inicio";
import Notificaciones from "../Notificaciones/principalNotif";
import Cupon from "../Cupon/cargarCupon";
import Estadisticas from "../Estadisticas/estadisticas.js";
import AyudaYSoporte from "../Perfil/AyudaYSoporte/ayuda-soporte";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: "#ececec",
  },
}));

function MainPage() {
  const classes = useStyles();
  const [seleccionado, setSeleccionado] = React.useState(0);
  const [cantPromos, setCantPromos] = React.useState(0);

  const getOpcionSeleccionada = (seleccionado) => {
    if (seleccionado === 0) {
      return (
        <Inicio
          seleccionado={seleccionado}
          setSeleccionado={setSeleccionado}
          cantPromos={cantPromos}
        />
      );
    }
    if (seleccionado === 1) {
      return <Cupon />;
    }
    if (seleccionado === 3) {
      return <MisPromociones setCantPromos={setCantPromos} />;
    }
    if (seleccionado === 4) {
      return <Estadisticas cantPromos={cantPromos} />;
    }
    if (seleccionado === 5) {
      return <Notificaciones />;
    }
    if (seleccionado === 6) {
      return <Perfil />;
    }
    if (seleccionado === 7) {
      return <Suscripciones />;
    }
    if (seleccionado === 8) {
      return <AyudaYSoporte />;
    }
  };

  return (
    <div className="main-container">
      <div className={classes.root}>
        <CssBaseline />
        <NavBarSup
          appBar={classes.appBar}
          seleccionado={seleccionado}
          setSeleccionado={setSeleccionado}
        />
        <NavBarIzq
          seleccionado={seleccionado}
          setSeleccionado={setSeleccionado}
        />

        <main className={classes.content}>
          <Toolbar />
          {getOpcionSeleccionada(seleccionado)}
          {/* <Link to="./promociones">
            <button>Cargar promoción</button>
          </Link> */}
        </main>
      </div>
    </div>
  );
}

export default MainPage;
