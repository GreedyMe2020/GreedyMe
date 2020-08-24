import React from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { forgotPass } from "../../redux/actions/authActions";
import { Redirect } from "@reach/router";
import Button from "@material-ui/core/Button";
import { Card } from "react-bootstrap";
import Grid from "@material-ui/core/Grid";

function ReestablecerContraseña(props) {
  const [formData, setFormData] = React.useState({
    email: "",
  });

  const handleChange = (event) => {
    formData[event.target.name] = event.target.value;
    setFormData({ ...formData });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.forgotPass(formData);
  };

  const form = React.createRef();
  if (props.mandoMail) return <Redirect to="/login" />;
  if (props.auth.uid) return <Redirect to={"/main/" + props.auth.uid} />;
  return (
    <>
      <div className="nav-container">
        <nav>
          <div id="titulo">
            <h1 className="gre">gre</h1>
            <h1 className="edy">edy</h1>
            <h1 className="me">me</h1>
          </div>
        </nav>
      </div>
      <ValidatorForm ref={form} onSubmit={handleSubmit} id="validator-form">
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Reestablece tu Contraseña</Card.Title>
            <Grid item xs={12} md={6}>
              <TextValidator
                label="Email"
                variant="standard"
                onChange={handleChange}
                name="email"
                value={formData.email}
                validators={["required", "isEmail"]}
                errorMessages={[
                  "*Este campo es obligatorio",
                  "El email no es válido",
                ]}
              />
              <Button
                variant="outlined"
                className="mt-3 text-right"
                color="secondary"
                onClick={handleSubmit}
              >
                Reestablece tu contraseña
              </Button>
              {props.mailError ? (
                <p className="text-danger">
                  Email invalido, ingresalo nuevamente
                </p>
              ) : null}
            </Grid>
          </Card.Body>
        </Card>
      </ValidatorForm>
    </>
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReestablecerContraseña);
