import * as React from "react";
import { Router } from "@reach/router";
import { Link } from "@reach/router";
import { connect } from "react-redux";
import { signOut } from "../../redux/actions/authActions";
import { crearPromocion } from "../../redux/actions/promActions";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
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
import PreguntasPerfil from "../Perfil/AyudaYSoporte/Preguntas/preguntas-perfil";
import PreguntasBeneficios from "../Perfil/AyudaYSoporte/Preguntas/preguntas-beneficios";
import PreguntasCupon from "../Perfil/AyudaYSoporte/Preguntas/preguntas-cupon";
import PreguntasEstadisticas from "../Perfil/AyudaYSoporte/Preguntas/preguntas-estadisticas";
import PreguntasGreedyShop from "../Perfil/AyudaYSoporte/Preguntas/preguntas-greedyshop";
import PreguntasNotificaciones from "../Perfil/AyudaYSoporte/Preguntas/preguntas-notificaciones";
import PreguntasSuscripcion from "../Perfil/AyudaYSoporte/Preguntas/preguntas-suscripciones";

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

/* const Main = (props) => {
  return (
    <main className={props.className}>
      <Toolbar />
      {getOpcionSeleccionada(seleccionado)}
      { <Link to="./promociones">
            <button>Cargar promoción</button>
          </Link> }
      {props.mainId == "inicio" ? (
        <Inicio
          seleccionado={seleccionado}
          setSeleccionado={setSeleccionado}
          cantPromos={cantPromos}
        />
      ) : props.mainId == "cargar-cupon" ? (
        <Cupon />
      ) : (
        "No es ninguno de los dos"
      )}
    </main>
  );
}; */

function MainPage(props) {
  const classes = useStyles();
  const [seleccionado, setSeleccionado] = React.useState(0);
  const [cantPromos, setCantPromos] = React.useState(0);

  /* const getOpcionSeleccionada = (seleccionado) => {
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
  }; */

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
          {/*getOpcionSeleccionada(seleccionado)*/}

          {/* {props.children === <PreguntasPerfil /> ? (
            <PreguntasPerfil />
          ) : props.mainId == "inicio" ? (
            <Inicio
              seleccionado={seleccionado}
              setSeleccionado={setSeleccionado}
              cantPromos={cantPromos}
            />
          ) : props.mainId == "cargar-cupon" ? (
            <Cupon />
          ) : props.mainId == "mis-beneficios" ? (
            <MisPromociones setCantPromos={setCantPromos} />
          ) : props.mainId == "estadisticas" ? (
            <Estadisticas cantPromos={cantPromos} />
          ) : props.mainId == "notificaciones" ? (
            <Notificaciones />
          ) : props.mainId === "perfil" ? (
            <Perfil />
          ) : props.mainId === "suscripciones" ? (
            <Suscripciones />
          ) : props.mainId === "ayuda-y-soporte" ? (
            <AyudaYSoporte />
          ) : (
            ""
          )} */}

          <Router>
            <Inicio
              path="inicio"
              seleccionado={seleccionado}
              setSeleccionado={setSeleccionado}
              cantPromos={cantPromos}
            />
            <Cupon path="cargar-cupon" />
            <MisPromociones
              path="mis-beneficios"
              setCantPromos={setCantPromos}
            />
            <Notificaciones path="notificaciones" />
            <Estadisticas path="estadisticas" cantPromos={cantPromos} />
            <Perfil path="perfil" />
            <Suscripciones path="suscripciones" />
            <AyudaYSoporte path="ayuda-y-soporte" />
            <PreguntasPerfil path="ayuda-y-soporte/perfil" />
            <PreguntasBeneficios path="ayuda-y-soporte/beneficios" />
            <PreguntasCupon path="ayuda-y-soporte/cupones" />
            <PreguntasEstadisticas path="ayuda-y-soporte/estadisticas" />
            <PreguntasNotificaciones path="ayuda-y-soporte/notificaciones" />
            <PreguntasSuscripcion path="ayuda-y-soporte/suscripciones" />
            <PreguntasGreedyShop path="ayuda-y-soporte/greedy-shop" />
          </Router>
        </main>
      </div>
    </div>
  );
}

export default MainPage;
