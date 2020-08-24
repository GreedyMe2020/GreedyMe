import * as React from "react";
import { Link } from "@reach/router";
import { connect } from "react-redux";
import { signOut } from "../../redux/actions/authActions";
import { crearPromocion } from "../../redux/actions/promActions";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import CargaPromociones from "../Promociones/cargaPromociones";

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

  const getOpcionSeleccionada = (seleccionado) => {
    if (seleccionado === 0) {
      return <h1>Pagina principal</h1>;
    }
    if (seleccionado === 1) {
      return <h1>En esta pagina iria lo de Carga cupón</h1>;
    }
    if (seleccionado === 2) {
      return <CargaPromociones />;
    }
    if (seleccionado === 3) {
      return <h1>Aca van Mis promociones</h1>;
    }
    if (seleccionado === 4) {
      return <h1>Aca las estadisticas</h1>;
    }
    if (seleccionado === 5) {
      return <h1>y aca las notificaciones</h1>;
    }
  };

  return (
    <div className="main-container">
      <div className={classes.root}>
        <CssBaseline />
        <NavBarSup appBar={classes.appBar} />
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
