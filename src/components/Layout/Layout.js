import * as React from "react";
import Aux from "../../hoc/Auxi";
import Dashboard from "../../containers/Dashboard/Dashboard";
const Layout = props => (
  <Aux>
    <Dashboard />
    <main>{props.children}</main>
  </Aux>
);
export default Layout;
