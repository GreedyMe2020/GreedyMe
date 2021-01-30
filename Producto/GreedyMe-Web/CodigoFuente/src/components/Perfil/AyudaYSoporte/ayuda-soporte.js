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
import {enviarConsulta} from "../../../redux/actions/comActions";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function AyudaYSoporte(props) {
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [datos, setDatos] = React.useState({
    email: props.profile.email,
    nombreComercio: props.profile.nombreComercio,
    consulta: ""
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = () => {
    setOpen(false);
    props.enviarConsulta(datos);
    setOpenAlert(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleChange = (event) => {
    datos[event.target.name] = event.target.value;
    setDatos({ ...datos });
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
                      name="consulta"
                      style={{ marginTop: "5px" }}
                      multiline
                      onChange={handleChange}
                      rows={4}
                      variant="outlined"
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
                  <Button
                      onClick={handleClose}
                      color="red"
                      style={{ marginRight: 10 }}
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleSubmit}
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
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            open={openAlert}
            autoHideDuration={8000}
            onClose={handleCloseAlert}
            >
            <Alert onClose={handleCloseAlert} severity="success">
              La consulta se ha enviado. En breve nos contactaremos!
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    enviarConsulta: (datos) => dispatch(enviarConsulta(datos)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AyudaYSoporte);
