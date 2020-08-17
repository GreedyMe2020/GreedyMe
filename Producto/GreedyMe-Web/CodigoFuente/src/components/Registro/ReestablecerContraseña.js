import React from "react";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { forgotPass } from "../../redux/actions/authActions";
import { Redirect } from "@reach/router";

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

  if (props.mandoMail) return <Redirect to="/login" />;
  if (props.auth.uid) return <Redirect to={"/main/" + props.auth.uid} />;
  return (
    <div className="container">
      <div className="login-container">
        <h2>Reestablece tu contraseña</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            className="email"
            name="email"
            onChange={handleChange}
          ></input>
          <input
            type="submit"
            className="submit"
            value="Reestablecer Contraseña"
          ></input>
        </form>
        {props.mailError ? <p>Email invalido, ingresalo nuevamente</p> : null}
      </div>
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReestablecerContraseña);
