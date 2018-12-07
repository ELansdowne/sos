import React, { PureComponent } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { EnumToArray } from "../../../shared/Utils/enumToArray";
import { Category } from "../../../shared/model/category";
import axios from "axios";
import { Header } from "../../../shared/model/header";
import { TaskType } from "../../../shared/model/task-type";
import { FeatureCategory } from "../../../shared/model/feature-category";
import { Sprint } from "../../../shared/model/sprint";
import { Releases } from "../../../shared/model/release";

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
    debugger;
    let taskId = "SOS-" + Math.floor(1000 + Math.random() * 9000);
    /*  a unique parameter as FeatureId has to generated at backend to uniquely identify every feature also to map every feature with team*/
    const taskData = {
      Tasks: this.state.task,
      AssignedTo: this.state.assigned,
      FeatureId: this.state.taskId,
      WorkRequestInfo: this.state.description,
      status: Header.BACKLOG,
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
          .post("http://localhost:3000/tasks", {
            teamId: this.props.teamData.TeamId,
            taskId: taskId,
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
            status: Header.BACKLOG
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
          <label className={classes.label}>Type: </label>
          <Select
            value={this.state.type}
            onChange={this.handleChange}
            displayEmpty
            name="type"
            className={classes.selectEmpty}
          >
            {this.getSelectValues(TaskType)}
          </Select>
        </div>

        {this.state.type === TaskType.FEATURE ? (
          <div className={classes.task}>
            <label className={classes.label}>Feature: </label>
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
        ) : (
          <div className={classes.task}>
            <label className={classes.label}>Issue Type: </label>
            <Select
              value={this.state.issue}
              onChange={this.handleChange}
              displayEmpty
              name="issue"
              className={classes.selectEmpty}
            >
              {this.getSelectValues(FeatureCategory)}
            </Select>
          </div>
        )}
        <div className={classes.task}>
          <label className={classes.label}>Sprint: </label>
          <Select
            value={this.state.sprint}
            onChange={this.handleChange}
            displayEmpty
            name="sprint"
            className={classes.selectEmpty}
          >
            {this.getSelectValues(Sprint)}
          </Select>
        </div>
        <div className={classes.task}>
          <label className={classes.label}>Release: </label>
          <Select
            value={this.state.release}
            onChange={this.handleChange}
            displayEmpty
            name="release"
            className={classes.selectEmpty}
          >
            {this.getSelectValues(Releases)}
          </Select>
        </div>
        {/* <div className={classes.task}>
          <label className={classes.label}>Task ID:</label>
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
          <label className={classes.label}>Summary: </label>
          <TextField
            type="text"
            name="summary"
            style={{ width: "75%", textOverflow: "ellipsis" }}
            value={this.state.summary}
            onChange={this.handleChange}
          />
        </div>
        <div className={classes.task}>
          <label className={classes.label}>Description: </label>
          <TextField
            type="text"
            name="description"
            style={{ width: "75%", textOverflow: "ellipsis" }}
            value={this.state.description}
            onChange={this.handleChange}
          />
        </div>
        <div className={classes.task}>
          <label className={classes.label}>ETA:</label>
          <input
            type="date"
            name="date"
            value={this.state.date}
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
            onClick={this.createTask}
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AddFeatureDialog);
