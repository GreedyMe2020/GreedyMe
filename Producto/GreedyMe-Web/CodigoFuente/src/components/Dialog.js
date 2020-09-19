import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function DialogComponent({
  open,
  setOpen,
  handleClose,
  eliminar,
  setEliminar,
  setEliminada,
  setCurrentId,
  title,
  text,
  btnText,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setOpen(false);
          }}
          color="primary"
        >
          Cancelar
        </Button>
        <Button
          onClick={() => {
            setCurrentId(eliminar);
            setOpen(false);
            setEliminar(null);
            setEliminada(true);
          }}
          color="secondary"
          autoFocus
        >
          {btnText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
