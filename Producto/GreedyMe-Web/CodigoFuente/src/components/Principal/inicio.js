import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import { Redirect, Link } from "@reach/router";
import Statistics from "../../../Multimedia/Sistema-svg/statistics-inicio.svg";
import Notificaciones from "../../../Multimedia/Sistema-svg/notificaciones-inicio.svg";
import HacermePremium from "../Notificaciones/haztePremium";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#e1e1e1",
    "&:hover": {
      backgroundColor: "#ececec",
    },
    marginRight: 0,
    marginLeft: 0,
    marginBottom: 16,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    borderColor: "#e1e1e1",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
  },
}));

export default function Inicio(props) {
  const classes = useStyles();

  return (
    <div className="inicio-contenedor-todo">
      <div className="inicio-cont-1">
        <Card className="inicio-cards inicio-1">
          <CardContent>
            <h1 className="inicio-titulo">Cupones</h1>
            <p>Gestioná los descuentos que utilizan los clientes en tu local</p>
          </CardContent>
          <CardActions className="inicio-cont-boton">
            <Button
              variant="contained"
              id="inicio-button"
              type="submit"
              onClick={() => {
                props.setSeleccionado(1);
              }}
            >
              Cargar cupón
            </Button>
          </CardActions>
        </Card>

        <Card className="inicio-cont-cupones inicio-2 inicio-cards">
          <CardContent>
            <h1 className="inicio-titulo">Promociones activas</h1>
            <p>{props.cantPromos}</p>
          </CardContent>
          <CardActions className="inicio-cont-boton">
            <Button
              variant="contained"
              id="inicio-button"
              type="submit"
              onClick={() => {
                props.setSeleccionado(3);
              }}
            >
              Ir a mis promociones
            </Button>
          </CardActions>
        </Card>

        <Card className="inicio-cont-cupones inicio-3 inicio-cards">
          <CardContent className="inicio-cont-estadisticas">
            <img src={Statistics} alt="Statistics" />
            <h1 className="inicio-titulo">Estadísticas</h1>
            <p>
              Accedé a información útil sobre el uso de las promociones y
              descuentos de tu comercio
            </p>
          </CardContent>
          <CardActions className="inicio-cont-boton">
            <Button
              variant="contained"
              id="inicio-button"
              type="submit"
              onClick={() => {
                props.setSeleccionado(4);
              }}
            >
              Ver estadísticas
            </Button>
          </CardActions>
        </Card>

        <Card className="inicio-cont-cupones inicio-4 inicio-cards">
          <CardContent className="inicio-cont-estadisticas">
            <img src={Notificaciones} alt="Notificaciones" />
            <h1 className="inicio-titulo">Notificaciones</h1>
            <p>Gestioná las notificaciones que envias a los usuarios.</p>
          </CardContent>
          <CardActions className="inicio-cont-boton">
            <Button
              variant="contained"
              id="inicio-button"
              type="submit"
              onClick={() => {
                props.setSeleccionado(5);
              }}
            >
              Ir a notificaciones
            </Button>
          </CardActions>
        </Card>
      </div>
      <div className="inicio-cont-2">
        <Card className="inicio-cont-cupones inicio-5 inicio-cards">
          <CardContent>
            <div className="inicio-tit-cont">
              <h1 className="inicio-titulo">Ayuda</h1>
              <p>¿En qué podemos ayudarte?</p>
            </div>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Preguntas…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <p>Hacenos cualquier pregunta y conseguí la ayuda que necesitas.</p>
            <CardActions className="inicio-cont-boton">
              <Typography color="textSecondary" gutterBottom>
                <Link to="">Visitá el Centro de Ayuda</Link>
              </Typography>
            </CardActions>
          </CardContent>
        </Card>

        <div className="inicio-6">
          <HacermePremium />
        </div>
      </div>
    </div>
  );
}
