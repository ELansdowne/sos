import React, { PureComponent } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { EnumToArray } from "../../../shared/Utils/enumToArray";
import { FeatureType } from "../../../shared/model/feature-type";
import axios from "axios";
import { TaskStatus } from "../../../shared/model/task-status";
import { TaskType } from "../../../shared/model/task-type";
import { IssueType } from "../../../shared/model/issue-type";
import { Sprint } from "../../../shared/model/sprint";
import { Releases } from "../../../shared/model/release";
import { StatusCategory } from "../../../shared/model/team-status";

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
      task: "WorkRequest",
      taskId: "",
      description: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  closeDialog = () => {
    this.props.close();
  };

  createFeature = () => {
    let featureId = "FR" + Math.floor(1000 + Math.random() * 9000);
    /*  a unique parameter as FeatureId has to generated at backend to uniquely identify every feature also to map every feature with team*/
    const taskData = {
      Tasks: this.state.task,
      AssignedTo: this.state.assigned,
      FeatureId: this.state.taskId,
      WorkRequestInfo: this.state.description,
      TeamId: this.props.teamData.TeamId
    };
    axios
      .post("http://localhost:3000/addTask", {
        taskData
      })
      .then(response => {
        window.location.reload();
      })
      .catch(error => {
        axios
          .post("http://localhost:3000/features", {
            task: this.state.task,
            assignedTo: this.state.assigned,
            featureId: featureId,
            workRequestInfo: this.state.description,
            teamId: this.props.teamData.TeamId,
            status: TaskStatus.BACKLOG
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
          <label className={classes.label}>Feature: </label>
          <Select
            value={this.state.task}
            onChange={this.handleChange}
            displayEmpty
            name="task"
            className={classes.selectEmpty}
          >
            {this.getSelectValues(FeatureType)}
          </Select>
        </div>
        {/* <div className={classes.task}>
          <label className={classes.label}>Feature ID:</label>
          <input
            type="text"
            name="taskId"
            value={this.state.taskId}
            onChange={this.handleChange}
          />
        </div> */}
        <div className={classes.task}>
          <label className={classes.label}>Product Owner:</label>
          <input
            type="text"
            name="assigned"
            value={this.state.assigned}
            onChange={this.handleChange}
          />
        </div>
        <div className={classes.task}>
          <label className={classes.label}>Title: </label>
          <TextField
            type="text"
            name="description"
            style={{ width: "75%", textOverflow: "ellipsis" }}
            value={this.state.description}
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
            onClick={this.createFeature}
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AddFeatureDialog);
