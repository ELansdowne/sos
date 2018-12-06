import React, { PureComponent } from "react";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { FormatDate } from "../../../shared/Utils/format-date";
import { FeatureCategory } from "../../../shared/model/feature-category";

class Issue extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      assignedName: "",
      description: "",
      date: ""
    };
  }

  render() {
    let endDate = null;
    if (this.props.issue) {
      endDate = FormatDate.formatDate(this.props.issue.date);
    }
    let bgColorConfig = "orangered";
    let cardType = this.props.issue.Category
      ? this.props.issue.Category
      : "Risks";
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

    return (
      <Card
        style={{ background: bgColorConfig, padding: "5px", margin: "5px" }}
      >
        <TextField
          id="description"
          name="description"
          placeholder="description"
          style={{ width: "100%", fontSize: "10px" }}
          value={this.props.issue.Description}
        />

        <TextField
          id="assignedName"
          name="assignedName"
          type="text"
          placeholder="Assigned to"
          style={{ width: "45%", fontSize: "10px" }}
          value={this.props.issue.AssignedTo}
        />
        <TextField
          id="date"
          name="date"
          type="date"
          style={{ marginLeft: "8px", width: "50%", fontSize: "10px" }}
          value={endDate}
        />
      </Card>
    );
  }
}

export default Issue;
