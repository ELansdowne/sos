import React, { PureComponent } from "react";
import Card from "@material-ui/core/Card";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import style from "./add-team.module.css";

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

export class AddTeam extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      age: "",
      name: "hai",
      labelWidth: 0
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.select}>
          <Select
            value={this.state.age}
            onChange={this.handleChange}
            displayEmpty
            name="age"
            className={classes.selectEmpty}
          >
            <MenuItem value="">
              <em>Select Location</em>
            </MenuItem>
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={"Noida"}>Noida</MenuItem>
            <MenuItem value={"Sydney"}>Sydney</MenuItem>
          </Select>
          <Select
            value={this.state.age}
            onChange={this.handleChange}
            displayEmpty
            name="age"
            className={classes.selectEmpty}
          >
            <MenuItem value="">
              <em>Select Team</em>
            </MenuItem>
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={"Nike"}>Nike</MenuItem>
            <MenuItem value={"Nemesis"}>Nemesis</MenuItem>
            <MenuItem value={"Titans"}>Titans</MenuItem>
            <MenuItem value={"Hades"}>Hades</MenuItem>
            <MenuItem value={"Helios"}>Hades</MenuItem>
            <MenuItem value={"Kratos"}>Hades</MenuItem>
            <MenuItem value={"Athena"}>Hades</MenuItem>
          </Select>
        </div>
        <Button variant="outlined" className={classes.button}>
          Add Team
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(AddTeam);
