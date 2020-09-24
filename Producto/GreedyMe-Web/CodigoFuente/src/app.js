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
import MainPage from "./components/Principal/mainPage";

//<Promociones path="/main/:id/promociones" />
const App = () => {
  return (
    <div className="App">
      <Router>
        <Landing path="/" />
        <Registro path="login" />
        <Principal path="main/:id">
          <MainPage path="/*" />
        </Principal>
        <OlvidoContraseña path="forgotpassword" />
        {/*<CambiarContraseña path="/main/:id/newpassword" /> */}
        <Administrador path="admin">
          <MainPage path=":adminId" />
        </Administrador>
      </Router>
    </div>
  );
}; //EL :ID HACE REFERENCIA AL ID DE USUARIO COMERCIO QUE ASIGNEMOS A CADA UNO.
store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );
});
