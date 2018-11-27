import React, { PureComponent } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { EnumToArray } from "../../../shared/Utils/enumToArray";
import { Team } from "../../../shared/model/team";
import { Location } from "../../../shared/model/location";
import axios from "axios";

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit
  },
  selectEmpty: {
    marginTop: theme.spacing.unit
  },
  root: {
    width: "500px",
    justifyContent: "space-between"
  },
  task: {
    flex: 1,
    flexDirection: "row",
    marginLeft: "20px",
    marginRight: "40px",
    marginBottom: "20px"
  },
  label: {
    marginRight: "20px"
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
    marginBottom: "20px"
  },
  button: {
    marginRight: "20px"
  }
});
class AddTeamDialog extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      teamName: "Select a Team",
      location: "Select a location",
      labelWidth: 0
    };
  }

  closeDialog = () => {
    this.props.close();
  };

  createTeam = () => {
    /*  Parameter as TeamId has to be generated at backend to uniquely identify every team.*/
    const teamData = {
      TeamName: this.state.teamName,
      TeamLogo: this.state.teamName,
      Location: this.state.location
    };
    axios
      .post("http://localhost:3000/addTeam", {
        teamData
      })
      .then(response => {
        window.location.reload();
      })
      .catch(error => {
        axios
          .post("http://localhost:3000/teams", {
            TeamName: this.state.teamName,
            TeamLogo: this.state.teamName,
            Location: this.state.location
          })
          .then(response => {
            window.location.reload();
          });
      });
    this.props.close();
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  getSelectValues = enums => {
    let values = EnumToArray.enumToArray(enums).map((result, index) => {
      return (
        <MenuItem key={index} value={result}>
          {result}
        </MenuItem>
      );
    });
    return values;
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.task}>
          <label className={classes.label}>Team Name </label>
          <Select
            value={this.state.teamName}
            onChange={this.handleChange}
            displayEmpty
            name="teamName"
            className={classes.selectEmpty}
          >
            {this.getSelectValues(Team)}
          </Select>
        </div>
        <div className={classes.task}>
          <label className={classes.label}>Location </label>
          <Select
            value={this.state.location}
            onChange={this.handleChange}
            displayEmpty
            name="location"
            className={classes.selectEmpty}
          >
            {this.getSelectValues(Location)}
          </Select>
        </div>

        <div className={classes.buttonGroup}>
          <Button
            variant="contained"
            className={classes.button}
            onClick={this.closeDialog}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.createTeam}
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AddTeamDialog);
