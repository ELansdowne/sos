import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export class Issue extends Component {
  constructor() {
    super();
    this.state = {
      assignedName: "",
      description: "",
      date: ""
    };
  }

  render() {
    let bgColorConfig = "orangered";
    let cardType = this.props.cardType ? this.props.cardType : "Risks";
    switch (cardType) {
      case "Risks":
        bgColorConfig = "orangered";
        break;
      case "Blockers":
        bgColorConfig = "palevioletred";
        break;
      case "Dependencies":
        bgColorConfig = "peachpuff";
        break;
      default:
        bgColorConfig = "orangered";
        break;
    }

    return (
      <Card style={{ background: bgColorConfig }}>
        <CardContent>
          <Typography
            color="textSecondary"
            variant="h5"
            component="h2"
            gutterBottom
            style={{ fontWeight: "bold" }}
          >
            {this.props.cardType}
          </Typography>
          <Typography>
            <TextField
              id="description"
              name="description"
              placeholder="description"
              style={{ width: "100%" }}
              value={this.state.description}
            />
            <Typography>
              <TextField
                id="assignedName"
                name="assignedName"
                type="text"
                placeholder="Assigned to"
                style={{ width: "45%" }}
                value={this.state.assignedName}
              />
              <TextField
                id="date"
                name="date"
                type="date"
                style={{ marginLeft: "8px", width: "50%" }}
                value={this.state.date}
              />
            </Typography>
          </Typography>
          <br />
          <Typography />
        </CardContent>
      </Card>
    );
  }
}

export default Issue;
