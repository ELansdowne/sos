import React, { Component } from "react";
import Aux from "../../hoc/Auxi";
import Header from "../../components/header/header";
import AddTeam from "../../containers/add-team/add-team";
import Teams from "../../containers/teams/teams";
import styles from "./Dashboard.module.css";

export class Dashboard extends Component {
  render() {
    return (
      <Aux>
        <Header className={styles.header} />
        <div className={styles.dashboard}>
          <AddTeam />
          <Teams />
        </div>
      </Aux>
    );
  }
}

export default Dashboard;
