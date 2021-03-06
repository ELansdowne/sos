import React, { PureComponent } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import axios from "axios";
import features from "../../../assets/localDB/features.json";
import AddFeatureDialog from "../add-feature-dialog/add-feature-dialog";
import { Team } from "../../../shared/model/team";
import Container from "../../../containers/Container/container";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import styles from "./team-panel.module.css";
import { TaskStatus } from "../../../shared/model/task-status";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { EnumToArray } from "../../../shared/Utils/enumToArray";
import { StatusCategory } from "../../../shared/model/team-status";
import FormControl from "@material-ui/core/FormControl";
import { Sprint } from "../../../shared/model/sprint.js";
import { Releases } from "../../../shared/model/release.js";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class TeamPanel extends PureComponent {
  backlog = [];
  progress = [];
  done = [];
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      status: " ",
      features: null,
      teamStatus: null,
      tasks: null,
      color: null
    };
  }

  componentDidMount() {
    this.backlog.length = 0;
    this.progress.length = 0;
    this.done.length = 0;
    this.getStatus();
    this.getFeatures();
  }

  componentWillReceiveProps(nextProps) {
    console.log("mectprops are", nextProps);
    if (nextProps.sprint || nextProps.release) {
      this.getFeatures();
    }
  }
  componentWillUnmount() {
    this.backlog.length = 0;
    this.progress.length = 0;
    this.done.length = 0;
  }

  getStatus() {
    axios
      .get(`http://localhost:3000/getStatus`)
      .then(result => {
        let filteredstatus = this.filterstatus(result.data);
        this.setState({ teamStatus: filteredstatus });
      })
      .catch(error => {
        axios.get("http://localhost:3000/status").then(result => {
          let filteredstatus = this.filterstatus(result.data);
          this.setState({ teamStatus: filteredstatus });
        });
      });
  }

  getFeatures() {
    this.backlog.length = 0;
    this.progress.length = 0;
    this.done.length = 0;
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
            console.log("getfeatures", result.data);
            let filteredFeatures = this.filterFeatures(result.data);
            console.log("getfeatures after team filter", result.data);
            if (this.props.sprint) {
              filteredFeatures = this.filterSprint(filteredFeatures);
              console.log(
                "getfeatures after team filter sprint ",
                filteredFeatures
              );
              if (this.props.sprint === Sprint.none) {
                filteredFeatures = this.filterFeatures(result.data);
              }
            }
            if (this.props.release) {
              filteredFeatures = this.filterRelease(filteredFeatures);
              console.log(
                "getfeatures after team filter release",
                filteredFeatures
              );
              if (this.props.release === Releases.None) {
                filteredFeatures = this.filterFeatures(result.data);
              }
            }

            filteredFeatures.forEach(feature => {
              if (feature.status === TaskStatus.BACKLOG) {
                this.backlog.push(feature);
              } else if (feature.status === TaskStatus.INPROGRESS) {
                this.progress.push(feature);
              } else if (feature.status === TaskStatus.DONE) {
                this.done.push(feature);
              }
            });

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
      feature => feature.teamId === this.props.data.TeamId
    );
  }

  filterSprint(features = []) {
    console.log(" insede filterpsrint", this.props.sprint, features);
    return features.filter(feature => feature.sprint === this.props.sprint);
  }

  filterRelease(tasks = []) {
    return tasks.filter(task => task.release === this.props.release);
  }
  filterstatus(tStatus = []) {
    return tStatus.filter(
      teamStatus => teamStatus.TeamId === this.props.data.TeamId
    );
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = event => {
    console.log(
      "team panel handle chage and ",
      event.target.value,
      this.props.data
    );
    axios
      .put("http://localhost:3000/teams/" + this.props.data.id, {
        TeamName: this.props.data.TeamName,
        TeamLogo: this.props.data.TeamLogo,
        Location: this.props.data.Location,
        TeamId: this.props.data.TeamId,
        status: event.target.value
      })
      .then(respones => {
        window.location.reload();
      });
  };
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
    let tStatus = null;
    let color = "white";
    if (this.state.teamStatus && this.state.teamStatus !== "") {
      this.state.teamStatus.map((team, index) => {
        tStatus = team.status;
      });
    }
    const style = {
      display: "flex",
      paddingTop: "0px"
    };

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
    switch (this.props.data.status) {
      case "Green":
        color = "rgb(123, 234, 123)";
        break;
      case "Amber":
        color = "rgb(241, 200, 78)";
        break;
      case "Red":
        color = "rgb(245, 94, 94)";
        break;
      default:
        color = "white";
        break;
    }
    return (
      <div className={styles.root}>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{"Add Task"}</DialogTitle>
          <AddFeatureDialog
            close={this.handleClose}
            teamData={this.props.data}
          />
        </Dialog>
        <Grid container spacing={12}>
          <Paper className={styles.paper} style={{ padding: "4px" }}>
            <div style={{ background: color }}>
              <img
                src={require("./images/" + imgPath)}
                className={styles.image}
                style={{
                  width: "50px",
                  height: "50px",
                  float: "center",
                  padding: "15px"
                }}
                alt="teamName"
              />
            </div>
            <div style={{ padding: "8px" }}>
              <FormControl>
                <Select
                  value={StatusCategory.Status}
                  onChange={this.handleChange}
                  name="teamStatus"
                  style={{ fontSize: "12px" }}
                >
                  {this.getSelectValues(StatusCategory)}
                </Select>
              </FormControl>
            </div>
            <Button
              size="small"
              style={{ padding: "1px", textTransform: "capitalize" }}
              variant="contained"
              onClick={this.handleClickOpen}
            >
              Add Task
            </Button>
          </Paper>
          {this.state.features ? (
            <Grid>
              <div style={{ ...style }}>
                <Container
                  id={1}
                  list={this.backlog}
                  header={TaskStatus.BACKLOG}
                  style={{ width: "400px" }}
                />
                <Container
                  id={2}
                  list={this.progress}
                  header={TaskStatus.INPROGRESS}
                  style={{ width: "400px" }}
                />
                <Container
                  id={3}
                  list={this.done}
                  header={TaskStatus.DONE}
                  style={{ width: "400px" }}
                />
              </div>
            </Grid>
          ) : null}
        </Grid>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(TeamPanel);
