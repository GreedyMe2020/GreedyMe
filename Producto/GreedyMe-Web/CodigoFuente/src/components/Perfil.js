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
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginRight: "0.5rem",
  },
}));

export function Perfil() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
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
                  <ListItemIcon>
                    <AccountCircleRounded fontSize="large" />
                  </ListItemIcon>
                  <ListItemText primary="Nombre" />
                </ListItem>
              </div>
              <Divider variant="middle" />
              <div className="divider">
                <MenuItem onClick={handleClose}>Mi perfil</MenuItem>
                <MenuItem onClick={handleClose}>Suscripciones</MenuItem>
                <MenuItem onClick={handleClose}>
                  Ayuda y soporte técnico
                </MenuItem>
              </div>
              <Divider variant="middle" />
              <div className="divider">
                <ListItem button>
                  <ListItemIcon>
                    <ExitToAppRounded />
                  </ListItemIcon>
                  <ListItemText onClick={handleClose} primary="Cerrar sesión" />
                </ListItem>
              </div>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </div>
  );
}