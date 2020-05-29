import React,{useState,useEffect} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { getAllOrder, getUser } from '../../admin/helper/adminapicall';
import { isAuthenticated } from '../../auth/helper';
import CountUp from 'react-countup';
import {ScaleLoader} from "react-spinners";
import { MDBAnimation } from "mdbreact";

import { css } from "@emotion/core";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
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

    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    `;
  

    const LoadingMessage = (loading) => {
      if(loading){
        return(
          
          <MDBAnimation type="lightSpeedIn" >
          <Typography component={"span"} >Loading Amount</Typography>
          <div className="sweet-loading">
          <ScaleLoader
            css={override}
            color={"#123abc"}
            loading={loading}
          />
          </div>
        </MDBAnimation>
         
          
        )
      }
    }

    useEffect(() => {
        preload();
    }, [])


    const getTotalAmount = () => {
      let totalAmount = 0
      orders.map((order,index) => {
        totalAmount=totalAmount+order.amount
      })

      return totalAmount
    }
    const FinalAmount=getTotalAmount()
    console.log(`Final amount is ${FinalAmount}`)

    const getDate = () => {
      const todayDate = new Date()
      var options = { weekday: 'long'};
      var dayTemp=new Intl.DateTimeFormat('en-US', options).format(todayDate)
      var dateTemp = todayDate.getDate()
      const month=['January','February','March','April','May','June','July','August','September','October','November','December']
      var tempMonthDigit = todayDate.getMonth()
      var tempMonth = month[tempMonthDigit]
      var tempYear = todayDate.getFullYear()
      const finalDate = `${dayTemp} ${dateTemp} ${tempMonth} ${tempYear}`
      return finalDate;
    }


  return (
    <React.Fragment>
      <Title>Total Deposits</Title>
      <Typography component="p" variant="h4">
      {loading === true ? (
        <LoadingMessage/>
      ): (
        <span>
        <CountUp decimals={2} start={0} end={FinalAmount} />$</span>
      )}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        till {getDate()}
      </Typography>
    </React.Fragment>
  );
}
