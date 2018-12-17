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
    console.log("props in issue", this.props);
    let endDate = null;
    if (this.props.issue) {
      endDate = FormatDate.formatDate(this.props.issue.date);
    }
    let bgColorConfig = "orangered";
    let cardType = this.props.issue.issueType
      ? this.props.issue.issueType
      : "Risks";
    switch (cardType) {
      case FeatureCategory.Risks:
        bgColorConfig = "orangered";
        break;
      case FeatureCategory.Blockers:
        bgColorConfig = "palevioletred";
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
        <Typography
          color="textSecondary"
          gutterBottom
          style={{ fontWeight: "bold", fontSize: "12px" }}
        >
          {this.props.issue.issueType}
        </Typography>

        <TextField
          id="description"
          name="description"
          placeholder="description"
          style={{ width: "100%", fontSize: "10px" }}
          value={this.props.issue.issueInfo}
        />

        <TextField
          id="assignedName"
          name="assignedName"
          type="text"
          placeholder="Assigned to"
          style={{ width: "45%", fontSize: "10px" }}
          value={this.props.issue.assignedTo}
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
