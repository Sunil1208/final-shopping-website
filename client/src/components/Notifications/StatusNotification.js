import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useGlobal } from 'reactn';
import { Slide } from '@material-ui/core';
import { Link } from 'react-router-dom';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const StatusNotification =({message}) => {
  const classes = useStyles();
  const [open, setOpen] = useGlobal('enableToast')

//   const handleClick = () => {
//     setOpen(true);
//   };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };



  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{vertical:'bottom',horizontal:'center'}}>
        <Alert onClose={handleClose} severity="error">
          The product has already been delivered, status cannot be updated now.
        </Alert>
      </Snackbar>
    </div>
  );
}

export default StatusNotification;