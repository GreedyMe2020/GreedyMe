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

//pagina vacia

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
//pruebas style

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
  const [opcion, setOpcion] = React.useState(0);

  const getOpcionSeleccionada = (seleccionado) => {
    if (seleccionado === 0) {
      return <h3></h3>;
    }
    if (seleccionado === 1) {
      return <h3></h3>;
    }
    if (seleccionado === 2) {
      return <CargaPromociones />;
    }
    if (seleccionado === 3) {

      return <MisPromociones />;

    if (seleccionado === 4) {
      return <h3>Estadísticas</h3>;
    }
    if (seleccionado === 5) {
      return <h3>Notificaciones</h3>;
    }
    if (seleccionado === 6) {
      return <Perfil />;
    }
    if (seleccionado === 7) {
      return <h3>Suscripciones</h3>;
    }
    if (seleccionado === 8) {
      return <h3>Ayuda y soporte</h3>;
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
