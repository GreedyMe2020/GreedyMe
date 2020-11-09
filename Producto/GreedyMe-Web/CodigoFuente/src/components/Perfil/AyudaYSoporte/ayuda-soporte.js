import * as React from "react";
import { Link } from "@reach/router";
import { connect } from "react-redux";
import { Card, CardContent, CardActions, Typography } from "@material-ui/core";
import CardAyuda from "./card-ayuda";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export function AyudaYSoporte() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="prom-title-container">
        <h1>Ayuda y soporte técnico</h1>
      </div>
      <div className="contenedor-ayuda-todo">
        <div className="card-ayuda">
          <CardAyuda />
        </div>
        <div className="img-ayuda">
          <img src={require("../../../../Multimedia/Sistema-svg/ayuda.svg")} />
        </div>
        <div className="card-ponte-contacto">
          <Card className="contenedor-card-ayuda">
            <CardContent className="contacto-ayuda">
              <h6>¿No encontraste lo que buscabas? </h6>
              <Typography className="contacto-texto">
                Ponte en contacto con nuestro centro de soporte técnico.
              </Typography>
              <CardActions
                style={{
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="outlined"
                  style={{
                    color: "white",
                    borderColor: "white",
                  }}
                  onClick={handleClickOpen}
                >
                  Enviar consulta
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle
                    id="form-dialog-title"
                    style={{ marginBottom: "-10px" }}
                  >
                    Ayuda y soporte técnico
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Envianos tu consulta y a la brevedad nos contactaremos
                    </DialogContentText>
                    <TextField
                      id="text-input"
                      label="Consulta"
                      style={{ marginTop: "5px" }}
                      multiline
                      rows={4}
                      variant="outlined"
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleClose}
                      color="black"
                      style={{ marginRight: 10 }}
                    >
                      Enviar
                    </Button>
                  </DialogActions>
                </Dialog>
              </CardActions>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(AyudaYSoporte);
