import React, { useState } from "react";
import { MyModalWithGrid } from "./Modal";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { useTheme } from "@material-ui/core/styles";
import ModalPromociones from "../components/Promociones/modalPromociones";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  cruz: {
    position: "absolute",
    right: theme.spacing(1),
    top: "8px",
    color: theme.palette.grey[500],
  },
}));

export default function ModalPromos(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const classes = useStyles();
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("md");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="prom-title-container">
        <h1>Mis promociones</h1>
        <div className="icoNuevaProm">
          <Button
            variant="contained"
            onClick={handleClickOpen}
            id="cargar-promosubmit"
          >
            Nueva promoción
          </Button>
        </div>
      </div>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="dialog-title-prom">
          <h5>Cargar un nuevo beneficio</h5>
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
          <DialogContentText>
            <ModalPromociones />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function ModalPromosActualizar(props) {
  const theme = useTheme();
  const classes = useStyles();
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("md");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="dialog-title-prom">
          <h5>Cargar un nuevo beneficio</h5>
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
          <DialogContentText>
            <ModalPromociones crear={props.crear} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
