import React from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { signIn } from "../../redux/actions/authActions";
import { Redirect, Link } from "@reach/router";
import { Card } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Grid from "@material-ui/core/Grid";

function InicioSesion(props) {
  const [formData, setFormData] = React.useState({
    email: "",
    contraseña: "",
  });

  const handleChange = (event) => {
    formData[event.target.name] = event.target.value;
    setFormData({ ...formData });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.signIn(formData);
  };

  const form = React.createRef();

  if (props.auth.uid) return <Redirect to={"/main/" + props.auth.uid} />;

  return (
    <ValidatorForm ref={form} onSubmit={handleSubmit} id="validator-form">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Iniciar Sesión</Card.Title>
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
          </Grid>
          <Grid item xs={12} md={6}>
            <TextValidator
              label="Contraseña"
              variant="standard"
              type="password"
              onChange={handleChange}
              name="contraseña"
              value={formData.contraseña}
              validators={["required"]}
              errorMessages={["*Este campo es obligatorio"]}
            />
          </Grid>
          <Typography color="textSecondary" gutterBottom>
            <Link to="/forgotpassword">Olvidé mi contraseña</Link>
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                name="checkedI"
              />
            }
            label="Recuérdame"
          />
          <Button
            variant="outlined"
            className="mt-3 text-right"
            color="secondary"
            onClick={handleSubmit}
          >
            Iniciar sesión
          </Button>
          {props.authError ? (
            <p className="text-danger">Los datos ingresados son incorrectos</p>
          ) : null}
        </Card.Body>
      </Card>
    </ValidatorForm>
  );
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (user) => dispatch(signIn(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InicioSesion);
