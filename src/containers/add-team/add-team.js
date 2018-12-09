import React, { PureComponent } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import AddTeamDialog from "./add-team-dialog/add-team-dialog";
import { Location } from "../../shared/model/location";
import { Team } from "../../shared/model/team";
import { EnumToArray } from "../../shared/Utils/enumToArray";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 220,
    verticalAlign: "super"
  },
  selectEmpty: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    alignItems: "left"
  },
  button: {
    margin: theme.spacing.unit
  },
  select: {
    margin: "2px"
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
const TEAM = "team";
const LOCATION = "location";
export class AddTeam extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      team: "",
      labelWidth: 0,
      open: false
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.name === TEAM) {
      setTimeout(() => {
        this.props.team(this.state.team);
      }, 100);
    } else if (event.target.name === LOCATION) {
      setTimeout(() => {
        this.props.location(this.state.location);
      }, 100);
    }
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
          <DialogTitle id="alert-dialog-slide-title">{"Add Team"}</DialogTitle>
          <AddTeamDialog
            close={this.handleClose}
            team={this.state.team}
            location={this.state.location}
          />
        </Dialog>
        <div className={classes.select}>
          <FormControl className={classes.formControl}>
            <InputLabel>select location</InputLabel>
            <Select
              value={this.state.location}
              onChange={this.handleChange}
              displayEmpty
              name="location"
              className={classes.selectEmpty}
            >
              {this.getSelectValues(Location)}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>select team</InputLabel>
            <Select
              value={this.state.team}
              onChange={this.handleChange}
              displayEmpty
              name="team"
              className={classes.selectEmpty}
            >
              {this.getSelectValues(Team)}
            </Select>
          </FormControl>
        </div>
        <Button
          variant="outlined"
          className={classes.button}
          onClick={this.handleClickOpen}
        >
          Add Team
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(AddTeam);
