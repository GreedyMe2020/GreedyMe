import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { InicioSesion } from "./components/Registro/InicioSesion";
import { Router } from "@reach/router";
import { Registro } from "./pages/Registro";
import { Principal } from "./pages/Principal";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Landing path="/" />
        <Registro path="/login" />
        <Principal path="/main/:id" />
      </Router>
    </div>
  );
}; //EL :ID HACE REFERENCIA AL ID DE USUARIO COMERCIO QUE ASIGNEMOS A CADA UNO.

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
