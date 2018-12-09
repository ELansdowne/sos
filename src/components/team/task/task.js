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
import { FormatDate } from "../../../shared/Utils/format-date";
import { FeatureCategory } from "../../../shared/model/feature-category";
const styles = theme => ({
  root: {
    marginBottom: "20px"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  input: {
    marginRight: "10px"
  }
});

export class Task extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      size: "",
      priority: "",
      taskData: null,
      open: false,
      issueData: null,
      date: null,
      sprintStartEnd: "",
      owner: "",
      description: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSave = event => {
    event.preventDefault();
    const taskRequestData = {
      taskId: this.props.task.taskId,
      Size: this.state.size,
      Priority: this.state.priority,
      SprintStartEnd: this.state.sprintStartEnd,
      date: this.state.date,
      owner: this.state.owner,
      description: this.state.description
    };
    axios
      .post(
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
          .post("http://localhost:3000/taskCard", {
            taskId: this.props.task.taskId,
            Size: this.state.size,
            Priority: this.state.priority,
            SprintStartEnd: this.state.sprintStartEnd,
            date: this.state.date,
            owner: this.state.owner,
            description: this.state.description
          })
          .then(response => {
            //  window.location.reload();
          });
      });
    this.setState({ isSubmitted: true });
  };
  render() {
    let endDate = null;
    if (this.props.task.type === "Issue") {
      endDate = FormatDate.formatDate(this.props.task.date);
    }
    let bgColorConfig = "orangered";
    let cardType = this.props.task.subType ? this.props.task.subType : "Risks";
    switch (cardType) {
      case FeatureCategory.Risks:
        bgColorConfig = "palevioletred";
        break;
      case FeatureCategory.Blockers:
        bgColorConfig = "orangered";
        break;
      case FeatureCategory.Dependencies:
        bgColorConfig = "peachpuff";
        break;
      default:
        bgColorConfig = "orangered";
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
      <div className={classes.root}>
        {this.props.task.type === "Feature" ? (
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                <input
                  placeholder="workrequest information"
                  name="workrequest"
                  className={classes.input}
                  value={this.props.task.taskId}
                  style={{ background: cardColor, width: "70px" }}
                />
                <input
                  placeholder="description"
                  name="description"
                  style={{ background: cardColor, width: "220px" }}
                  value={this.props.task.description}
                />
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
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
                            placeholder="0"
                          />
                        </td>
                        <td>
                          <input
                            placeholder="product owner"
                            name="owner"
                            style={{ width: "120px", textOverflow: "ellipsis" }}
                            value={this.props.task.owner}
                          />
                        </td>
                        <td>
                          <input
                            name="size"
                            value={this.state.size}
                            onChange={this.handleChange}
                            style={{ width: "40px" }}
                            placeholder="0"
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            name="priority"
                            style={{ width: "50px" }}
                            value={this.state.priority}
                            onChange={this.handleChange}
                            placeholder="0"
                          />
                        </td>
                        <tr>
                          <td>
                            <SaveIcon
                              style={{
                                cursor: "pointer",
                                color: "#0a7bdb"
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
            style={{ background: bgColorConfig, padding: "5px", margin: "5px" }}
          >
            <TextField
              id="description"
              name="description"
              placeholder={this.props.task.description}
              style={{ width: "100%", fontSize: "10px" }}
              value={this.state.description}
              onChange={this.handleChange}
            />

            <TextField
              id="owner"
              name="owner"
              type="text"
              placeholder={this.props.task.owner}
              style={{ width: "45%", fontSize: "10px" }}
              value={this.state.owner}
              onChange={this.handleChange}
            />
            <TextField
              id="date"
              name="date"
              type="date"
              style={{ marginLeft: "8px", width: "50%", fontSize: "10px" }}
              value={this.state.date}
              onChange={this.handleChange}
            />
          </Card>
        )}{" "}
      </div>
    );
  }
}

export default withStyles(styles)(Task);
