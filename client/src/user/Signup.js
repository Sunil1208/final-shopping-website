import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Base from '../core/Base';
import { signup } from "../auth/helper";
import Alert from '@material-ui/lab/Alert';
import {PropagateLoader} from "react-spinners";
import { css } from "@emotion/core";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const useStyles1 = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Signup() {
  const classes = useStyles();

    const [values, setValues] = useState({
        name: "",
        lastname:"",
        email: "",
        password: "",
        error: "",
        success: false
    });

    const [loading, setLoading] = useState(false)
    
    const { name, lastname, email, password, error, success} = values;


    const handleChange = name => event => {
      setValues({ ...values, error: false, [name]: event.target.value });
    };

    const onSubmit = event => {
    event.preventDefault();
    setLoading(true)
    setValues({ ...values, error: false });
    signup({ name, lastname, email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
          setLoading(false)
        } else {
          setValues({
            ...values,
            name: "",
            lastname: "",
            email: "",
            password: "",
            error: "",
            success: true
          });
          setLoading(false)
        }
      })
      .catch(console.log("Error in signup"));
  };

  const signupForm = () => {
    return(
      <React.Fragment>
      {ColorAlerts()}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className="text-dark">
            Sign up
          </Typography>
          {loadingMessage(loading)}
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  value={name}
                  onChange={handleChange("name")}
                  type="text"
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Full Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={lastname}
                  onChange={handleChange("lastname")}
                  type="text"
                  autoComplete="lastname"
                  name="lastName"
                  variant="outlined"
                  required
                  fullWidth
                  id="last"
                  label="Last Name"
                  
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="email"
                  onChange={handleChange("email")}
                  value={email}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={password}
                  onChange={handleChange("password")}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  className="text-dark"
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              onClick={onSubmit}
              type="submit"
              fullWidth
              variant="contained"
              style={{backgroundColor:"#21d192"}}
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to = "/signin" variant="body2">
                  <span className="text-primary">Already have an account? Sign in</span>
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
        </Box>
    </Container>
    </React.Fragment>
    )
  }


    const override = css`
          display: block;
          margin: 0 auto;
          border-color: red;
          `;
    const loadingMessage = (loading) => {
      if(loading){
        return(
          <div className="sweet-loading">
          <PropagateLoader
            css={override}
            color={"#123abc"}
            loading={loading}
          />
          </div>
        )
      }
    }

    const ColorAlerts = () => {
      const classes = useStyles1();
      if(success){
        return(
          <div className={classes.root} style={{display: success? "" : "none"}}>
              <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4">
              <Alert variant="filled" severity="success" color="success" action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setValues({success:false})
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              } >
                You have successfully signed up. Please 
                <Link to="/signin" className="text-white"><u> Login Here</u></Link>
              </Alert>
              </div>
              </div>
          </div>
        )
      } else{
        return(
          <div className={classes.root} style={{display: error ? "" : "none"}}>
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
            <Alert variant="filled" severity="warning" color="warning" action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setValues({error:""})
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            } >
            {error}
            </Alert>
            </div>
          </div>
        </div>
        )    
      }
    }

  return (
    <Base >
      {signupForm()}      
    </Base>
  );
}