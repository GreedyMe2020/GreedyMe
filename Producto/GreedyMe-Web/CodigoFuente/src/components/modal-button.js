import React, { useState } from "react";
import { MyModalWithGrid } from "./Modal";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import CargaPromociones from "../components/Promociones/cargaPromociones";

export const ModalButton = ({ children }) => {
  const [modalShow, setModalShow] = useState(false);

  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);

  return (
    <div>
      <Button className="btn-round" variant="primary" onClick={handleShow}>
        {children}
      </Button>
      <MyModalWithGrid show={modalShow} onHide={handleClose} />
    </div>
  );
};

export default function ModalPromos() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="btnModalProm">
        <Button
          className="fabIconAdd"
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
        >
          Cargar promoción
        </Button>
        <Fab
          className="fabIconAdd"
          color="secondary"
          aria-label="add"
          onClick={handleClickOpen}
        >
          <AddIcon />
        </Fab>
      </div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Cargar nueva promoción"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <CargaPromociones />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cerrar
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cargar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
