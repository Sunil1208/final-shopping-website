import React,{useState, useEffect} from 'react';
import { loadCart, cartEmpty } from '../../core/helper/cartHelper';
import { Link } from 'react-router-dom';
import { getMeToken, processTransaction } from '../../core/helper/paymentBraintreeHelper';
import { createOrder } from '../../core/helper/orderHelper';
import { isAuthenticated } from '../../auth/helper';
import DropIn from 'braintree-web-drop-in-react';
import { MDBAnimation } from "mdbreact";
import { useGlobal } from 'reactn';
import { Button } from '@material-ui/core';


const BrainTreePayment = ({
    products,
    amount,
    address,
    setReload = f => f,
    reload = undefined
}) => {

    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance : {}
    });
    const [activeStep, setActiveStep] =useGlobal('activeStep');
    const [transactionSuccess,setTransactionSuccess] = useState(false)
    const [orderID,setOrderID] = useGlobal('orderID')

    const token = isAuthenticated() && isAuthenticated().token
    const userId = isAuthenticated()  && isAuthenticated().user._id


    const getToken = (userId, token) => {
        
        getMeToken(userId, token).then(info => {
            console.log(info)
            if(info.error){
                setInfo({...info, error: info.error})
            } else {
                const clientToken = info.clientToken;
                setInfo({clientToken})
            }
        })
    }

    const showBraintreeDropIn = () => {
        return(
            <div>
            {info.clientToken !== null && products.length > 0 ? (
                <div>
                <DropIn
                    options={{ authorization: info.clientToken }}
                    onInstance={(instance) => (info.instance = instance)}
                />
                {!transactionSuccess ? (
                    <Button variant="contained" className="btn btn-block" onClick={onPurchase}>Buy</Button>
                ) : (
                    <Button className="btn btn-block" disabled onClick={onPurchase}>Buy</Button>
                )}
                 
                </div>
            ):(<h3>
                <MDBAnimation type="bounce" infinite>
            Loading... Please wait
            </MDBAnimation>
                </h3>)}   
            </div>
        )
    }


    useEffect(() => {
        getToken(userId, token)
    },[])


    const onPurchase = () => {
        setInfo({loading:true})
        
        let nonce;
        let getNonce = info.instance
            .requestPaymentMethod()
            .then(data => {
                nonce = data.nonce
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount:amount
                };
                processTransaction(userId, token, paymentData)
                .then(response => {
                    console.log(response)
                    setInfo({...info, success: response.success, loading:false})
                    console.log(`PAYMENT SUCCESS`)
                    setOrderID(response.transaction.id)
                    const orderData = {
                        products: products,
                        address:address,
                        transaction_id: response.transaction.id,
                        paymentMode: response.transaction.paymentInstrumentType,
                        amount: response.transaction.amount,
                        cardType:response.transaction.creditCard.cardType,
                        cardNumber:response.transaction.creditCard.maskedNumber,
                    }

                    createOrder(userId, token, orderData)
                    //empty the cart
                    cartEmpty(() => {
                        console.log('Did we get a crash')
                    })
                    //TODO: force reload
                    
                    setActiveStep(activeStep+1)
                    setTransactionSuccess(true)
                })
                .catch(error => {
                    setInfo({loading: false, success: false})
                    console.log(`PAYMENT FAILED`)
                })
            })
    }


    return(
        <div className="mt-5">
        {showBraintreeDropIn()}
        </div>
        
    )
}

export default BrainTreePayment;