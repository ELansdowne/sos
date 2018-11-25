import React, { PureComponent } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";

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
      age: "",
      name: "hai",
      labelWidth: 0
    };
  }

  closeDialog = () => {
    this.props.close();
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.task}>
          <label className={classes.label}>Team Name</label>
          <input type="text" />
        </div>
        <div className={classes.task}>
          <label className={classes.label}>Team Logo </label>
          <Select
            value={this.state.age}
            onChange={this.handleChange}
            displayEmpty
            name="age"
            className={classes.selectEmpty}
          >
            <MenuItem value="">
              <em>Select Release</em>
            </MenuItem>
            <MenuItem value={"Nike"}>Nike</MenuItem>
            <MenuItem value={"Nemesis"}>Nemesis</MenuItem>
            <MenuItem value={"Titans"}>Titans</MenuItem>
            <MenuItem value={"Hades"}>Hades</MenuItem>
            <MenuItem value={"Helios"}>Helios</MenuItem>
            <MenuItem value={"Kratos"}>Kratos</MenuItem>
            <MenuItem value={"Athena"}>Athena</MenuItem>
          </Select>
        </div>
        <div className={classes.task}>
          <label className={classes.label}>Location </label>
          <Select
            value={this.state.age}
            onChange={this.handleChange}
            displayEmpty
            name="age"
            className={classes.selectEmpty}
          >
            <MenuItem value="">
              <em>Select Location</em>
            </MenuItem>
            <MenuItem value={"Nike"}>Noida</MenuItem>
            <MenuItem value={"Nemesis"}>Sydney</MenuItem>
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
