import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BaseCartScreen from "./screens/CartScreen";
import BaseHomeScreen from "./screens/HomeScreen";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path='/cart'>
            <BaseCartScreen />
          </Route>
          <Route path="/">
            <BaseHomeScreen />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}