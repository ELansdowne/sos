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
      issueData: null,
      sprintStartEnd: ""
    };
  }

  componentDidMount() {
    this.getIssues();
  }
  getIssues() {
    axios
      .get(`http://localhost:3000/getRisks`)
      .then(result => {
        let filteredIssues = this.filterIssues(result.data);
        this.setState({ issueData: filteredIssues });
      })
      .catch(error => {
        axios
          .get("http://localhost:3000/issues")
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
    return issues.filter(
      feature => feature.featureId === this.props.feature.featureId
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
      featureId: this.props.feature.featureId,
      NBlocker: this.state.noOfBlocker,
      NDependency: this.state.noOfDependency,
      Size: this.state.size,
      Priority: this.state.priority,
      StartDate: this.state.sprintStartDate,
      EndDate: this.state.sprintEndDate,
      SprintStartEnd: this.state.sprintStartEnd
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
            featureId: this.props.feature.featureId,
            NBlocker: this.state.noOfBlocker,
            NDependency: this.state.noOfDependency,
            Size: this.state.size,
            Priority: this.state.priority,
            StartDate: this.state.sprintStartDate,
            EndDate: this.state.sprintEndDate,
            SprintStartEnd: this.state.sprintStartEnd
          })
          .then(response => {
            //  window.location.reload();
          });
      });
    this.setState({ isSubmitted: true });
  };
  render() {
    console.log("props in task js", this.props);
    let issues = null;
    if (this.state.issueData) {
      issues = this.state.issueData.map((issue, index) => {
        return <Issue key={index} issue={issue} />;
      });
    }
    let cardColor = "rgba(19, 19, 241, 0.281)";
    const { classes } = this.props;
    switch (this.props.feature.featureType) {
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
                value={this.props.feature.featureId}
                style={{ background: cardColor, width: "70px" }}
              />
              <input
                placeholder="description"
                name="description"
                //  style={{ background: cardColor, width: "220px" }}
                value={this.props.feature.featureInfo}
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
                          //  value={this.props.feature.AssignedTo}
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
                    feature={this.props.feature}
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
          {issues}
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)(Task);
