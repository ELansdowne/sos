import React, { PureComponent } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Aux from "../../hoc/Auxi";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  root: {},
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit
  }
});

export class VersionControl extends PureComponent {
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
        <FormControl className={classes.formControl}>
          <Select
            value={this.state.age}
            onChange={this.handleChange}
            displayEmpty
            name="age"
            className={classes.selectEmpty}
          >
            <MenuItem value="">
              <em>Select Release</em>
            </MenuItem>
            <MenuItem value={19e1}>19E1</MenuItem>
            <MenuItem value={19e2}>19E2</MenuItem>
            <MenuItem value={19e2}>19E2</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <Select
            value={this.state.age}
            onChange={this.handleChange}
            displayEmpty
            name="age"
            className={classes.selectEmpty}
          >
            <MenuItem value="">
              <em>Select Sprint</em>
            </MenuItem>
            <MenuItem value={1}>Sprint 1</MenuItem>
            <MenuItem value={2}>Sprint 2</MenuItem>
            <MenuItem value={3}>Sprint 3</MenuItem>
            <MenuItem value={4}>Sprint 4</MenuItem>
            <MenuItem value={5}>Sprint 5</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(VersionControl);
