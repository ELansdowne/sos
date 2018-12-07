import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import axios from "axios";
import issues from "../../../assets/localDB/issues.json";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

const styles = theme => ({
  root: {
    marginBottom: "20px"
  },
  card: {
    minWidth: 275
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
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});
function Transition(props) {
  return <Slide direction="up" {...props} />;
}

export class Task extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // this.getTeams();
  }
  getTeams() {
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
  render() {
    console.log("inside task", this.props.task);
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <Typography
              variant="h5"
              component="h2"
              style={{ marginBottom: "10px" }}
            >
              {this.props.task.summary}
            </Typography>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              style={{ marginBottom: "10px" }}
            >
              {this.props.task.description}
            </Typography>

            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              style={{ marginBottom: "20px" }}
            >
              {this.props.task.subType}
            </Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <Typography className={classes.pos} color="textSecondary">
                {this.props.task.taskId}
              </Typography>
              <Typography component="p">
                {this.props.task.owner}
                <br />
                {/* {this.props.task.sprint} */}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Task);
