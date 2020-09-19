import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Router } from "@reach/router";
import { Registro } from "./pages/Registro";
import Principal from "./pages/Principal";
import Promociones from "./pages/Promociones";
import { OlvidoContraseña } from "./pages/OlvidoContraseña";
import PerfilComercio from "./pages/PerfilComercio";
import CambiarContraseña from "./pages/CambiarContraseña";
import { SnackbarProvider } from "notistack";
import Administrador from "./pages/Administrador";
//<Promociones path="/main/:id/promociones" />
const App = () => {
  return (
    <div className="App">
      <Router>
        <Landing path="/" />
        <Registro path="/login" />
        <Principal path="/main/:id" />
        <Promociones path="/main/:id/promociones" />
        <OlvidoContraseña path="/forgotpassword" />
        <PerfilComercio path="/main/:id/profile" />
        <CambiarContraseña path="/main/:id/newpassword" />
        <Administrador path="/admin" />
      </Router>
    </div>
  );
}; //EL :ID HACE REFERENCIA AL ID DE USUARIO COMERCIO QUE ASIGNEMOS A CADA UNO.
store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <SnackbarProvider>
            <App />
          </SnackbarProvider>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
});
