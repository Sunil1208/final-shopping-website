import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { getAllOrder, getUser } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper';
import DialogSelect from './UpdateOrder';
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
import { updateOrderStatus } from '../core/helper/orderHelper';
import { useGlobal } from 'reactn';
import StatusNotification from '../components/Notifications/StatusNotification';
import Skeleton from 'react-loading-skeleton';
import Pagination from '@material-ui/lab/Pagination';







const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));



function Row(props) {
  const { order} = props;

  const [open, setOpen] = React.useState(false);
  const [userDetails, setUserDetails] = useState([])
  const {user, token} = isAuthenticated()
  const classes = useRowStyles();
  const classes1 = useStyles();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [state, setState] = useState(order.status)
  const [orderStatus, setOrderStatus] = useState(order.status)
  // const [toastOpen, setToastOpen] = useState(false);
  const [newToastOpen,setNewToastOpen] = useGlobal('enableToast')


  
  

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
          setOrderStatus(state)
            setDialogOpen(false);
        }
    })
  }

  const handleClickOpen = () => {
    if(orderStatus==='Delivered') {
      setDialogOpen(false)
      setNewToastOpen(true)
    } else {
      setDialogOpen(true);
    }    
  };

  const handleClose = () => {
    setDialogOpen(false);
  };
  const DialogSelect1 = (order) => {
    return (
      <div>
        <Button onClick={handleClickOpen} variant="contained" >Update Status</Button>
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



  const getElementCount = (order) => {
    return order.products.length;
}




const preload = () => {
  getUser(order.user._id).then(data => {
      if(data?.error) {
          console.log(data.error)
      } else {
        console.log(data)
          setUserDetails(data)
      }
  })
}

  useEffect(() => {
    preload();
  }, [])

  const formatDate = (date) => {
    let tempDate = date;
  const dateOnly = tempDate.slice(8,10)
  const monthOnly = tempDate.slice(5,7)
  const yearOnly = tempDate.slice(0,4)
  const fullDate = `${dateOnly}-${monthOnly}-${yearOnly}`
  const partTime = tempDate.slice(11,19)
  const finalResult = `${fullDate} ${partTime}`

  return finalResult;
  }


  
  const orderBadgesElement = (orderStatus) => {

      if(orderStatus === 'Received'){
        return(
          <h5><span class="badge badge-primary">{orderStatus}</span></h5>
        )
      } else if(orderStatus === 'Processing'){
        return(
          <h5><span class="badge badge-secondary">{orderStatus}</span></h5>
        )
      } else if(orderStatus === 'Shipped'){
        return(
          <h5><span class="badge badge-info">{orderStatus}</span></h5>
        )
      } else if(orderStatus === 'Delivered'){
        return(
          <h5><span class="badge badge-success">{orderStatus}</span></h5>
        )
      } else if(orderStatus === 'Cancelled'){
        return(
          <h5><span class="badge badge-danger">{orderStatus}</span></h5>
        )
      }
  }



  return (
    <React.Fragment>

      <StyledTableRow className={classes.root} >
      
        <TableCell >
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" className="text-left">
          {userDetails.name} {userDetails.lastname}
        </TableCell>
        <TableCell align="right" className="text-left">{userDetails.email}</TableCell>
        <TableCell align="right" className="text-left" >{getElementCount(order)}</TableCell>
        <TableCell align="right" className="text-left" >{order.amount}</TableCell>
        
        <TableCell align="right" className="text-left">{orderBadgesElement(orderStatus)}</TableCell>
        <TableCell align="right" className="text-left" >{DialogSelect1(order)}</TableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases" className="table-bordered mt-1 mb-1" >
                <caption style={{captionSide:"top"}} className="mt-1 mb-1"><strong>User Details</strong></caption>
                <TableHead>
                  <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell >Last Name</TableCell>
                    <TableCell >Email ID</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                    <TableRow >
                      <TableCell component="th" scope="row">
                        {userDetails.name}
                      </TableCell>
                      <TableCell>{userDetails.lastname}</TableCell>
                      <TableCell>{userDetails.email}</TableCell>
                    </TableRow>
                 
                </TableBody>
                </Table>
                <Table size="small" aria-label="purchases" className="table-bordered mt-1 mb-1" >
                <caption style={{captionSide:"top"}} className="mt-1 mb-1"><strong>Order Details</strong></caption>
                <TableHead>
                  <TableRow>
                    <TableCell>Order Placed on</TableCell>
                    <TableCell >Order Updated on</TableCell>
                    <TableCell >Order Quantity</TableCell>
                    <TableCell >Order Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                    <TableRow >
                      <TableCell component="th" scope="row">
                        {formatDate(order.createdAt)}
                      </TableCell>
                      <TableCell>{formatDate(order.updatedAt)}</TableCell>
                      <TableCell>{getElementCount(order)}</TableCell>
                      <TableCell>{orderStatus}</TableCell>

                    </TableRow>
                 
                </TableBody>
                </Table>
                <Table size="small" aria-label="purchases" className="table-bordered mt-1 mb-1" >
                <caption style={{captionSide:"top"}} className="mt-1 mb-1"><strong>Shipping Details</strong></caption>
                <TableHead>
                  <TableRow>
                  {order.address.firstname != '' ? (
                    <TableCell>Name</TableCell>
                  ) : ('')}
                  {order.address.firstname != '' ? (
                    <TableCell >City</TableCell>
                    ) : ('')}
                    {order.address.firstname != '' ? (
                      <TableCell >State</TableCell>
                      ) : ('')}
                      {order.address.firstname != '' ? (
                        <TableCell >Zip Code</TableCell>
                        ) : ('')}
                        {order.address.firstname != '' ? (
                          <TableCell >Country</TableCell>
                          ) : ('')}
  
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                    <TableRow >
                      <TableCell component="th" scope="row">
                        {order.address.firstname} {order.address.lastname}
                      </TableCell>
                      <TableCell>{order.address.city}</TableCell>
                      <TableCell>{order.address.state}</TableCell>
                      <TableCell>{order.address.zip}</TableCell>
                      <TableCell>{order.address.country}</TableCell>

                    </TableRow>
                 
                </TableBody>
                </Table>
                <Table size="small" aria-label="purchases" className="table-bordered mt-1 mb-1" >
                <caption style={{captionSide:"top"}} className="mt-1 mb-1"><strong>Shipping Details Extended</strong></caption>
                <TableHead>
                  <TableRow>
                  {order.address.addressline1 === '' ? ('') : (
                    <TableCell>Address Line 1</TableCell>
                  )}
                    
                    {order.address.addressline2 === '' ? ('') : (
                      <TableCell>Address Line 2</TableCell>
                    )}
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                    <TableRow >
                    {order.address.addressline1 === '' ? ('') : (
                      <TableCell>{order.address.address_line1}</TableCell>
                    )}
                    {order.address.addressline2 === '' ? ('') : (
                      <TableCell>{order.address.address_line2}</TableCell>
                    )}
                    </TableRow>
                </TableBody>
                </Table>
                <Table size="small" aria-label="purchases" className="table-bordered mt-1 mb-1" >
                <caption style={{captionSide:"top"}} className="mt-1 mb-1"><strong>Transaction Details</strong></caption>
                <TableHead>
                  <TableRow>
                    <TableCell>Transaction ID</TableCell>
                    <TableCell >Mode of Payment</TableCell>
                    <TableCell >Card Type</TableCell>
                    <TableCell >Card Number</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                    <TableRow >
                      <TableCell component="th" scope="row">
                        {order.transaction_id}
                      </TableCell>
                      <TableCell>{order.paymentMode}</TableCell>
                      <TableCell>{order.cardType}</TableCell>
                      <TableCell>{order.cardNumber}</TableCell>
                    </TableRow>
                 
                </TableBody>
                </Table>
              {order.products.map((data) => (
                <Table size="small" aria-label="purchases" className="table-bordered" >
                <caption style={{captionSide:"top"}} className="mt-1 mb-1" ><strong>Product Details</strong></caption>
                <TableHead  >
                  <TableRow>
                    <TableCell>Product name</TableCell>
                    <TableCell>Product ID</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                    <TableRow key={data._id}>
                      <TableCell component="th" scope="row">
                        {data.name}
                      </TableCell>
                      <TableCell>{data._id}</TableCell>
                      <TableCell>{data.count}</TableCell>
                      <TableCell align="right">{data.price}$</TableCell>
                    </TableRow>
                 
                </TableBody>
                </Table>
                ))}
                
              
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

  
const CollapsibleTable = () => {
    const classes = useStyles();
    const [orders,setOrders] = useState([])
    const {user, token} = isAuthenticated(); 
    const [loading,setLoading] = useState(true)   
    const [lowerBound,setLowerBound] = useState(0)
    const [upperBound,setUpperBound] = useState(5)
    const [page, setPage] = useState(1);

    const preload = () => {
        getAllOrder(user._id, token).then(data => {
            if(data?.error) {
                console.log(data.error)
            } else {
              setLoading(false)
                setOrders(data)
            }
        })
    }

    useEffect(() => {
        preload();
    }, [])



    const getCount = () => {
      let count=0
      orders.map((order,index) => {
        count=count+1
      })
      return count;
    }
    const TotalCount = getCount()
    console.log(`Total elements are : ${TotalCount}`)
    const [pageNumber,setPageNumber] = useState(TotalCount)
    console.log(`Initial page count number is : ${pageNumber}`)
   
  
    const SetPageValue= () => {
  
      if(TotalCount%5===0){
        let tempPageNo = parseInt(TotalCount/5)
        console.log(tempPageNo)
        setPageNumber(tempPageNo)
      } else {
        let tempPageNo = TotalCount/5
        tempPageNo= parseInt(tempPageNo+1)
        console.log(tempPageNo)
        setPageNumber(tempPageNo)
  
      }
      console.log(`New Page Number is : ${pageNumber}`)
      return ''
    }
  
    const handleChange = (event, value) => {
      setPage(value);
        let tempValue = value*5
        setLowerBound(tempValue-5)
        setUpperBound(tempValue)
         
    };
  
    

    const GetSkeleton = () => {
      if(loading){
        return(
          <React.Fragment>
           <TableRow>
           <TableCell ><Skeleton variant="rect" width={24} height={24} /></TableCell>
           <TableCell><Skeleton variant="rect" width={60} height={24} /></TableCell>
           <TableCell><Skeleton variant="rect" width={70} height={24} /></TableCell>  
           <TableCell align="right" className="text-left"  ><Skeleton variant="rect" width={30} height={24} /></TableCell>
           <TableCell align="right" className="text-left" ><Skeleton variant="rect" width={50} height={24} /></TableCell>
           <TableCell align="right" className="text-left" ><Skeleton variant="rect" width={78.44} height={22.5} /></TableCell>
           <TableCell align="right" className="text-left" ><Skeleton variant="rect" width={111.38} height={24} /></TableCell>
           </TableRow>
           <TableRow>
           <TableCell ><Skeleton variant="rect" width={24} height={24} /></TableCell>
           <TableCell><Skeleton variant="rect" width={60} height={24} /></TableCell>
           <TableCell><Skeleton variant="rect" width={70} height={24} /></TableCell>  
           <TableCell align="right" className="text-left"  ><Skeleton variant="rect" width={30} height={24} /></TableCell>
           <TableCell align="right" className="text-left" ><Skeleton variant="rect" width={50} height={24} /></TableCell>
           <TableCell align="right" className="text-left" ><Skeleton variant="rect" width={78.44} height={22.5} /></TableCell>
           <TableCell align="right" className="text-left" ><Skeleton variant="rect" width={111.38} height={24} /></TableCell>
           </TableRow>
           <TableRow>
           <TableCell ><Skeleton variant="rect" width={24} height={24} /></TableCell>
           <TableCell><Skeleton variant="rect" width={60} height={24} /></TableCell>
           <TableCell><Skeleton variant="rect" width={70} height={24} /></TableCell>  
           <TableCell align="right" className="text-left"  ><Skeleton variant="rect" width={30} height={24} /></TableCell>
           <TableCell align="right" className="text-left" ><Skeleton variant="rect" width={50} height={24} /></TableCell>
           <TableCell align="right" className="text-left" ><Skeleton variant="rect" width={78.44} height={22.5} /></TableCell>
           <TableCell align="right" className="text-left" ><Skeleton variant="rect" width={111.38} height={24} /></TableCell>
           </TableRow>
           <TableRow>
           <TableCell ><Skeleton variant="rect" width={24} height={24} /></TableCell>
           <TableCell><Skeleton variant="rect" width={60} height={24} /></TableCell>
           <TableCell><Skeleton variant="rect" width={70} height={24} /></TableCell>  
           <TableCell align="right" className="text-left"  ><Skeleton variant="rect" width={30} height={24} /></TableCell>
           <TableCell align="right" className="text-left" ><Skeleton variant="rect" width={50} height={24} /></TableCell>
           <TableCell align="right" className="text-left" ><Skeleton variant="rect" width={78.44} height={22.5} /></TableCell>
           <TableCell align="right" className="text-left" ><Skeleton variant="rect" width={111.38} height={24} /></TableCell>
           </TableRow>
           <TableRow>
           <TableCell ><Skeleton variant="rect" width={24} height={24} /></TableCell>
           <TableCell><Skeleton variant="rect" width={60} height={24} /></TableCell>
           <TableCell><Skeleton variant="rect" width={70} height={24} /></TableCell>  
           <TableCell align="right" className="text-left"  ><Skeleton variant="rect" width={30} height={24} /></TableCell>
           <TableCell align="right" className="text-left" ><Skeleton variant="rect" width={50} height={24} /></TableCell>
           <TableCell align="right" className="text-left" ><Skeleton variant="rect" width={78.44} height={22.5} /></TableCell>
           <TableCell align="right" className="text-left" ><Skeleton variant="rect" width={111.38} height={24} /></TableCell>
           </TableRow>
          </React.Fragment>
        )
      }
    }

    const BasicPagination = () => {
      return(
        <div className={classes.root}>
        
        <Pagination count={pageNumber} page={page} onChange={handleChange} color="primary" />
        </div>
      )
    }


  return (
    <TableContainer component={Paper}>
    <SetPageValue/>
      <Table aria-label="collapsible table">
        <TableHead >
          <TableRow className="text-left">
            <TableCell >Details</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>  
            <TableCell align="right" className="text-left"  >Product Count</TableCell>
            <TableCell align="right" className="text-left" >Amount</TableCell>
            <TableCell align="right" className="text-left" >Status</TableCell>
            <TableCell align="right" className="text-left" >Update Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {loading && (
          <GetSkeleton/>
        )}
          {orders.map((order,index) => {
            if(index >= lowerBound && index <upperBound){
              return(
                <Row key={order._id}  order={order} />
              )
            }
          })}
        </TableBody>
      </Table>
      <div class="d-flex flex-row-reverse pt-2 pb-2">
          <BasicPagination/>
          </div>
      <StatusNotification  />
    </TableContainer>
  );
}

export default CollapsibleTable;
