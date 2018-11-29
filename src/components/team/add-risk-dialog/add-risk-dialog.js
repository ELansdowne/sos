import React, { PureComponent } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { FeatureCategory } from "../../../shared/model/feature-category";
import { EnumToArray } from "../../../shared/Utils/enumToArray";
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
class AddRiskDialog extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      labelWidth: 0,
      typeName: "Risks",
      rAssignedName: "",
      description: "",
      date: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  closeDialog = () => {
    this.props.close();
  };
  postIssue = () => {
    const riskData = {
      FeatureId: this.props.feature,
      Category: this.state.typeName,
      Description: this.state.description,
      AssignedTo: this.state.rAssignedName,
      date: this.state.date
    };
    axios
      .post("http://localhost:3000/addRisks", {
        riskData
      })
      .then(response => {
        window.location.reload();
      })
      .catch(error => {
        axios
          .post("http://localhost:3000/issues", {
            id: 5,
            FeatureId: this.props.feature,
            IssueId: "IR005", //this is unique id for every issue , this has to be generated in backend , we don;t have to send it
            Category: this.state.typeName,
            Description: this.state.description,
            AssignedTo: this.state.rAssignedName,
            date: this.state.date
          })
          .then(response => {
            window.location.reload();
          });
      });
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
          <label className={classes.label}>Category: </label>
          <Select
            value={this.state.typeName}
            onChange={this.handleChange}
            displayEmpty
            name="typeName"
            className={classes.selectEmpty}
          >
            {this.getSelectValues(FeatureCategory)}
          </Select>
        </div>
        <div className={classes.task}>
          <label className={classes.label}>Description:</label>
          <TextField
            type="text"
            name="description"
            style={{ width: "75%", textOverflow: "ellipsis" }}
            value={this.state.description}
            onChange={this.handleChange}
          />
        </div>
        <div className={classes.task}>
          <label className={classes.label}>Product owner:</label>
          <input
            type="text"
            name="rAssignedName"
            value={this.state.rAssignedName}
            onChange={this.handleChange}
          />
        </div>
        <div className={classes.task}>
          <label className={classes.label}>Date:</label>
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
            onClick={this.postIssue}
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AddRiskDialog);
