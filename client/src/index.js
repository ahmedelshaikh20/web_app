import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import Login from "views/Login/Login";
import Forgot from "views/Login/Reset1";
import nowReset from "views/Login/Reset2";

import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
    <Route path ="/"  exact component={Login} />
    <Route path ="/forgotPassword"  exact component={Forgot} />
    <Route path="/resetpasswordnow/:token" exact component={nowReset} />
      <Route path="/admin" component={Admin} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
