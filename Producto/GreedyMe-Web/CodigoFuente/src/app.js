import React from "react";
import ReactDOM from "react-dom";
import CardInfo from "./CardInfo";
import { Router } from "@reach/router";

const App = () => {
  return (
    <div>
      <header>Hola</header>
      <Router>
        <CardInfo path="/" />
      </Router>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
