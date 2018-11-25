import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = theme => ({
  root: {
    marginBottom: "20px"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    display: "flex",
    flexDirection: "row"
  },
  input: {
    margin: "1px"
  }
});

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
      taskData: null
    };
  }
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
              />
              <input placeholder="owner name" />
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
                          style={{ width: "110px", fontSize: "1.2rem" }}
                          value={this.state.sprintStartDate}
                          onChange={this.handleChange}
                        />
                      </td>

                      <th style={{ background: cardColor }}>Sprint EndDate</th>
                      <td>
                        <input
                          type="date"
                          name="sprintEndDate"
                          style={{ width: "110px", fontSize: "1.2rem" }}
                          value={this.state.sprintEndDate}
                          onChange={this.handleChange}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button style={{ float: "right" }} onClick={this.handleSave}>
                  {" "}
                  Save
                </button>
              </div>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)(Task);
