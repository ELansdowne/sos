import React, { PureComponent } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Task from "../task/task";
import axios from "axios";
import features from "../../../assets/localDB/features.json";
import AddFeatureDialog from "../add-feature-dialog/add-feature-dialog";
import { FeatureStatus } from "../../../shared/model/feature-status";
import { Team } from "../../../shared/model/team";

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
      status: " ",
      features: null
    };
  }

  componentDidMount() {
    this.getFeatures();
  }
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
        return null;
      });
  }

  getFeatures() {
    axios
      .get(`http://localhost:3000/getTask`)
      .then(result => {
        let filteredFeatures = this.filterFeatures(result.data);
        this.setState({ features: filteredFeatures });
      })
      .catch(error => {
        axios
          .get("http://localhost:3000/features")
          .then(result => {
            let filteredFeatures = this.filterFeatures(result.data);
            this.setState({ features: filteredFeatures });
          })
          .catch(error => {
            let filteredFeatures = this.filterFeatures(features);
            this.setState({ features: filteredFeatures });
          });
      });
  }

  filterFeatures(features = []) {
    return features.filter(
      feature => feature.TeamId === this.props.data.TeamId
    );
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = event => {
    if (event.target.name === FeatureStatus.RED)
      this.setState({ status: event.target.name });
    if (event.target.name === FeatureStatus.AMBER)
      this.setState({ status: event.target.name });
    if (event.target.name === FeatureStatus.GREEN)
      this.setState({ status: event.target.name });
  };

  render() {
    const { classes } = this.props;
    let features = null;
    if (this.state.features) {
      features = this.state.features.map((feature, index) => {
        return <Task feature={feature} key={index} />;
      });
    }

    let imgPath = "default.jpg";
    switch (this.props.data.TeamName) {
      case Team.Nike:
        imgPath = "Nike.png";
        break;
      case Team.Titans:
        imgPath = "Titans.png";
        break;
      case Team.Hades:
        imgPath = "Hades.png";
        break;
      case Team.Caerus:
        imgPath = "Caerus.png";
        break;
      case Team.Nemesis:
        imgPath = "Nemesis.png";
        break;
      default:
        imgPath = "default.jpg";
        break;
    }
    let color = "white";
    switch (this.state.status) {
      case FeatureStatus.GREEN:
        color = "#55ce55";
        break;
      case FeatureStatus.AMBER:
        color = "#FFBF00";
        break;
      case FeatureStatus.RED:
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
          <AddFeatureDialog
            close={this.handleClose}
            teamData={this.props.data}
          />
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
            <Paper className={classes.paper}>{features}</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper} />
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(TeamPanel);
