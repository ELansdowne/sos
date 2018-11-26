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
class AddRiskDialog extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      assigned: "",
      labelWidth: 0,
      typeName: "Risks",
      rAssignedName: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  closeDialog = () => {
    this.props.close();
  };

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.task}>
          <label className={classes.label}>Category: </label>
          <Select
            value={this.state.typeName}
            onChange={this.handleChange}
            displayEmpty
            name="typeName"
            className={classes.selectEmpty}
          >
            <MenuItem value="">
              <em>Select a Category</em>
            </MenuItem>
            <MenuItem value={"Risks"}>Risks</MenuItem>
            <MenuItem value={"Dependencies"}>Dependencies</MenuItem>
            <MenuItem value={"Blockers"}>Blockers</MenuItem>
          </Select>
        </div>
        <div className={classes.task}>
          <label className={classes.label}>Product owner</label>
          <input
            type="text"
            name="rAssignedName"
            value={this.state.rAssignedName}
            onChange={this.handleChange}
          />
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

export default withStyles(styles)(AddRiskDialog);
