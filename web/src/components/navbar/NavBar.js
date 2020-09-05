import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {AppBar,Button,IconButton,Typography,Toolbar,makeStyles} from '@material-ui/core';
import Brightness6Icon from '@material-ui/icons/Brightness6';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function NavBar({ palletType,handleThemeChange }) {
  const classes = useStyles();

  return (

    <AppBar position="static" data-testid="app-bar">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Torre Plus
        </Typography>
        <IconButton aria-label="ligth dark mode" color="inherit" onClick={() => handleThemeChange()} data-testid="dark-mode-toggle">
            {palletType==="dark"?<Brightness7Icon />:<Brightness6Icon />}
          </IconButton>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(NavBar);
