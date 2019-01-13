import React, { PureComponent } from "react";
import Aux from "../../hoc/Auxi";
import Team from "../../components/team/team";
import teams from "../../assets/localDB/teams.json";
import axios from "axios";
import { Location } from "../../shared/model/location";
import { Team as TeamConst } from "../../shared/model/team";
import { ServiceConfig } from "../../shared/Utils/service-config";

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
    if (nextProps.team || nextProps.location) {
      this.getTeams();
    }
  }
  filterTeams(teams = []) {
    return teams.filter(team => team.teamName === this.props.team);
  }

  filterLocation(teams = []) {
    return teams.filter(team => team.Location === this.props.location);
  }
  getTeams() {
    axios
      .get(`${ServiceConfig.prodUrl}/teams`)
      .then(result => {
        let teams = result.data.result;
        if (this.props.team) {
          teams = this.filterTeams(teams);
          if (this.props.team === TeamConst.None) {
            teams = result.data.result;
          }
        }
        if (this.props.location) {
          teams = this.filterLocation(teams);
          if (this.props.location === Location.None) {
            teams = result.data.result;
          }
        }
        this.setState({ teamData: teams });
      })
      .catch(error => {
        axios
          .get("http://localhost:3000/teams") //using json-server dependency for local json .. check db.json file for local data.
          .then(result => {
            let teams = result.data;
            if (this.props.team) {
              teams = this.filterTeams(teams);
              if (this.props.team === TeamConst.None) {
                teams = result.data;
              }
            }
            if (this.props.location) {
              teams = this.filterLocation(teams);
              if (this.props.location === Location.None) {
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
