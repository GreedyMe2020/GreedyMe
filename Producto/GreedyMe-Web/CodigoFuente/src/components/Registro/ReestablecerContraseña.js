import React from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { forgotPass, resetearValoresReestablecerContraseña,  resetearValorReestablecerContraseña} from "../../redux/actions/authActions";
import { Redirect } from "@reach/router";
import Button from "@material-ui/core/Button";
import { Card } from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Link } from "@reach/router";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ReestablecerContraseña(props) {
  const [formData, setFormData] = React.useState({
    email: "",
  });
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChange = (event) => {
    formData[event.target.name] = event.target.value;
    setFormData({ ...formData });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.forgotPass(formData);
    formData.email = ""
    props.resetearValorReestablecerContraseña()
    
  };

  const abrirCarteldeConfirmacion = React.useEffect(() => {
    if(props.mandoMail !== null){
      setOpen(true);
      props.resetearValoresReestablecerContraseña()
    }
  },[props.mandoMail] )

  const form = React.createRef();

  if (props.auth.uid) return <Redirect to={"/main/" + props.auth.uid} />;
  return (
    <div className="reestablecer-contra-container">
      <div className="nav-container">
        <nav>
          <Link
            to={"/"}
            className="link"
          >
            <div id="titulo">
              <h1 className="gre">gre</h1>
              <h1 className="edy">edy</h1>
              <h1 className="me">me</h1>
            </div>   
          </Link>
        </nav>
      </div>

      <section className="contenedor-inicio-contra">
        <Card className="reestablecer-contraseña-card">
          <Card.Body className="reestablecer-contraseña-body">
            <Card.Title id="reestablecer-contraseña-title">
              ¿Olvidaste tu contraseña?
            </Card.Title>
            <span>
              Ingresá tu correo electrónico y te enviaremos un link para
              gestionar tu contraseña.
            </span>
            <ValidatorForm
              ref={form}
              onSubmit={handleSubmit}
              id="contraseña-validator-form"
            >
              <Grid item xs={12} md={12}>
                <TextValidator
                  fullWidth
                  label="Email"
                  variant="outlined"
                  onChange={handleChange}
                  name="email"
                  value={formData.email}
                  required
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    "*Este campo es obligatorio",
                    "El email no es válido",
                  ]}
                />
              </Grid>
              <div className="contenedor-submit">
                <Button
                  variant="outlined"
                  className="mt-3 text-right"
                  color="secondary"
                  id="reestablecer-contraseña-submit"
                  type="submit"
                >
                  Recuperar cuenta
                </Button>
                {props.mailError ? (
                  <p className="text-danger">
                    Email inválido, ingresalo nuevamente
                  </p>
                ) : (
                  <Snackbar
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    open={open}
                    autoHideDuration={8000}
                    onClose={handleClose}
                  >
                    <Alert onClose={handleClose} severity="success">
                      Email enviado correctamente
                    </Alert>
                  </Snackbar>
                )}
              </div>
            </ValidatorForm>
          </Card.Body>
        </Card>
      </section>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    mailError: state.auth.mailError,
    mandoMail: state.auth.mandoMail,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    forgotPass: (user) => dispatch(forgotPass(user)),
    resetearValoresReestablecerContraseña: () => dispatch(resetearValoresReestablecerContraseña()),
    resetearValorReestablecerContraseña: () => dispatch(resetearValorReestablecerContraseña()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReestablecerContraseña);
