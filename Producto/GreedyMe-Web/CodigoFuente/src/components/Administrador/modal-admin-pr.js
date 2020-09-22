import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { useTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, fade } from "@material-ui/core/styles";
import FormCrearUsuario from "./Comercios/FormCrearUsuario";

const useStyles = makeStyles((theme) => ({
  cruz: {
    position: "absolute",
    right: theme.spacing(1),
    top: "8px",
    color: theme.palette.grey[500],
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.7),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 1),
    },
    width: "50%",
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
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "16ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));

export default function ModalAdministradorPr(props) {
  //Estados para ver si esta abierto o cerrado el dialogo del primero y segundo componente
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const theme = useTheme();
  const classes = useStyles();
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("xs");

  //Funciones para abrir o cerrar el primer dialogo
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //Funciones para abrir o cerrar el segundo dialogo
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  return (
    <div>
      <div className="prom-title-container">
        <h1>{props.title}</h1>
      </div>
      <div id="subtitulo-container">
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder={props.placeholder}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
            defaultValue={props.text}
            onChange={props.onChange}
          />
        </div>
        <div className="icoNuevaProm">
          <Button
            variant="contained"
            onClick={handleClickOpen}
            id="btn-azul"
            className="modal-admin-btn"
          >
            {props.button}
          </Button>
          <Button variant="contained" onClick={handleClickOpen2} id="btn-azul">
            {props.button2}
          </Button>
        </div>
      </div>
      {/* Dialogo del primer componente a abrir */}

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="dialog-title-prom">
          <h5>{props.titleModal}</h5>
          <IconButton
            aria-label="close"
            id="btn"
            className={classes.cruz}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>{props.openContent}</DialogContentText>
        </DialogContent>
      </Dialog>

      {/* Dialogo del segundo componente a abrir */}
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open2}
        onClose={handleClose2}
      >
        <DialogTitle id="dialog-title-prom">
          <h5>{props.titleModal2}</h5>
          <IconButton
            aria-label="close"
            id="btn"
            className={classes.cruz}
            onClick={handleClose2}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>{props.openContent2}</DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
