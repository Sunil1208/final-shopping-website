import React,{useState,useEffect} from 'react';
import { isAuthenticated } from '../../auth/helper';
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
import { getUserOrder } from '../../user/helper/userapicalls';
import { getUser } from '../../admin/helper/adminapicall';


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
    const { order,user} = props;
    const {token} = isAuthenticated();
  
    const [open, setOpen] = React.useState(false);
    const [userDetails, setUserDetails] = useState([])
    const classes = useRowStyles();
    const [orderStatus, setOrderStatus] = useState(order.status)

    const getElementCount = (order) => {
        return order.products.length;
    }
  
  
  
  
  const preload = () => {
    getUser(order.user._id, token).then(data => {
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
  
    // const something = () => {
    //   {order.products.map((data) => (
    //     <TableRow key={data._id}>
    //       <TableCell component="th" scope="row">
    //         {data.name}
    //       </TableCell>
    //       <TableCell>{data._id}</TableCell>
    //       <TableCell>{data.count}</TableCell>
    //       <TableCell align="right">{data.price}</TableCell>
    //     </TableRow>
    //   ))}
    // }
  
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
        </StyledTableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Details
                </Typography>
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
                  <caption style={{captionSide:"top"}} className="mt-1 mb-1"><strong>Transaction Details</strong></caption>
                  <TableHead>
                    <TableRow>
                      <TableCell>Transaction ID</TableCell>
                      <TableCell >Mode of Payment</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    
                      <TableRow >
                        <TableCell component="th" scope="row">
                          {order.transaction_id}
                        </TableCell>
                        <TableCell>{order.paymentMode}</TableCell>
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
  

//   const test  = () => {
//     if(order.user._id===user._id){
//         return(
//           <Row key={order._id}  order={order} user={user} />
//         )
//     }
//   }


const UserPurchases = () => {

    const [orders,setOrders] = useState([])

    const {user,token} = isAuthenticated()

    const preload = () => {
        getUserOrder(user._id, token).then(data => {
            if(data?.error) {
                console.log(data.error)
            } else {
                setOrders(data)
            }
        })
    }

    useEffect(() => {
        preload();
    }, [])


    return(
        <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead >
          <TableRow className="text-left">
            <TableCell >Details</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email ID</TableCell>  
            <TableCell align="right" className="text-left"  >No. of Purchases</TableCell>
            <TableCell align="right" className="text-left"  >Amount</TableCell>
            <TableCell align="right" className="text-left"  >Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => {
              if(order.user._id === user._id){
                  return(
                    <Row key={order._id}  order={order} user={user} />
                  )
                
              }
            
            
          })}
        </TableBody>
      </Table>
    </TableContainer>
    )
}

export default UserPurchases;