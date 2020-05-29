import React,{useState,useEffect} from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import { getAllOrder } from '../../admin/helper/adminapicall';
import { isAuthenticated } from '../../auth/helper';





export default function Chart() {
  const theme = useTheme();

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

    // Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}
const data = [
  // createData('00:00', 0),
  // createData('03:00', 300),
  // createData('06:00', 600),
  // createData('09:00', 800),
  // createData('12:00', 1500),
  // createData('15:00', 2000),
  // createData('18:00', 2400),
  // createData('21:00', 2400),
  // createData('24:00', undefined),
];

const chartData = (orders) => {
  orders.map((order,index) => {
    let date = formatDate(order.createdAt)
    date = date.slice(0,10)
    console.log(`Date sliced is ${date}`)
    const tempdata=createData(date,order.amount)
    console.log(tempdata)
    data.push(tempdata)
    console.log(data) 
  })
  // createData('00:00', 0),
  // createData('03:00', 300),
  // createData('06:00', 600),
  // createData('09:00', 800),
  // createData('12:00', 1500),
  // createData('15:00', 2000),
  // createData('18:00', 2400),
  // createData('21:00', 2400),
  // createData('24:00', undefined),
};


  return (
    <React.Fragment>
      <Title>Present Sales Graph</Title>
      {chartData(orders)}
      <ResponsiveContainer>
      
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Total Sales ($)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
