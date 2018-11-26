import React, { PureComponent } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import AddTaskDialog from "../add-task-dialog/add-task-dialog";
import Issue from "../issue/issue";
import Task from "../task/task";
import axios from "axios";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  dialog: {}
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class TeamPanel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      status: " "
    };
  }

  static getContext() {
    return this.props;
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = event => {
    if (event.target.name === "red")
      this.setState({ status: event.target.name });
    if (event.target.name === "amber")
      this.setState({ status: event.target.name });
    if (event.target.name === "green")
      this.setState({ status: event.target.name });
  };
  componentDidUpdate() {
    const statusData = {
      status: this.state.status
    };
    axios
      .post(
        `http://localhost:3000/addStatus`,
        {
          statusData
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        }
      )
      .then(res => {
        console.log(res);
        return null;
      });
  }
  render() {
    console.log("props team panel ", this.props.data);
    const { classes } = this.props;
    let imgPath = "default.jpg";
    switch (this.props.data.TeamName) {
      case "Nike":
        imgPath = "Nike.png";
        break;
      case "Titans":
        imgPath = "Titans.png";
        break;
      case "Hades":
        imgPath = "Hades.png";
        break;
      case "Caerus":
        imgPath = "Caerus.png";
        break;
      case "Nemesis":
        imgPath = "Nemesis.png";
        break;
      default:
        imgPath = "default.jpg";
        break;
    }
    let color = "white";
    switch (this.state.status) {
      case "green":
        color = "#55ce55";
        break;
      case "amber":
        color = "#FFBF00";
        break;
      case "red":
        color = "#fb4141";
        break;
      default:
        color = "white";
        break;
    }
    return (
      <div className={classes.root}>
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
            {"Add Features"}
          </DialogTitle>
          <AddTaskDialog close={this.handleClose} />
        </Dialog>
        <Grid container spacing={8}>
          <Grid item xs={1}>
            <Paper className={classes.paper} style={{ background: color }}>
              <img
                src={require("./images/" + imgPath)}
                style={{
                  width: "40px",
                  height: "40px",
                  float: "center"
                }}
                alt="teamName"
              />
              <Button
                color="primary"
                size="small"
                className={classes.button}
                variant="contained"
                onClick={this.handleClickOpen}
              >
                Add feature
              </Button>
              <div style={{ padding: "8px" }}>
                <img
                  style={{
                    width: "20px",
                    height: "20px",
                    float: "center"
                  }}
                  src={require("./images/Red.png")}
                  alt="Red Status"
                  name="red"
                  onClick={this.handleChange}
                />
                <img
                  style={{
                    width: "20px",
                    height: "20px",
                    float: "center"
                  }}
                  src={require("./images/Amber.png")}
                  alt="Amber Status"
                  name="amber"
                  onClick={this.handleChange}
                />
                <img
                  style={{
                    width: "20px",
                    height: "20px",
                    float: "center"
                  }}
                  src={require("./images/Green.PNG")}
                  alt="Green Status"
                  name="green"
                  onClick={this.handleChange}
                />
              </div>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <Task />
              <Task />
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <Issue />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <Task />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(TeamPanel);
