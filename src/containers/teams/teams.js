import React, { PureComponent } from "react";
import Aux from "../../hoc/Auxi";
import Team from "../../components/team/team";
import teams from "../../assets/localDB/teams.json";

export class Teams extends PureComponent {
  componentDidMount() {
    console.log("local rteam", teams);
  }
  render() {
    console.log(teams);
    let teamData = null;
    if (teams) {
      teamData = teams.map((team, index) => {
        return <Team key={index} data={team} />;
      });
    }
    return <Aux>{teamData}</Aux>;
  }
}

export default Teams;
