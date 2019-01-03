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
import { ServiceConfig } from "../../../shared/Utils/service-config";

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
      description: "",
      type: "Feature",
      issue: "Risks",
      summary: "",
      date: "",
      sprint: "Sprint1",
      release: "19E1"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  closeDialog = () => {
    this.props.close();
  };

  createTask = () => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    };
    if (
      this.state.assigned.length > 0 &&
      this.state.taskId.length > 0 &&
      this.state.description.length > 0
    ) {
      const taskData = {
        teamId: this.props.teamData.teamId,
        taskId: this.state.taskId,
        type: this.state.type,
        subType:
          this.state.type === TaskType.FEATURE
            ? this.state.task
            : this.state.issue,
        owner: this.state.assigned,
        description: this.state.description,
        sprint: this.state.sprint,
        release: this.state.release,
        status: TaskStatus.BACKLOG,
        date: this.state.date
      };
      axios
        .post(ServiceConfig.prodUrl + "/tasks/addTask", taskData, headers)
        .then(response => {
          console.log("task aded succsesfully", response);
          window.location.reload();
        })
        .catch(error => {
          axios
            .post("http://localhost:3000/tasks", {
              teamId: this.props.teamData.TeamId,
              taskId: this.state.taskId,
              type: this.state.type,
              subType:
                this.state.type === TaskType.FEATURE
                  ? this.state.task
                  : this.state.issue,
              owner: this.state.assigned,
              summary: this.state.summary,
              description: this.state.description,
              sprint: this.state.sprint,
              release: this.state.release,
              status: TaskStatus.BACKLOG,
              date: this.state.date
            })
            .then(response => {
              window.location.reload();
            });
        });
      this.props.close();
    }
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  getSelectValues = enums => {
    let values = EnumToArray.enumToArray(enums).map((result, index) => {
      return (
        <MenuItem key={index} value={result}>
          {" "}
          {result}{" "}
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
          <label className={classes.label}> Task: </label>{" "}
          <Select
            value={this.state.type}
            onChange={this.handleChange}
            displayEmpty
            name="type"
            className={classes.selectEmpty}
          >
            {this.getSelectValues(TaskType)}{" "}
          </Select>{" "}
        </div>{" "}
        {this.state.type === TaskType.FEATURE ? (
          <div className={classes.task}>
            <label className={classes.label}> Feature Type: </label>{" "}
            <Select
              value={this.state.task}
              onChange={this.handleChange}
              displayEmpty
              name="task"
              className={classes.selectEmpty}
            >
              {this.getSelectValues(FeatureType)}{" "}
            </Select>{" "}
          </div>
        ) : (
          <div className={classes.task}>
            <label className={classes.label}> Issue Type: </label>{" "}
            <Select
              value={this.state.issue}
              onChange={this.handleChange}
              displayEmpty
              name="issue"
              className={classes.selectEmpty}
            >
              {this.getSelectValues(IssueType)}{" "}
            </Select>{" "}
          </div>
        )}{" "}
        <div className={classes.task}>
          <label className={classes.label}> Sprint: </label>{" "}
          <Select
            value={this.state.sprint}
            onChange={this.handleChange}
            displayEmpty
            name="sprint"
            className={classes.selectEmpty}
          >
            {this.getSelectValues(Sprint)}{" "}
          </Select>{" "}
        </div>{" "}
        <div className={classes.task}>
          <label className={classes.label}> Release: </label>{" "}
          <Select
            value={this.state.release}
            onChange={this.handleChange}
            displayEmpty
            name="release"
            className={classes.selectEmpty}
          >
            {this.getSelectValues(Releases)}{" "}
          </Select>{" "}
        </div>{" "}
        <div className={classes.task}>
          <label className={classes.label}> Product Owner: </label>{" "}
          <TextField
            required
            type="text"
            name="assigned"
            value={this.state.assigned}
            onChange={this.handleChange}
            style={{
              width: "50%",
              textOverflow: "ellipsis"
            }}
          />{" "}
        </div>{" "}
        <div className={classes.task}>
          <label className={classes.label}> Task Id: </label>{" "}
          <TextField
            required
            type="text"
            name="taskId"
            style={{
              width: "50%",
              textOverflow: "ellipsis"
            }}
            value={this.state.taskId}
            onChange={this.handleChange}
          />{" "}
        </div>{" "}
        <div className={classes.task}>
          <label className={classes.label}> Title: </label>{" "}
          <TextField
            required
            type="text"
            name="description"
            style={{
              width: "85%",
              textOverflow: "ellipsis"
            }}
            value={this.state.description}
            onChange={this.handleChange}
          />{" "}
        </div>{" "}
        {this.state.type === TaskType.ISSUE && (
          <div className={classes.task}>
            <label className={classes.label}> ETA: </label>{" "}
            <input
              type="date"
              name="date"
              value={this.state.date}
              onChange={this.handleChange}
            />{" "}
          </div>
        )}{" "}
        <div className={classes.buttonGroup}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.createTask}
          >
            Submit{" "}
          </Button>{" "}
          <Button
            variant="contained"
            className={classes.button}
            onClick={this.closeDialog}
          >
            Cancel{" "}
          </Button>{" "}
        </div>{" "}
      </div>
    );
  }
}

export default withStyles(styles)(AddFeatureDialog);
