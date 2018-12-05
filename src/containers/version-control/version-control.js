import React, { PureComponent } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core";
import { EnumToArray } from "../../shared/Utils/enumToArray";
import { Releases } from "../../shared/model/release";
import { Sprint } from "../../shared/model/sprint";

const styles = theme => ({
  root: {},
  formControl: {
    marginRight: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: (theme.spacing.unit * 1) / 2
  }
});

export class VersionControl extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      release: "Select Release",
      sprint: "Select a Sprint",
      labelWidth: 0
    };
  }

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
        <FormControl className={classes.formControl}>
          <Select
            value={this.state.release}
            onChange={this.handleChange}
            displayEmpty
            name="release"
            className={classes.selectEmpty}
          >
            {this.getSelectValues(Releases)}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <Select
            value={this.state.sprint}
            onChange={this.handleChange}
            displayEmpty
            name="sprint"
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
