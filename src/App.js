import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BaseCartScreen from "./screens/CartScreen";
import BaseHomeScreen from "./screens/HomeScreen";
import BaseLoginScreen from "./screens/LoginScreen";
import BaseRegisterScreen from "./screens/RegisterScreen";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>

          <Route path="/login">
            <BaseLoginScreen />
          </Route>
          <Route path='/cart'>
            <BaseCartScreen />
          </Route>
          <Route path='/register'>
            <BaseRegisterScreen />
          </Route>
          <Route path="/">
            <BaseHomeScreen />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}