import React, { Component } from "react";
import Aux from "../../hoc/Auxi";
import Header from "../../components/header/header";
import AddTeam from "../../containers/add-team/add-team";
import Teams from "../../containers/teams/teams";
import styles from "./Dashboard.module.css";

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sprint: null,
      release: null
    };
  }
  getSprint = sprint => {
    this.setState({ sprint: sprint });
  };
  getRelease = release => {
    this.setState({ release: release });
  };

  render() {
    return (
      <Aux>
        <Header
          className={styles.header}
          sprint={this.getSprint}
          release={this.getRelease}
        />
        <div className={styles.dashboard}>
          <AddTeam />
          <Teams sprint={this.state.sprint} release={this.state.release} />
        </div>
      </Aux>
    );
  }
}

export default Dashboard;
