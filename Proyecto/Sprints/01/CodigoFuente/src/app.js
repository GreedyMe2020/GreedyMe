import React from "react";
import ReactDOM from "react-dom";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Landing } from "./pages/Landing";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing} />
      </Switch>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
