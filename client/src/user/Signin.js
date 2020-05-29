
import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Base from '../core/Base';
import { isAuthenticated, signin, authenticate} from '../auth/helper';
import {Redirect } from 'react-router-dom';
import {Pacman } from 'react-pure-loaders';
import { css } from "@emotion/core";
import { PropagateLoader} from "react-spinners";


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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Signin = () => {
  const classes = useStyles();

      const [values, setValues ] = useState({
        email:"skmy03@gmail.com",
        password:"123456",
        error:"",
        loading: false,
        didRedirect: false
    })

        const { email, password, error, loading, didRedirect } = values;
        const { user } = isAuthenticated();

        const handleChange = name => event => {
            setValues({ ...values, error: false, [name]: event.target.value });
        };

        const performRedirect = () => {
            if(didRedirect){
                if(user && user.role ===1){
                    return <Redirect to="/admin/dashboard" />
                } else {
                    return <Redirect to="/user/dashboard" />
                }
            }
            if(isAuthenticated()) {
                return <Redirect to="/" />
            }
        }


        const onSubmit = event => {
          event.preventDefault();
          setValues({...values, error: false, loading:true})
          signin({email, password})
            .then(data => {
                if(data.error){
                    setValues({...values, error: data.error, loading:false})
                } else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            didRedirect:true
                        })
                    })
                }
            })
            .catch(console.log("Signin request failed"))
        }


        const loginInForm = () => {
          return(
              <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                    
                      <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                      </Avatar>
                      <Typography component="h1" variant="h5">
                        <strong className="text-dark">Sign in</strong>
                      </Typography>
                      {loadingMessage1(loading)}
                      <form className={classes.form} noValidate>
                        <TextField
                          onChange={handleChange("email")}
                          type="email"
                          value={email}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          autoFocus
                        />
                        <TextField
                          onChange={handleChange("password")}
                          value={password}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                        />
                        <FormControlLabel
                          control={<Checkbox value="remember"/>}
                          className="text-dark"
                          label="Remember me"
                        />
                        <Button
                          type="submit"
                          onClick={onSubmit}
                          fullWidth
                          variant="contained"
                          color="success"
                          style={{backgroundColor:"#21d192"}}
                          className={classes.submit}
                        >
                          Sign In
                        </Button>
                        <Grid container>
                          <Grid item xs>
                            <Link href="#" variant="body2" style={{color:"blue"}}>
                              Forgot password?
                            </Link>
                          </Grid>
                          <Grid item>
                            <Link to="/signup" variant="body2" style={{color:"blue"}}>
                              {"Don't have an account? Sign Up"}
                            </Link>
                          </Grid>
                        </Grid>
                      </form>
                    </div>
              </Container>
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
            <Pacman  color="#5DD292" loading={loading} className="p-4" />
          )
        }
      }
      const loadingMessage1 = (loading) => {
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

  return (
      <Base>
      
      {loginInForm()}
      {performRedirect()}
      </Base>
  );
}

export default Signin;