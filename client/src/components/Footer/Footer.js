/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import styles from "assets/jss/material-dashboard-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="https://met.guc.edu.eg" className={classes.block}>
                MET
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="https://eee.guc.edu.eg" className={classes.block}>
                IET
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="https://cms.guc.edu.eg" className={classes.block}>
                CMS
              </a>
            </ListItem>
            
          </List>
        </div>
        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()}{" "}
            <a
              href="https://guc.edu.eg"
              target="_blank"
              className={classes.a}
            >
              GUC Software Systems
            </a>
            , made with love for a better web
          </span>
        </p>
      </div>
    </footer>
  );
}
