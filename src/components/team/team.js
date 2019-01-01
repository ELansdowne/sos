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
    width: "100%",
    padding: "0px"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  expanded: {
    "&$expanded": {
      minHeight: 0,
      marginTop: 0,
      marginBottom: 0
    }
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
      .get(`http://localhost:3000/getTeam`)
      .then(result => {
        let filteredstatus = this.filterstatus(result.data);
        this.setState({ teamStatus: filteredstatus });
      })
      .catch(error => {
        axios.get("http://localhost:3000/teams").then(result => {
          let filteredstatus = this.filterstatus(result.data);
          this.setState({ teamStatus: filteredstatus });
        });
      });
  }
  filterstatus(tStatus = []) {
    return tStatus.filter(
      teamStatus => teamStatus.TeamId === this.props.data.TeamId
    );
  }

  render() {
    const { classes } = this.props;
    let tStatus = null;
    if (this.state.teamStatus && this.state.teamStatus !== "") {
      this.state.teamStatus.map((team, index) => {
        tStatus = team.status;
      });
    }

    let color;
    switch (tStatus) {
      case "Green":
        color = "rgb(123, 234, 123)";
        break;
      case "Amber":
        color = "rgb(241, 200, 78)";
        break;
      case "Red":
        color = "rgb(245, 94, 94)";
        break;
      default:
        color = "white";
        break;
    }
    return (
      <ExpansionPanel classes={{ expanded: classes.expanded }} defaultExpanded>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          style={{ background: color }}
          classes={{ expanded: classes.expanded }}
        >
          <Typography
            className={styles.heading}
            style={{ textTransform: "capitalize" }}
          >
            {this.props.data.TeamName}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.root}>
          <TeamPanel
            data={this.props.data}
            sprint={this.props.sprint}
            release={this.props.release}
            team={this.props.team}
            location={this.props.location}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default withStyles(styles)(Team);
