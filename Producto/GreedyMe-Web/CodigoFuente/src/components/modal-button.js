import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { MyModalWithGrid } from "./Modal";

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
