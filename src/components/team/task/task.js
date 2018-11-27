import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import AddRiskDialog from "../add-risk-dialog/add-risk-dialog";
import axios from "axios";
import Issue from "../issue/issue";
import issues from "../../../assets/localDB/issues.json";

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
function Transition(props) {
  return <Slide direction="up" {...props} />;
}

export class Task extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      size: "",
      owner: "",
      priority: "",
      sprintStartDate: "",
      sprintEndDate: "",
      noOfDependency: "",
      workrequest: "",
      noOfBlocker: "",
      taskData: null,
      open: false,
      issueData: null
    };
  }

  componentDidMount() {
    this.getTeams();
  }
  getTeams() {
    axios
      .get(`http://localhost:3000/getIssues`)
      .then(result => {
        let filteredIssues = this.filterIssues(result.data);
        this.setState({ issueData: filteredIssues });
      })
      .catch(error => {
        axios
          .get("http://localhost:3000/issues") //using json-server dependency for local json .. check db.json file for local data.
          .then(result => {
            let filteredIssues = this.filterIssues(result.data);
            this.setState({ issueData: filteredIssues });
          })
          .catch(error => {
            let filteredIssues = this.filterIssues(issues);
            this.setState({ issueData: filteredIssues });
          });
      });
  }
  filterIssues(issues = []) {
    /* filter issues corresponding to teamId*/
    return issues.filter(
      feature => feature.FeatureId === this.props.feature.FeatureId
    );
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSave = event => {
    event.preventDefault();
    const taskRequestData = {
      WorkRequestInfo: this.state.workrequest,
      NBlocker: this.state.noOfBlocker,
      NDependency: this.state.noOfDependency,
      Size: this.state.size,
      Priority: this.state.priority,
      StartDate: this.state.sprintStartDate,
      EndDate: this.state.sprintEndDate
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
      .then(res => {
        return null;
      });
    this.setState({ isSubmitted: true });
  };
  render() {
    let issues = null;
    if (this.state.issueData) {
      issues = this.state.issueData.map((issue, index) => {
        return <Issue key={index} issue={issue} />;
      });
    }
    let cardColor = "rgba(19, 19, 241, 0.281)";
    const { classes } = this.props;
    switch (this.props.name) {
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
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              <input
                placeholder="workrequest information"
                name="workrequest"
                className={classes.input}
                value={this.props.feature.WorkRequestInfo}
                style={{ background: cardColor }}
              />
              <input
                placeholder="product owner"
                name="owner"
                style={{ background: cardColor }}
                value={this.props.feature.AssignedTo}
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
                      <th style={{ background: cardColor, width: "50px" }}>
                        No of Blockers
                      </th>
                      <th style={{ background: cardColor, width: "60px" }}>
                        No of Dependencies
                      </th>
                      <th style={{ background: cardColor, width: "30px" }}>
                        Size
                      </th>
                      <th style={{ background: cardColor, width: "50px" }}>
                        Priority
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          name="noOfBlocker"
                          value={this.state.noOfBlocker}
                          onChange={this.handleChange}
                          style={{ width: "80px" }}
                          placeholder="0"
                        />
                      </td>
                      <td>
                        <input
                          name="noOfDependency"
                          value={this.state.noOfDependency}
                          onChange={this.handleChange}
                          style={{ width: "110px" }}
                          placeholder="0"
                        />
                      </td>
                      <td>
                        <input
                          name="size"
                          value={this.state.size}
                          onChange={this.handleChange}
                          style={{ width: "70px" }}
                          placeholder="0"
                        />
                      </td>
                      <td>
                        {" "}
                        <input
                          name="priority"
                          style={{ width: "110px" }}
                          value={this.state.priority}
                          onChange={this.handleChange}
                          placeholder="0"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th style={{ background: cardColor }}>
                        Sprint StartDate
                      </th>
                      <td>
                        <input
                          type="date"
                          name="sprintStartDate"
                          style={{ width: "110px", fontSize: "0.8rem" }}
                          value={this.state.sprintStartDate}
                          onChange={this.handleChange}
                        />
                      </td>

                      <th style={{ background: cardColor }}>Sprint EndDate</th>
                      <td>
                        <input
                          type="date"
                          name="sprintEndDate"
                          style={{ width: "110px", fontSize: "0.8rem" }}
                          value={this.state.sprintEndDate}
                          onChange={this.handleChange}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <Dialog
                  open={this.state.open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={this.handleClose}
                  aria-labelledby="alert-dialog-slide-title"
                  aria-describedby="alert-dialog-slide-description"
                  className={classes.dialog}
                >
                  <DialogTitle id="alert-dialog-slide-title">
                    {"Add Risks/Dependencies/Blockers"}
                  </DialogTitle>
                  <AddRiskDialog
                    close={this.handleClose}
                    feature={this.props.feature.FeatureId}
                  />
                </Dialog>
                <Button
                  color="default"
                  size="small"
                  className={classes.button}
                  variant="contained"
                  style={{ float: "left" }}
                  onClick={this.handleClickOpen}
                >
                  Add
                </Button>
                <Button
                  color="default"
                  size="small"
                  className={classes.button}
                  variant="contained"
                  style={{ float: "right" }}
                  onClick={this.handleSave}
                >
                  Save
                </Button>
              </div>
            </Typography>
          </ExpansionPanelDetails>
          here{issues}
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)(Task);
