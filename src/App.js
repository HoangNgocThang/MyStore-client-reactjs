import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BaseCartScreen from "./screens/CartScreen";
import BaseHomeScreen from "./screens/HomeScreen";
import BaseLoginScreen from "./screens/LoginScreen";
import BaseOrderScreen from "./screens/OrderScreen";
import BaseRegisterScreen from "./screens/RegisterScreen";
import BaseAccountScreen from './screens/AccountScreen';
import BaseTestScreen from "./screens/TestScreen";
import BaseDetailProductScreen from "./screens/DetailProductScreen";
import './App.css';
import { Navbar, NavDropdown, Form, FormControl, Nav, Button } from 'react-bootstrap';

export default function App() {
  return (
    <Router>
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">My-Store</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route path="/:slugCategory/:slugProduct/:idProduct">
            <BaseDetailProductScreen />
          </Route>
          <Route path="/test">
            <BaseTestScreen />
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