import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import HomeIcon from '@material-ui/icons/Home';
import { Link, withRouter,Redirect } from "react-router-dom";
import {signout, isAuthenticated} from '../../auth/helper'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}));

const MenuAppBar = ({history}) => {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const currentTab = (history, path) => {
    if (history.location.pathname === path) {
      return { color: "#2ecc72" };
    } else {
      return { color: "#FFFFFF" };
    }
  };

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const getUser = () => {
    const {user} = isAuthenticated()
    return user.name;
  }

  const getARedirect = () => {
    if(isAuthenticated() && isAuthenticated().user.role === 0){
      return (
        <Redirect to="/user/dashboard" />
      )
    }

    if(isAuthenticated() && isAuthenticated().user.role === 1){
      return (
        <Redirect to="/admin/dashboard" />
      )
    }
   

  }

  return (
    <div className={classes.root}>
      <AppBar position="static"  style={{backgroundColor:"#A7C9C9"}}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          {auth ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                
                <span style={{color:"#00005c"}}><AccountCircle fontSize={"large"} /><strong >Sunil</strong></span>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={()=> getARedirect()}>My account</MenuItem>
                
                <MenuItem onClick={()=> signout()}>Logout</MenuItem>
              </Menu>
            </div>
          )
          :(
            <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
          <span style={{color:"#00005c"}}><AccountCircle fontSize={"large"} /><strong >Guest</strong></span>
          </IconButton>
          )
        }
          </IconButton>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <Link to="/" style={{color:"#00005c"}}><strong>Home</strong></Link>
          </IconButton>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <Link to="/cart" style={{color:"#00005c"}}><strong>Cart</strong></Link>
          </IconButton>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            {isAuthenticated() && isAuthenticated().user.role ===0 && (
                <Link to="/user/dashboard" style={{color:"#00005c"}}><strong>Dashboard</strong></Link>
            )}
          </IconButton>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            {isAuthenticated() && isAuthenticated().user.role ===1 && (
                <Link to="/admin/dashboard" style={{color:"#00005c"}}><strong>Dashboard</strong></Link>
            )}
          </IconButton>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              {!isAuthenticated() && (
                <Link style={{color:"#00005c"}} to="/signup"><strong>Signup</strong></Link>
              )}
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            
          </Typography>
          <FormControlLabel
          style={{color:"#00005c"}}
            control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
            label={isAuthenticated() ? 'Logout' : 'Login'}
          />
          
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default MenuAppBar;