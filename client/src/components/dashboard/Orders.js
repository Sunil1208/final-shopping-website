import React,{useState,useEffect} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { getAllOrder, getUser } from '../../admin/helper/adminapicall';
import { isAuthenticated } from '../../auth/helper';
import Skeleton from 'react-loading-skeleton';



// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
    const classes = useStyles();

    const [orders,setOrders] = useState([])
    const {user, token} = isAuthenticated();
    const [loading,setLoading] = useState(true)
    const preload = () => {
      getAllOrder(user._id, token).then(data => {
          if(data?.error) {
              setLoading(false)
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

  const recentOrder  = () => {
    let orderLength = orders.length;
    const index = orderLength-5;
    return index;
  }

  const GetSkeleton = () => {
    if(loading){
      return(
        <React.Fragment>
        <TableRow>
            <TableCell><Skeleton variant="rect" width={180} height={20} /></TableCell>
            <TableCell><Skeleton variant="rect" width={70} height={20} /></TableCell>
            <TableCell><Skeleton variant="rect" width={90} height={20} /></TableCell>
            <TableCell><Skeleton variant="rect" width={110} height={20} /></TableCell>
            <TableCell ><Skeleton variant="rect" width={60} height={24} /></TableCell>
            <TableCell><Skeleton variant="rect" width={40} height={20} /></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Skeleton variant="rect" width={180} height={20} /></TableCell>
            <TableCell><Skeleton variant="rect" width={70} height={20} /></TableCell>
            <TableCell><Skeleton variant="rect" width={90} height={20} /></TableCell>
            <TableCell><Skeleton variant="rect" width={110} height={20} /></TableCell>
            <TableCell ><Skeleton variant="rect" width={60} height={24} /></TableCell>
            <TableCell><Skeleton variant="rect" width={40} height={20} /></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Skeleton variant="rect" width={180} height={20} /></TableCell>
            <TableCell><Skeleton variant="rect" width={70} height={20} /></TableCell>
            <TableCell><Skeleton variant="rect" width={90} height={20} /></TableCell>
            <TableCell><Skeleton variant="rect" width={110} height={20} /></TableCell>
            <TableCell ><Skeleton variant="rect" width={60} height={24} /></TableCell>
            <TableCell><Skeleton variant="rect" width={40} height={20} /></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Skeleton variant="rect" width={180} height={20} /></TableCell>
            <TableCell><Skeleton variant="rect" width={70} height={20} /></TableCell>
            <TableCell><Skeleton variant="rect" width={90} height={20} /></TableCell>
            <TableCell><Skeleton variant="rect" width={110} height={20} /></TableCell>
            <TableCell ><Skeleton variant="rect" width={60} height={24} /></TableCell>
            <TableCell><Skeleton variant="rect" width={40} height={20} /></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Skeleton variant="rect" width={180} height={20} /></TableCell>
            <TableCell><Skeleton variant="rect" width={70} height={20} /></TableCell>
            <TableCell><Skeleton variant="rect" width={90} height={20} /></TableCell>
            <TableCell><Skeleton variant="rect" width={110} height={20} /></TableCell>
            <TableCell ><Skeleton variant="rect" width={60} height={24} /></TableCell>
            <TableCell><Skeleton variant="rect" width={40} height={20} /></TableCell>
          </TableRow>
          
        </React.Fragment>
      )
    }
  }




  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Order Status</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell>Transaction ID</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {loading && (
          <GetSkeleton/>
        )}
          {orders.map((order,index) => {
            if(index >= recentOrder()){
             return(
              <TableRow key={order._id}>
              <TableCell>{formatDate(order.createdAt)}</TableCell>
              <TableCell>{order.user.name}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{order.paymentMode}</TableCell>
              <TableCell>{order.transaction_id}</TableCell>
              <TableCell align="right">{order.amount}</TableCell>
            </TableRow>
             )
            }
            
          })}
        </TableBody>
      </Table>
     
    </React.Fragment>
  );
}
