import React, { PureComponent } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { EnumToArray } from "../../../shared/Utils/enumToArray";
// import { Team } from "../../../shared/model/team";
import { Location } from "../../../shared/model/location";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";
import { FeatureStatus } from "../../../shared/model/feature-status";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 220,
    verticalAlign: "super"
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
    marginRight: "40px"
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
      teamName: "",
      location: "",
      labelWidth: 0
    };
  }

  closeDialog = () => {
    this.props.close();
  };

  createTeam = () => {
    if (this.state.teamName.length > 0 && this.state.location.length > 0) {
      const teamData = {
        TeamName: this.state.teamName,
        TeamLogo: this.state.teamName,
        Location: this.state.location,
        TeamId: "TR" + parseInt(Math.random() * 1000),
        status: FeatureStatus.GREEN
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
              Location: this.state.location,
              TeamId: "T" + parseInt(Math.random() * 1000),
              status: FeatureStatus.GREEN
            })
            .then(response => {
              window.location.reload();
            });
        });
      this.props.close();
    }
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
          <FormControl className={classes.formControl}>
            {/* <InputLabel>select team</InputLabel>
             <Select
              value={this.state.teamName}
              onChange={this.handleChange}
              name="teamName"
              className={classes.selectEmpty}
            >
              {this.getSelectValues(Team)}
            </Select> */}
            <TextField
              type="text"
              name="teamName"
              value={this.state.teamName}
              onChange={this.handleChange}
              style={{ width: "100%", textOverflow: "ellipsis" }}
            />
          </FormControl>
        </div>
        <div className={classes.task}>
          <label className={classes.label}>Location </label>
          <FormControl className={classes.formControl}>
            <InputLabel>select location</InputLabel>
            <Select
              value={this.state.location}
              onChange={this.handleChange}
              name="location"
              className={classes.selectEmpty}
              required
            >
              {this.getSelectValues(Location)}
            </Select>
          </FormControl>
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
