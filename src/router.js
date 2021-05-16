import React from "react";
import Home from "./home";
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from "./login";
import Register from "./register";

export default function Router() {
  return (
    <div>
      <BrowserRouter basename="/">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
