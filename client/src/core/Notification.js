// import React from 'react';
// import {NotificationContainer, NotificationManager} from 'react-notifications';
 
// const NotificationPop = ({enableNotification,message}) =>{
//     const type='warning'
 
//   const createNotification = (type,message) => {
//         return () => {
//             switch (type) {
//               case 'info':
//                 NotificationManager.info('Info message');
//                 break;
//               case 'success':
//                 NotificationManager.success('Success message', 'Title here');
//                 break;
//               case 'warning':
//                 NotificationManager.warning(message, 'Close after 3000ms', 3000);
//                 break;
//               case 'error':
//                 NotificationManager.error('Error message', 'Click me!', 5000, () => {
//                   alert('callback');
//                 });
//                 break;
//             }
//           };
 
//   };
 

//     return (
//       <div>
//       {enableNotification && (
//         createNotification(type,message)
//     )} 
//         <NotificationContainer/>
//       </div>
//     );
// }
 
// export default NotificationPop;

import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useGlobal } from 'reactn';
import { Slide } from '@material-ui/core';


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

const CustomizedSnackbars =({message}) => {
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
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{vertical:'bottom',horizontal:'center'}}>
        <Alert onClose={handleClose} severity="error">
          The product has already been delivered, you cannot update the status now.
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CustomizedSnackbars;