import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { Provider } from "react-redux";
import store from "./redux/store";
import { InicioSesion } from "./components/Registro/InicioSesion";
import { Router } from "@reach/router";
import { Registro } from "./pages/Registro";


const App = () => {
  return (
    <div className="App">
      <Router>
        <Landing path="/" />
        <Registro path="/login" />
      </Router>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
