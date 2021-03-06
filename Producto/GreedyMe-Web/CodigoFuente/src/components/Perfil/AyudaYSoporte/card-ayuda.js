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

const fontstyles = {
  color: "#868686",
};

export function CardAyuda(props) {
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
            <Link
              to={"/main/" + props.auth.uid + "/ayuda-y-soporte/perfil"}
              className="link"
              style={fontstyles}
            >
              <ListItem button>
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
            </Link>
            <Link
              to={"/main/" + props.auth.uid + "/ayuda-y-soporte/beneficios"}
              className="link"
              style={fontstyles}
            >
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
            </Link>
            <Link
              to={"/main/" + props.auth.uid + "/ayuda-y-soporte/cupones"}
              className="link"
              style={fontstyles}
            >
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
            </Link>
            <Link
              to={"/main/" + props.auth.uid + "/ayuda-y-soporte/estadisticas"}
              className="link"
              style={fontstyles}
            >
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
            </Link>
            <Link
              to={"/main/" + props.auth.uid + "/ayuda-y-soporte/notificaciones"}
              className="link"
              style={fontstyles}
            >
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
            </Link>
            <Link
              to={"/main/" + props.auth.uid + "/ayuda-y-soporte/suscripciones"}
              className="link"
              style={fontstyles}
            >
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
            </Link>
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
