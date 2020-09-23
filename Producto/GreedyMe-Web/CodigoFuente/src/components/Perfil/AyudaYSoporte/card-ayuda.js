import * as React from "react";
import { Link } from "@reach/router";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import perfil from "../../../../Multimedia/Sistema-svg/usuario.svg";
import promociones from "../../../../Multimedia/Sistema-svg/cupon.svg";
import cupones from "../../../../Multimedia/Sistema-svg/codigo.svg";
import estadisticas from "../../../../Multimedia/Sistema-svg/estadisticas.svg";
import notificaciones from "../../../../Multimedia/Sistema-svg/notificacion.svg";
import suscripciones from "../../../../Multimedia/Sistema-svg/suscripcion.svg";
import greedyShop from "../../../../Multimedia/Sistema-svg/greedyShop.png";

import PreguntasPerfil from "./Preguntas/preguntas-perfil";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export function CardAyuda() {
  const classes = useStyles();
  return (
    <div className="contenedor-todo-ayuda">
      <Card className="card-t-ayuda">
        <CardContent className="card-content-ayuda">
          <List
            subheader={
              <ListSubheader>¿Con qué podemos ayudarte?</ListSubheader>
            }
            className={classes.root}
          >
            <ListItem button onClick={<PreguntasPerfil />}>
              <ListItemIcon>
                <img
                  width="24px"
                  height="24px"
                  src={perfil}
                  className="image-o"
                />
              </ListItemIcon>
              <ListItemText primary="Perfil" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <img
                  width="24px"
                  height="24px"
                  src={promociones}
                  className="image-o"
                />
              </ListItemIcon>
              <ListItemText primary="Beneficios" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <img
                  width="24px"
                  height="24px"
                  src={cupones}
                  className="image-o"
                />
              </ListItemIcon>
              <ListItemText primary="Cupones" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <img
                  width="24px"
                  height="24px"
                  src={estadisticas}
                  className="image-o"
                />
              </ListItemIcon>
              <ListItemText primary="Estadísticas" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <img
                  width="24px"
                  height="24px"
                  src={notificaciones}
                  className="image-o"
                />
              </ListItemIcon>
              <ListItemText primary="Notificaciones" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <img
                  width="28px"
                  height="28px"
                  src={suscripciones}
                  className="image-o"
                />
              </ListItemIcon>
              <ListItemText primary="Suscripciones" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <img
                  width="26px"
                  height="26px"
                  src={greedyShop}
                  className="image-o"
                />
              </ListItemIcon>
              <ListItemText primary="Greedy Shop" />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(CardAyuda);
