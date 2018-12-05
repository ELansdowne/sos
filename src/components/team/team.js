import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core";
import TeamPanel from "./team-panel/team-panel";
import axios from "axios";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
});

class Team extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamStatus: ""
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:3000/getStatus`)
      .then(result => {
        let filteredstatus = this.filterstatus(result.data);
        this.setState({ teamStatus: filteredstatus });
      })
      .catch(error => {
        axios.get("http://localhost:3000/status").then(result => {
          let filteredstatus = this.filterstatus(result.data);
          this.setState({ teamStatus: filteredstatus });
        })
      });
  };
  filterstatus(tStatus = []) {
    return tStatus.filter(
      teamStatus => teamStatus.TeamId === this.props.data.TeamId
    );
  }

  render() {
    let tStatus = null;
    if (this.state.teamStatus && this.state.teamStatus !== "") {
      this.state.teamStatus.map((team, index) => {
        tStatus = team.status;
      });
    }

    let color;
    switch (tStatus) {
      case "Green":
        color = "#55ce55";
        break;
      case "Amber":
        color = "#FFBF00";
        break;
      case "Red":
        color = "#fb4141";
        break;
      default:
        color = "white";
        break;
    }
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} style={{ background: color }}>
          <Typography className={styles.heading}>
            {this.props.data.TeamName}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <TeamPanel data={this.props.data} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default withStyles(styles)(Team);
