import React, { PureComponent } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import AddTaskDialog from "../add-task-dialog/add-task-dialog";
import Task from "../task/task";

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
      open: false
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

  render() {
    console.log("props team panel ", this.props.data);
    const { classes } = this.props;
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
          <DialogTitle id="alert-dialog-slide-title">{"Add Tasks"}</DialogTitle>
          <AddTaskDialog close={this.handleClose} />
        </Dialog>
        <Grid container spacing={8}>
          <Grid item xs={1}>
            <Paper className={classes.paper}>
              <img
                src={require("./images/Nike.png")}
                style={{
                  width: "40px",
                  height: "40px",
                  float: "center"
                }}
                alt="teamName"
              />
              <Button
                color="primary"
                className={classes.button}
                variant="contained"
                onClick={this.handleClickOpen}
              >
                Add tasks
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <Task />
              <Task />
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=6 sm=3</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>xs=6 sm=3</Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(TeamPanel);
