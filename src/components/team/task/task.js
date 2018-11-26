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
      open: false
    };
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    let cardColor = "rgba(19, 19, 241, 0.281)";
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              <input
                placeholder="workrequest information"
                className={classes.input}
                value={this.props.name}
              />
              <input placeholder="product owner" value={this.props.owner} />
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
                  <AddRiskDialog close={this.handleClose} />
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
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)(Task);
