import React from "react";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { signIn } from "../../redux/actions/authActions";
import { Redirect } from "@reach/router";

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

  if (props.auth.uid) return <Redirect to={"/main/" + props.auth.uid} />;
  return (
    <div className="container">
      <div className="login-container">
        <h2>Registrarse</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            className="email"
            name="email"
            onChange={handleChange}
          ></input>
          <input
            type="password"
            placeholder="Contraseña"
            className="contraseña"
            name="contraseña"
            onChange={handleChange}
          ></input>
          <input
            type="submit"
            className="submit"
            value="Iniciar Sesión"
          ></input>
        </form>
        {props.authError ? <p>Le erraste en la contraseña o el mail</p> : null}
      </div>
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
