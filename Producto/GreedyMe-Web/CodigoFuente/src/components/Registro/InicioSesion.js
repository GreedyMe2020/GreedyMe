import React from "react";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";
//import { loginUsuario } from "../firebase/registroUsuario";
import { Usuario } from "./Usuario";

export function InicioSesion() {
  const [formData, setFormData] = React.useState({
    usuario: "",
    contraseña: "",
  });

  return (
    <div className="container">
      <div className="login-container">
        <h2>Registrarse</h2>
        <form action="">
          <input type="text" placeholder="Usuario" className="usuario"></input>
          <input
            type="password"
            placeholder="Contraseña"
            className="contraseña"
          ></input>
          <input
            type="submit"
            className="submit"
            value="Iniciar Sesión"
            onSubmit={<Usuario />}
          ></input>
        </form>
      </div>
    </div>
  );
}

/*const handleChange = (event) => {
    loginData[event.target.name] = event.target.value;
    setLoginData({ ...loginData });
  };

  const handleLogin = () => {
    setLogin({ login: true }, () => {
      setTimeout(() => setLogin({ login: false }), 5000);
    });

    validarLogin(loginData);
  };

  const validarLogin = async (loginData) => {
    return await ingresoLogin(loginData); //IMPORTAR DESDE FIREBASE VER.
  };*/
