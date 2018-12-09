import React, { PureComponent } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core";
import { EnumToArray } from "../../shared/Utils/enumToArray";
import { Releases } from "../../shared/model/release";
import { Sprint } from "../../shared/model/sprint";
import InputLabel from "@material-ui/core/InputLabel";

const styles = theme => ({
  root: {},
  formControl: {
    marginRight: theme.spacing.unit,
    minWidth: 220,
    verticalAlign: "super"
  },
  selectEmpty: {
    marginTop: (theme.spacing.unit * 1) / 2
  }
});

const SPRINT = "sprint";
const RELEASE = "release";
export class VersionControl extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      release: "",
      sprint: "",
      labelWidth: 0
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.name === SPRINT) {
      setTimeout(() => {
        this.props.sprint(this.state.sprint);
      }, 100);
    } else if (event.target.name === RELEASE) {
      setTimeout(() => {
        this.props.release(this.state.release);
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
        <FormControl className={classes.formControl}>
          <InputLabel>select release</InputLabel>
          <Select
            value={this.state.release}
            onChange={this.handleChange}
            displayEmpty
            name={RELEASE}
            className={classes.selectEmpty}
          >
            {this.getSelectValues(Releases)}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>select sprint</InputLabel>
          <Select
            value={this.state.sprint}
            onChange={this.handleChange}
            displayEmpty
            name={SPRINT}
            className={classes.selectEmpty}
          >
            {this.getSelectValues(Sprint)}
          </Select>
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(VersionControl);
