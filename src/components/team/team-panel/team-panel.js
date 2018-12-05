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
import { FeatureStatus } from "../../../shared/model/feature-status";
import { Team } from "../../../shared/model/team";
import Container from "../../../containers/Container/container";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import styles from "./team-panel.module.css";
import { Header } from "../../../shared/model/header";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { EnumToArray } from "../../../shared/Utils/enumToArray";
import { StatusCategory } from "../../../shared/model/team-status";

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
      teamStatus: ""
    };
  }

  componentDidMount() {
    this.getFeatures();
    this.getStatus();
  }
  getStatus() {
    axios
      .get(`http://localhost:3000/getStatus`)
      .then(result => {})
      .catch(error => {
        axios.get("http://localhost:3000/status").then(result => {
          this.setState({ status: result.data });
        });
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
            filteredFeatures.forEach(feature => {
              if (feature.status === Header.BACKLOG) {
                this.backlog.push(feature);
              } else if (feature.status === Header.INPROGRESS) {
                this.progress.push(feature);
              } else if (feature.status === Header.DONE) {
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
    if (event.target.name === "teamStatus")
      this.setState({ teamStatus: event.target.value });

    const statusData = {
      status: event.target.value,
      TeamId: this.props.data.TeamId
    };
    axios
      .post("http://localhost:3000/addStatus", {
        statusData
      })
      .then(response => {
        window.location.reload();
      })
      .catch(error => {
        axios.post("http://localhost:3000/status", {
          status: this.state.teamStatus,
          TeamId: this.props.data.TeamId
        });
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
    const style = {
      display: "flex",
      paddingTop: "20px"
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
    let color = "white";
    switch (this.state.teamStatus) {
      case "Green":
        color = "#55ce55";
        break;
      case "Amber":
        color = "#FFBF00";
        break;
      case "Red":
        color = "#fb4141";
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
          <DialogTitle id="alert-dialog-slide-title">
            {"Add Features"}
          </DialogTitle>
          <AddFeatureDialog
            close={this.handleClose}
            teamData={this.props.data}
          />
        </Dialog>
        <Grid container spacing={12}>
          <Paper
            className={styles.paper}
            style={{ background: color, padding: "4px" }}
          >
            <img
              src={require("./images/" + imgPath)}
              className={styles.image}
              style={{
                width: "40px",
                height: "40px",
                float: "center"
              }}
              alt="teamName"
            />

            <div style={{ padding: "8px" }}>
              <div>
                <label>Status</label>
                <div>
                  <Select
                    value={this.state.teamStatus}
                    onChange={this.handleChange}
                    displayEmpty
                    name="teamStatus"
                  >
                    {this.getSelectValues(StatusCategory)}
                  </Select>
                </div>
              </div>
            </div>
            <Button
              size="small"
              style={{ padding: "1px", textTransform: "capitalize" }}
              variant="contained"
              onClick={this.handleClickOpen}
            >
              Add feature
            </Button>
          </Paper>
          {this.state.features ? (
            <Grid>
              <div style={{ ...style }}>
                <Container id={1} list={this.backlog} header={Header.BACKLOG} />
                <Container
                  id={2}
                  list={this.progress}
                  header={Header.INPROGRESS}
                />
                <Container id={3} list={this.done} header={Header.DONE} />
              </div>
            </Grid>
          ) : null}
        </Grid>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(TeamPanel);
