import React, { useState, useEffect } from 'react';
import { getAllOrder, getUser } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper';
import { Typography, Paper } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const useStyles1 = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));


const OrderPage = () => {

    const [orders,setOrders] = useState([])
    const {user, token} = isAuthenticated();

    const preload = () => {
        getAllOrder(user._id, token).then(data => {
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

    const CustomizedTables = (orders) => {
      const classes = useStyles();
      return (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <StyledTableCell>User name</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
                <StyledTableCell align="right">Transaction ID</StyledTableCell>
                <StyledTableCell align="right">Order Status</StyledTableCell>
                <StyledTableCell align="right">Order Placed on</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => {
                return(
                 
              <StyledTableRow key={order._id}>
              <StyledTableCell >
                {order.user.name}
              </StyledTableCell>
              <StyledTableCell >{order.user.email}</StyledTableCell>
              <StyledTableCell >{order.transaction_id}</StyledTableCell>
              <StyledTableCell >{order.status}</StyledTableCell>
              <StyledTableCell >{order.createdAt}</StyledTableCell>
            </StyledTableRow>
                )
                
    })}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }

    const SimpleExpansionPanel = () => {
        const classes = useStyles1();
      
        return (
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>View details and safety measures of COVID-19</Typography>
                
                </ExpansionPanelSummary>
              <ExpansionPanelDetails>
               <p>HEllo</p>
              </ExpansionPanelDetails>
            </ExpansionPanel>
        );
      }

    // const getParticularUser = (userId) => {
    //     getUser(userId, token).then(data => {
    //         if(data?.error) {
    //             console.log(data.error)
    //         } else {
    //             return data.name;
    //         }
    //     })
    // }

    const ViewDetails = () => {
        return(
            <Paper>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <Typography>Full Name : </Typography>
                            <Typography>Email ID  :</Typography>
                            <Typography></Typography>
                        </div>
                        <div className="col-6">
                            <Typography>Order amount   :</Typography>
                            <Typography>Order ID       :</Typography>
                            <Typography>Transaction ID :</Typography>
                            <Typography>Order Status   :</Typography>
                        </div>
                    </div>
                        <div className="row">
                            <h1>Purchases</h1>
                        </div>
                    </div>
            </Paper>
        )
    }

    const loadAllProducts1 = orders => {
        return (
                <div className="table-responsive table-hover">
                <table className="table rounded-pill">
                  <thead>
                    <tr>
                      <th scope="col-" className="border-top border-left border-bottom  text-white" style={{backgroundColor:"#5DD292"}}>
                        <div className="p-1 px-3 text-uppercase text-center"><Typography variant="subtitle2" gutterBottom>User name</Typography></div>
                      </th>
                      <th scope="col" className="border-top  border-bottom text-white" style={{backgroundColor:"#5DD292"}}>
                        <div className="py-1 text-uppercase text-center"><Typography variant="subtitle2" gutterBottom>Email ID</Typography></div>
                      </th>
                      <th scope="col" className="border-top  border-bottom text-white" style={{backgroundColor:"#5DD292"}}>
                        <div className="py-1 text-uppercase text-center"><Typography variant="subtitle2" gutterBottom>Order amount</Typography></div>
                      </th>
                      <th scope="col" className="border-top  border-bottom  text-white" style={{backgroundColor:"#5DD292"}}>
                        <div className="py-1 text-uppercase text-center"><Typography variant="subtitle2" gutterBottom>Transaction ID</Typography></div>
                      </th>
                      <th scope="col" className="border-top  border-bottom  text-white" style={{backgroundColor:"#5DD292"}}>
                        <div className="py-1 text-uppercase text-center"><Typography variant="subtitle2" gutterBottom>Order ID</Typography></div>
                      </th>
                      <th scope="col" className="border-top  border-bottom border-right text-white" style={{backgroundColor:"#5DD292"}}>
                        <div className="py-1 text-uppercase text-center"><Typography variant="subtitle2" gutterBottom>Order status</Typography></div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>            
                  
                  {orders.map((order, index) => (
                    <tr key={index} className="mt-3 mb-3  border-left border-right border-bottom" onClick={() => SimpleExpansionPanel()} >
                    <td className="border-0 font-weight-bold align-middle text-center text-sm text-dark"><Typography variant="subtitle2" className=" font-weight-bold">{order.user.name} {order.user.lastname}</Typography></td>
                    <td className="border-0 font-weight-bold align-middle text-center text-sm text-dark"><Typography variant="subtitle2" className=" font-weight-bold">{order.user.email}</Typography></td>
                    <td className="border-0 font-weight-bold align-middle text-center text-sm text-dark"><Typography variant="subtitle2" className=" font-weight-bold">{order.amount}</Typography></td>
                    <td className="border-0 font-weight-bold align-middle text-center text-sm text-dark"><Typography variant="subtitle2" className=" font-weight-bold" >{order.transaction_id}</Typography></td>
                    <td className="border-0 font-weight-bold align-middle text-center text-sm text-dark"><Typography variant="subtitle2" className=" font-weight-bold" >{order._id}</Typography></td>
                    <td className="border-0 font-weight-bold align-middle text-center text-sm text-dark"><Typography variant="subtitle2" className=" font-weight-bold" >{order.status}</Typography></td>
                    </tr>
                      
                  ))}
                  
                </tbody>
                </table>
                </div>
        );
      };

    return(
        <div className="container">
            <div className="row">
                <div className="col-12">
                {CustomizedTables(orders)}
                </div>
            </div>
        </div>
    )
}

export default OrderPage;