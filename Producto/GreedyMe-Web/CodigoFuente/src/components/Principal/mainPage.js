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
import PreguntasNotificaciones from "../Perfil/AyudaYSoporte/Preguntas/preguntas-notificaciones";
import PreguntasSuscripcion from "../Perfil/AyudaYSoporte/Preguntas/preguntas-suscripciones";
import OnRouteChange from "../Router-scroll";

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
//agarro la ruta actual
const URLactual = window.location.pathname;

function MainPage(props) {
  const classes = useStyles();
  //Estado para ver que componente esta seleccionado en mainº
  const [seleccionado, setSeleccionado] = React.useState(URLactual.endsWith('inicio') === true ? 0 : 
  URLactual.endsWith('cargar-cupon') === true ? 1 : URLactual.endsWith('mis-beneficios') === true ? 3 : 
  URLactual.endsWith('estadisticas') === true ? 4 : URLactual.endsWith('notificaciones') === true ? 5 : null);
  //Estado para manejar la cantidad de promociones activas de un usuario y pasarlo para visualizacion
  const [cantPromos, setCantPromos] = React.useState(0);
  
  const handleSeleccionado = (elem) => {
    setSeleccionado(elem);
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

          {/*  */}

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
            <Notificaciones path="notificaciones" setSeleccionado={setSeleccionado}/>
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
          </Router>
          <OnRouteChange
            action={() => {
              window.scrollTo(0, 0);
            }}
          />
        </main>
      </div>
    </div>
  );
}

export default MainPage;
