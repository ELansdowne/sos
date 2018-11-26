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

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  formControl: {
    margin: theme.spacing.unit
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    alignItems: "left"
  },
  button: {
    margin: theme.spacing.unit * 3
  },
  select: {
    margin: "10px"
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

export class AddTeam extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      location: "Noida",
      team: "Hades",
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
          <Select
            value={this.state.location}
            onChange={this.handleChange}
            displayEmpty
            name="location"
            className={classes.selectEmpty}
          >
            {this.getSelectValues(Location)}
          </Select>
          <Select
            value={this.state.team}
            onChange={this.handleChange}
            displayEmpty
            name="team"
            className={classes.selectEmpty}
          >
            {this.getSelectValues(Team)}
          </Select>
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
