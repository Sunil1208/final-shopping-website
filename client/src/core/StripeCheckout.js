import React, {useState, useEffect} from 'react';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/cartHelper';
import { Link } from 'react-router-dom';
import { API } from '../backend';
import { createOrder } from './helper/orderHelper';
import StripeCheckout from 'react-stripe-checkout';



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

    const token = isAuthenticated() && isAuthenticated().token
    const userId = isAuthenticated()  && isAuthenticated().user._id


    const makePayment = (token) => {
        const body = {
            token,
            products
        }

        const headers = {
            "Content-Type": "application/json"
        }
        return fetch(`${API}/stripepayment`,{
            method: "POST",
            headers,
            body: JSON.stringify(body)
        }).then(response => {
            console.log(`Response is : ${response}`)
            const {status} = response;
            console.log(`Status is: ${status}`);
            //TODO: call further methods
            
            const orderData = {
                products: products,
                transaction_id: status.id,
                amount: status.amount
                //TODO: read from the documentation for transaction id
                // transaction_id:

            }

            createOrder(userId, token, orderData)
            
            cartEmpty(() => {
                console.log("Did we get a crash")
            })
            setReload(!reload)

        })
        .catch(err => console.log(err))
    }

    const showStripeButton = () => {
        return isAuthenticated() ? (
            <StripeCheckout
                stripeKey="pk_test_YDzd1D2O1ZuqaMkdWJW6uig800lqISCReu"
                token={makePayment}
                amount={amount }
                name={`Buy ${count} Products`}
                // shippingAddress
                // billingAddress
            >
            <button className="btn btn-primary rounded-pill  btn-block">Pay with Stripe</button>
            </StripeCheckout>
        ) : (
            <Link to = "/signin">
            <h3 className="text-muted">You need to Sign in to Checkout</h3>
                <button className="btn btn-danger btn-block rounded-pill">Sign In</button>
            </Link>
        )
    }

    return (
        <div >
            {showStripeButton()}
            </div>
    )
}

export default StripeCheckoutComp;
