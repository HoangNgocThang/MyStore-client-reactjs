import React from "react";
import { BrowserRouter as Router, Switch, Route ,  useRouteMatch,} from "react-router-dom";
import BaseCartScreen from "./screens/CartScreen";
import BaseHomeScreen from "./screens/HomeScreen";
import BaseLoginScreen from "./screens/LoginScreen";
import BaseOrderScreen from "./screens/OrderScreen";
import BaseRegisterScreen from "./screens/RegisterScreen";
import BaseAccountScreen from './screens/AccountScreen';
import BaseTestScreen from "./screens/TestScreen";
import BaseDetailProductScreen from "./screens/DetailProductScreen";


export default function App() {
  //let match = useRouteMatch();
  return (
    <Router>
      <div className="App">
        <Switch>
         <Route path="/:slugCategory/:slugProduct">
            <BaseDetailProductScreen />
          </Route>
          <Route path="/test">
            <BaseTestScreen/>
          </Route>
          <Route path="/login">
            <BaseLoginScreen />
          </Route>
          <Route path='/cart'>
            <BaseCartScreen />
          </Route>
          <Route path='/register'>
            <BaseRegisterScreen />
          </Route>
          <Route path="/order">
            <BaseOrderScreen />
          </Route>
          <Route path="/account">
            <BaseAccountScreen />
          </Route>
          <Route path="/">
            <BaseHomeScreen />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}