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
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

function InicioSesion(props) {
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChangePass = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.signIn(values);
  };

  const form = React.createRef();

  if (props.auth.uid) return <Redirect to={"/main/" + props.auth.uid} />;

  return (
    <div>
      <div className="nav-container">
        <nav>
          <div id="titulo">
            <h1 className="gre">gre</h1>
            <h1 className="edy">edy</h1>
            <h1 className="me">me</h1>
          </div>
        </nav>
      </div>

      <section className="contenedor-inicio">
        <ValidatorForm ref={form} onSubmit={handleSubmit} id="validator-form">
          <Card id="inicio-sesion">
            <Card.Body id="inicio-sesion-body">
              <Card.Title id="inicio-sesion-title">Iniciar Sesión</Card.Title>
              <Grid item xs={12} md={12}>
                <TextValidator
                  required
                  label="Email"
                  variant="outlined"
                  fullWidth
                  onChange={handleChangePass("email")}
                  name="email"
                  value={values.email}
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    "*Este campo es obligatorio",
                    "El email no es válido",
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl
                  id="inicio-sesion-contraseña"
                  label="Contraseña"
                  variant="outlined"
                  type="password"
                  fullWidth
                  name="contraseña"
                  validators={["required"]}
                  errorMessages={["*Este campo es obligatorio"]}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Contraseña
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChangePass("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={85}
                  />
                </FormControl>
              </Grid>
              <div className="check-container">
                <FormControlLabel
                  id="inicio-sesion-recuerdame"
                  control={
                    <Checkbox
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                      checkedIcon={<CheckBoxIcon fontSize="small" />}
                      name="checkedI"
                    />
                  }
                  label="Recuérdame"
                />
                <Typography
                  id="inicio-sesion-password"
                  color="textSecondary"
                  gutterBottom
                >
                  <Link to="/forgotpassword">Olvidé mi contraseña</Link>
                </Typography>
              </div>
              <div className="contenedor-submit">
                <Button
                  variant="outlined"
                  className="mt-3 text-right"
                  id="inicio-sesion-button"
                  color="secondary"
                  onClick={handleSubmit}
                >
                  Iniciar sesión
                </Button>
                {props.authError ? (
                  <p className="text-danger">
                    Todos los campos deben ser completados
                  </p>
                ) : null}
              </div>
            </Card.Body>
          </Card>
        </ValidatorForm>
      </section>
    </div>
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
