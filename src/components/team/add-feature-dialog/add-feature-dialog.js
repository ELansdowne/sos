import React, { PureComponent } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { EnumToArray } from "../../../shared/Utils/enumToArray";
import { Category } from "../../../shared/model/category";
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
class AddFeatureDialog extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      assigned: "",
      labelWidth: 0,
      task: "WorkRequest"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  closeDialog = () => {
    axios
      .post("http://localhost:3000/addFeature", {
        id: 6,
        taskName: this.state.task,
        productOwner: this.state.assigned
      })
      .then(response => {
        window.location.reload();
      })
      .catch(error => {
        axios
          .post("http://localhost:3000/features", {
            id: 5,
            taskName: this.state.task,
            productOwner: this.state.assigned
          })
          .then(response => {
            window.location.reload();
          });
      });
    this.props.close();
  };

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

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
          <label className={classes.label}>Task: </label>
          <Select
            value={this.state.task}
            onChange={this.handleChange}
            displayEmpty
            name="task"
            className={classes.selectEmpty}
          >
            {this.getSelectValues(Category)}
          </Select>
        </div>
        <div className={classes.task}>
          <label className={classes.label}>Product Owner:</label>
          <input
            type="text"
            name="assigned"
            value={this.state.assigned}
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

export default withStyles(styles)(AddFeatureDialog);
