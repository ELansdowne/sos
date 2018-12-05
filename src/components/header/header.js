import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import VersionControl from "../../containers/version-control/version-control";
import Aux from "../../hoc/Auxi";
import style from "./header.module.css";

const styles = {
  appBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    height: " 45px",
    padding: "0px"
  },
  toolBar: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3f51b5",
    color: "white",
    height: " 45px ",
    minHeight: " 45px "
  }
};

function Header(props) {
  const { classes } = props;

  return (
    <Aux>
      <AppBar position="static" color="default" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>SOS</Toolbar>
        <VersionControl className={style.versionControl} />
      </AppBar>
    </Aux>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
