import React, {useState, useEffect} from 'react';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/cartHelper';
import { Link, Redirect } from 'react-router-dom';
import { API } from '../backend';
import { createOrder } from './helper/orderHelper';
import StripeCheckout from 'react-stripe-checkout';
import WarningIcon from '@material-ui/icons/Warning';



const StripeCheckoutComp = ({
    products,
    amount,
    count,
    setReload = f =>f, 
    reload = undefined
}) => {

    console.log(`Amount received in stripe is : ${amount}`)
    const [data, setData] = useState({
        loading: false,
        success: false,
        error: "",
        address: ""
    })

    const [redirect,setRedirect] = useState(false)

    const token = isAuthenticated() && isAuthenticated().token
    const userId = isAuthenticated()  && isAuthenticated().user._id


    const makePayment = (token) => {
        const body = {
            token,
            products
        }

        const headers = {
            "Content-Type": "application/json"
        };
        return fetch(`${API}/stripepayment`,{
            method: "POST",
            headers,
            body: JSON.stringify(body)
        }).then(response => {
            console.log(response)
            const {status, source,balance_transaction, charge} = response;
            console.log(response.customer);
            console.log(source);
            console.log(balance_transaction)
            console.log(charge)

            
            //TODO: call further methods
            
            // const orderData = {
            //     products: products,
            //     transaction_id: status.id,
            //     amount: status.amount
            //     //TODO: read from the documentation for transaction id
            //     // transaction_id:

            // }

            // createOrder(userId, token, orderData)
            
            // cartEmpty(() => {
            //     console.log("Did we get a crash")
            // })
            // setReload(!reload)

        })
        .catch(err => console.log(err))
    }

        const getRedirect = (redirect) => {
           if(redirect){
            return(
                <Redirect to="/signin"/>
            )
           }
        }
    const showStripeButton = () => {
        return isAuthenticated() ? (
            <StripeCheckout
                stripeKey="pk_test_lMs9VbUKOsRkrLuTUStY17ZN00Obqux36q"
                token={makePayment}
                amount={amount }
                name={`Buy ${count} Products`}
                // shippingAddress
                // billingAddress
            >
            <button  className="btn   btn-block text-white font-weight-bold" style={{backgroundColor:"#5DD292"}}><h5>Pay with Stripe</h5></button>
            </StripeCheckout>
        ) : (
            <React.Fragment>
            {getRedirect(redirect)}
            <h4 className="text-muted"><WarningIcon/>You need to Sign in to Checkout</h4>
                <button onClick={() => setRedirect(true)} className="btn  btn-block " style={{backgroundColor:"#5DD292"}}><h5 className="text-white font-weight-bold" >Sign In</h5></button>
            </React.Fragment>
        )
    }

    return (
        <div >
            {showStripeButton()}
            </div>
    )
}

export default StripeCheckoutComp;
