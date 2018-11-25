import React, { PureComponent } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { EnumToArray } from "../../../shared/Utils/enumToArray";
import { Team } from "../../../shared/model/team";
import { Location } from "../../../shared/model/location";
import axios from "axios";
import Teams from "../../teams/teams";

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
      logo: "Nike",
      name: "",
      location: "Noida",
      labelWidth: 0
    };
  }

  closeDialog = () => {
    let teams = new Teams();
    axios
      .post("http://localhost:3000/teams", {
        id: 8,
        TeamName: this.state.name,
        TeamLogo: this.state.logo,
        Location: this.state.location
      })
      .then(response => {
        console.log("response", response);
        window.location.reload();
      })
      .catch(error => {
        console.log("error is", error);
      });
    this.props.close();
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  getSelectValues = enums => {
    let values = EnumToArray.enumToArray(enums).map(result => {
      return <MenuItem value={result}>{result}</MenuItem>;
    });
    return values;
  };
  render() {
    console.log("props om this are ", this.props);
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.task}>
          <label className={classes.label}>Team Name</label>
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.name}
            name="name"
          />
        </div>
        <div className={classes.task}>
          <label className={classes.label}>Team Logo </label>
          <Select
            value={this.state.logo}
            onChange={this.handleChange}
            displayEmpty
            name="logo"
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
            onClick={this.closeDialog}
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AddTeamDialog);
