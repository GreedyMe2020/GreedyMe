import React from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ExitToAppRounded from "@material-ui/icons/ExitToAppRounded";
import AccountCircleRounded from "@material-ui/icons/AccountCircleRounded";
import { signOut } from "../redux/actions/authActions";
import { connect } from "react-redux";
import { Link } from "@reach/router";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginRight: "0.5rem",
  },
}));

function Perfil(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  /*  const [color, setColor] = React.useState(false);

  React.useEffect(() => {
    if (seleccionado === elementIndex) {
      setColor(true);
    } else {
      setColor(false);
    }
  }, [seleccionado]);

  const fontstyles = {
    color: color ? "#fd5f00" : "#868686",
  }; */

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (elementIndex) => (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    props.setSeleccionado(elementIndex);
    setOpen(false);
  };

  const handleCloseSesion = () => {
    props.signOut();
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <IconButton
        ref={anchorRef}
        aria-label="account of current user"
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        placement="bottom-end"
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList
              autoFocusItem={open}
              id="menu-list-grow"
              onKeyDown={handleListKeyDown}
            >
              <div className="icoPerfil">
                <ListItem>
                  <ListItemIcon className="iconPerfil">
                    <AccountCircleRounded fontSize="large" />
                  </ListItemIcon>
                  <div className="contNombrePlanUS">
                    <ListItemText
                      className="nombreComerc"
                      primary={props.profile.nombreComercio}
                    />
                    <p className="planPrem">Plan Premium</p>
                  </div>
                </ListItem>
              </div>
              <Divider variant="middle" />
              <div className="divider">
                <Link to="/main/:id/perfil" className="link">
                  <MenuItem className="link" onClick={handleClose(6)}>
                    Mi perfil
                  </MenuItem>
                </Link>
                <Link to="/main/:id/suscripciones" className="link">
                  <MenuItem className="link" onClick={handleClose(7)}>
                    Suscripciones
                  </MenuItem>
                </Link>
                <Link to="/main/:id/ayuda-y-soporte" className="link">
                  <MenuItem className="link" onClick={handleClose(8)}>
                    Ayuda y soporte técnico
                  </MenuItem>
                </Link>
              </div>
              <Divider variant="middle" />
              <div className="divider">
                <ListItem button>
                  <ListItemIcon>
                    <ExitToAppRounded />
                  </ListItemIcon>
                  <ListItemText
                    className="link"
                    onClick={handleCloseSesion}
                    primary="Cerrar sesión"
                  />
                </ListItem>
              </div>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    profile: state.firebase.profile,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Perfil);
