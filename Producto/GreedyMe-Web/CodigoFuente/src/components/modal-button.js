import React, { useState } from "react";
import { MyModalWithGrid } from "./Modal";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import ModalPromociones from "../components/Promociones/modalPromociones";

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
            id="cargar-promo-submit"
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
        aria-labelledby="responsive-dialog-title"
      >
        {/* <DialogTitle id="responsive-dialog-title">
          {"Cargar nueva promoción"}
        </DialogTitle> */}
        <DialogContent>
          <DialogContentText>
            <ModalPromociones />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
