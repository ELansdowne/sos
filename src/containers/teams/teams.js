import React, { PureComponent } from "react";
import Aux from "../../hoc/Auxi";
import Team from "../../components/team/team";
import teams from "../../assets/localDB/teams.json";
import axios from "axios";

export class Teams extends PureComponent {
  constructor() {
    super();
    this.state = {
      teamData: null
    };
  }
  componentDidMount() {
    this.getTeams();
  }
  getTeams() {
    axios
      .get(`http://localhost:3000/teams`)
      .then(res => {
        this.setState({ teamData: res.data });
      })
      .catch(error => {
        axios
          .get("http://localhost:3000/teams") //using json-server dependency for local json .. check db.json file for local data.
          .then(result => {
            this.setState({ teamData: result.data });
          })
          .catch(error => {
            this.setState({ teamData: teams });
          });
      });
  }
  render() {
    let teamData = null;
    if (this.state.teamData) {
      teamData = this.state.teamData.map((team, index) => {
        return <Team key={index} data={team} sprint={this.props.sprint} />;
      });
    }
    return <Aux>{teamData}</Aux>;
  }
}

export default Teams;
