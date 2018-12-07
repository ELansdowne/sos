import React, { Component } from "react";
import "./App.css";
import Aux from "./hoc/Auxi";
import { Switch, Redirect, Route } from "react-router";
import Layout from "./components/Layout/Layout";
import Dashboard from "./containers/Dashboard/Dashboard";

class App extends Component {
  render() {
    return (
      <Aux>
        <Route exact path={"/"} component={Dashboard} />
      </Aux>
    );
  }
}

export default App;
