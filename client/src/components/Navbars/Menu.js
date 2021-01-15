import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";


export default function Menu({name,callback}){
const useStyles = makeStyles(styles);
const classes = useStyles();
    return (
        <MenuItem
        onClick={callback}
        className={classes.dropdownItem}
      >
        {name}
      </MenuItem>);
}
