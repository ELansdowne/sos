import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import SaveIcon from "@material-ui/icons/Save";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import { IssueType } from "../../../shared/model/issue-type";

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  input: {
    marginRight: "10px"
  },
  expanded: {
    "&$expanded": {
      minHeight: 0,
      marginTop: "2px",
      marginBottom: 0
    }
  },
  root: {
    padding: "1px 21px 0px",
    minHeight: "0px"
  },
  content: { margin: "0px" }
});

export class Task extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      size: this.props.task.Size,
      priority: this.props.task.Priority,
      taskData: null,
      open: false,
      issueData: null,
      taskId: this.props.task.taskId,
      date: this.props.task.date,
      sprintStartEnd: this.props.task.SprintStartEnd,
      owner: this.props.task.owner,
      description: this.props.task.description
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSave = event => {
    event.preventDefault();
    const taskRequestData = {
      id: this.props.task.id,
      teamId: this.props.task.teamId,
      type: this.props.task.type,
      subType: this.props.task.subType,
      owner: this.state.owner,
      description: this.state.description,
      sprint: this.props.task.sprint,
      release: this.props.task.release,
      status: this.props.task.status,
      taskId: this.state.taskId,
      Size: this.state.size,
      Priority: this.state.priority,
      SprintStartEnd: this.state.sprintStartEnd,
      date: this.state.date
    };
    axios
      .put(
        `http://localhost:3000/addPatch`,
        {
          taskRequestData
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        }
      )
      .catch(error => {
        axios
          .put("http://localhost:3000/tasks/" + this.props.task.id, {
            id: this.props.task.id,
            teamId: this.props.task.teamId,
            type: this.props.task.type,
            subType: this.props.task.subType,
            owner: this.state.owner,
            description: this.state.description,
            sprint: this.props.task.sprint,
            release: this.props.task.release,
            status: this.props.task.status,
            taskId: this.state.taskId,
            Size: this.state.size,
            Priority: this.state.priority,
            SprintStartEnd: this.state.sprintStartEnd,
            date: this.state.date
          })
          .then(response => {
            //  window.location.reload();
          });
      });
    this.setState({ isSubmitted: true });
    alert("Information saved");
  };
  render() {
    let bgColorConfig = "rgb(251, 65, 65)";
    let cardType = this.props.task.subType ? this.props.task.subType : "Risks";
    switch (cardType) {
      case IssueType.Risks:
        bgColorConfig = "palevioletred";
        break;
      case IssueType.Blockers:
        bgColorConfig = "rgb(251, 65, 65)";
        break;
      case IssueType.Dependencies:
        bgColorConfig = "peachpuff";
        break;
      case IssueType.Tasks:
        bgColorConfig = "#f7f70473";
        break;
      default:
        bgColorConfig = "rgb(251, 65, 65)";
        break;
    }
    let cardColor = "rgba(19, 19, 241, 0.281)";
    const { classes } = this.props;
    switch (this.props.task.subType) {
      case "WorkRequest":
        cardColor = "rgba(19, 19, 241, 0.281)";
        break;
      case "CI":
        cardColor = "peachpuff";
        break;
      case "CA":
        cardColor = "#ffce75";
        break;
      default:
        cardColor = "rgba(19, 19, 241, 0.281)";
        break;
    }
    return (
      <div>
        {this.props.task.type === "Feature" ? (
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              classes={{ expanded: classes.expanded }}
              className={classes.root}
            >
              <Typography className={classes.heading}>
                <input
                  placeholder="workrequest information"
                  name="workrequest"
                  value={this.state.taskId}
                  style={{ background: cardColor, width: "75px" }}
                  onChange={this.handleChange}
                />
                <input
                  placeholder="description"
                  name="description"
                  style={{ background: cardColor, width: "228px" }}
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.root}>
              <Typography>
                <div>
                  <table
                    id="tableWorkRequest"
                    className="table table-bordered"
                    style={{ marginBottom: "0px", width: "120px" }}
                  >
                    <thead>
                      <tr>
                        <th style={{ background: cardColor, width: "60px" }}>
                          Sprint Start/End
                        </th>
                        <th style={{ background: cardColor, width: "50px" }}>
                          Product Owner
                        </th>
                        <th style={{ background: cardColor, width: "40px" }}>
                          Size
                        </th>
                        <th style={{ background: cardColor, width: "50px" }}>
                          Priority
                        </th>
                        <th
                          style={{ backgroundColor: "white", width: "50px" }}
                        />
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <input
                            name="sprintStartEnd"
                            value={this.state.sprintStartEnd}
                            onChange={this.handleChange}
                            style={{ width: "70px" }}
                          />
                        </td>
                        <td>
                          <input
                            placeholder="product owner"
                            name="owner"
                            style={{ width: "120px", textOverflow: "ellipsis" }}
                            onChange={this.handleChange}
                            value={this.state.owner}
                          />
                        </td>
                        <td>
                          <input
                            name="size"
                            value={this.state.size}
                            onChange={this.handleChange}
                            style={{ width: "40px" }}
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            name="priority"
                            style={{ width: "50px" }}
                            value={this.state.priority}
                            onChange={this.handleChange}
                          />
                        </td>
                        <tr>
                          <td>
                            <SaveIcon
                              style={{
                                cursor: "pointer"
                              }}
                              onClick={this.handleSave}
                            />
                          </td>
                        </tr>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ) : (
          <Card
            style={{ background: bgColorConfig, padding: "2px", margin: "0px" }}
          >
            <TextField
              id="description"
              name="description"
              style={{ width: "84%", fontSize: "10px" }}
              value={this.state.description}
              onChange={this.handleChange}
            />
            <span
              style={{
                width: "16",
                fontSize: "11px",
                fontWeight: "bold",
                float: "right",
                wordWrap: "break-word"
              }}
            >
              {this.props.task.taskId}
            </span>

            <TextField
              id="owner"
              name="owner"
              type="text"
              style={{ width: "40%", fontSize: "10px" }}
              value={this.state.owner}
              onChange={this.handleChange}
            />
            <TextField
              id="date"
              name="date"
              type="text"
              style={{ marginLeft: "6px", width: "43%", fontSize: "10px" }}
              value={this.state.date}
              onChange={this.handleChange}
            />
            <SaveIcon
              style={{
                cursor: "pointer",
                float: "right",
                paddingTop: "8px"
              }}
              onClick={this.handleSave}
            />
          </Card>
        )}{" "}
      </div>
    );
  }
}

export default withStyles(styles)(Task);
