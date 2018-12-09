import React, { PureComponent } from "react";
import Aux from "../../hoc/Auxi";
import Team from "../../components/team/team";
import teams from "../../assets/localDB/teams.json";
import axios from "axios";
import { Location } from "../../shared/model/location";

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

  componentWillReceiveProps(nextProps) {
    console.log("receiveprops in teams", nextProps);
    if (nextProps.team || nextProps.location) {
      console.log("inside non null");
      this.getTeams();
    }
  }
  filterTeams(teams = []) {
    console.log("inside filterteams", teams, this.props);
    return teams.filter(team => team.TeamName === this.props.team);
  }

  filterLocation(teams = []) {
    console.log("inside filterteams", teams, this.props);
    return teams.filter(team => team.Location === this.props.location);
  }
  getTeams() {
    let filteredTeams = [];
    axios
      .get(`http://localhost:3000/getTeam`)
      .then(res => {
        this.setState({ teamData: res.data });
      })
      .catch(error => {
        axios
          .get("http://localhost:3000/teams") //using json-server dependency for local json .. check db.json file for local data.
          .then(result => {
            let teams = result.data;
            console.log("yaya", this.props.team);
            if (this.props.team) {
              teams = this.filterTeams(teams);
              if (this.props.team === "All") {
                teams = result.data;
              }
            }
            if (this.props.location) {
              teams = this.filterLocation(teams);
              if (this.props.location === Location.ALL) {
                teams = result.data;
              }
            }
            this.setState({ teamData: teams });
          })
          .catch(error => {
            this.setState({ teamData: teams });
          });
      });
  }
  render() {
    console.log("props in team", this.props);
    let teamData = null;
    if (this.state.teamData) {
      teamData = this.state.teamData.map((team, index) => {
        return (
          <Team
            key={index}
            data={team}
            sprint={this.props.sprint}
            release={this.props.release}
          />
        );
      });
    }
    return <Aux>{teamData}</Aux>;
  }
}

export default Teams;
