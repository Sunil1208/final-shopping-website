import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { updateOrderStatus } from '../core/helper/orderHelper'
import { isAuthenticated } from '../auth/helper';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const DialogSelect = ({order}) => {
  const classes1 = useStyles();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [age, setAge] = React.useState('');
  const [state, setState] = useState(order.status)
  const [updateStatus, setUpdateStatus] = useState(false)
  const {token} = isAuthenticated()

  const handleChange = (event) => {
    // setAge(Number(event.target.value) || '');
    setState(event.target.value || '')
  };

  const updateTask = () => {
    updateOrderStatus(order.user._id,order._id,token, state).then( data => {
        console.log(data)
        if(data?.error){
            console.log(data.error)
        } else {
            setUpdateStatus(true)
            
            console.log(`Update Status`)
            console.log(updateStatus)
            setDialogOpen(false);
        }
    })
  }

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>Update Status</Button>
      <Dialog disableBackdropClick disableEscapeKeyDown open={dialogOpen} onClose={handleClose}>
        <DialogTitle>Update Order Status</DialogTitle>
        <DialogContent>
          <form className={classes1.container}>
          <FormControl className={classes1.formControl}>
          <InputLabel id="demo-dialog-select-label">Status</InputLabel>
          <Select
            labelId="demo-dialog-select-label"
            id="demo-dialog-select"
            value={state}
            onChange={handleChange}
            input={<Input />}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value='Received'>Received</MenuItem>
            <MenuItem value='Processing'>Processing</MenuItem>
            <MenuItem value='Shipped'>Shipped</MenuItem>
            <MenuItem value='Delivered'>Delivered</MenuItem>
            <MenuItem value='Cancelled'>Cancelled</MenuItem>
          </Select>
        </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={updateTask} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogSelect;
