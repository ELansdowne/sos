import React, { PureComponent } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddTeamDialog from "../add-team-dialog/add-team-dialog";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

class TeamPanel extends PureComponent {
  componentDidMount() {}
  render() {
    console.log("props team panel ", this.props.data);
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
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
              <Button color="primary" className={classes.button}>
                Add tasks
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>xs=6 sm=3</Paper>
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
