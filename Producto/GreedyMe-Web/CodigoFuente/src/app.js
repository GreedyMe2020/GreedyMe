import React from "react";
import ReactDOM from "react-dom";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { Provider } from "react-redux";
import store from "./redux/store";

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
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
