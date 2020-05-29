import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import {removeItemFromCart } from './helper/cartHelper';
import ImageHelper1 from "./helper/ImageHelper1";
// import StripeCheckoutComp from "./StripeCheckout";
import BrainTreePayment from "../components/Payment/BraintreePayment";
import { Button } from "@material-ui/core";

import { Redirect, Link } from "react-router-dom";
import { Line } from "recharts";
import cart from '../resources/cart.jpg'
import { useGlobal } from 'reactn';




const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const [redirect,setRedirect] = useState(false)
  const [activeStep, setActiveStep] =useGlobal('activeStep');
  const [addressData,setaddressData] = useState({
    firstname:"aaa",
    lastname:"bbb",
    address_line1:"ccc",
    address_line2:"ccc",
    city:"asa",
    state: "ccv",
    zip_code:"12",
    country:"dsf"
  })




  const removefromCart = true

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const showRemoveFromCart = (removefromCart, product) => {
    return(
        removefromCart && (
          <button 
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload)
          }}
          type="submit" className="btn " style={{color:"black"}}>
          <i className="fa fa-trash"></i>
          </button>
        )
    )
}


  const loadAllProducts1 = products => {
    return (
            <div className="table-responsive table-hover">
            <table className="table rounded-pill">
              <thead>
                <tr>
                  <th scope="col-" className="border-top border-left border-bottom  text-white" style={{backgroundColor:"#5DD292"}}>
                    <div className="p-1 px-3 text-uppercase"><strong style={{fontWeight:"bolder"}}>Product</strong></div>
                  </th>
                  <th scope="col" className="border-top  border-bottom text-white" style={{backgroundColor:"#5DD292"}}>
                    <div className="py-1 text-uppercase"><strong style={{fontWeight:"bolder"}}>Price</strong></div>
                  </th>
                  <th scope="col" className="border-top  border-bottom text-white" style={{backgroundColor:"#5DD292"}}>
                    <div className="py-1 text-uppercase"><strong style={{fontWeight:"bolder"}}>Category</strong></div>
                  </th>
                  <th scope="col" className="border-top  border-bottom border-right text-white" style={{backgroundColor:"#5DD292"}}>
                    <div className="py-1 text-uppercase"><strong style={{fontWeight:"bolder"}}>Remove</strong></div>
                  </th>
                </tr>
              </thead>
              <tbody>            
              
              {products.map((product, index) => (
                
                <tr key={product._id} className="mt-3 mb-3  border-left border-right border-bottom" >
                  <td scope="row" className="border-0 text-dark">
                    <div className="p-1">
                    <ImageHelper1 product={product}/>
                      
                      <div className="ml-0 d-inline-block align-middle">
                        <h4 className="mb-0"> <a href="#" className="text-dark font-weight-bold d-inline-block align-middle">{product.name}</a></h4>
                      </div>
                    </div>
                  </td>
                  <td className="border-0 font-weight-bold align-middle text-dark text-lg"><h4 className="font-weight-bold">${product.price}</h4></td>
                  <td className="border-0 font-weight-bold align-middle text-dark"><h5 className="font-weight-bold" >{product.category.name}</h5></td>
                  <td className="border-0 font-weight-bold align-middle" >{showRemoveFromCart(removefromCart,product)}</td>
                  
                  </tr>
                
              ))}
              
            </tbody>
            </table>
            </div>
    );
  };



      const getSubTotal = () => {
        let amount = 0
        products.map((product, index) => {
            amount = amount + product.price;  
        })
        return amount
    }
    
    const getShippingCharges= () =>{
        let shippingcharge = 0.03*getSubTotal()
        shippingcharge=shippingcharge.toFixed(2)
        return shippingcharge;
    };
    const getTax = () => {
        let tax = 0.05 * getSubTotal()
        tax=tax.toFixed(2)
            console.log(`Tax is : ${tax}`)
        return tax;
    }
    
    const getCount = () => {
        let counter = 0;
        products.map((product,index) => {
            counter = counter+1
        })
        return counter;
    }
    // <StripeCheckoutComp  amount={getFinalPrice()*100} count={getCount()}  products={products} setReload={setReload} />
    
    const getFinalPrice = () => {
        let totalAmount = parseFloat(getSubTotal())  + parseFloat(getShippingCharges()) + parseFloat( getTax())
        totalAmount= totalAmount.toFixed(2)
        console.log(`Final amount is : ${totalAmount}`)
        return totalAmount;
    }

    const finalAmount = getFinalPrice()

    const getRedirect = (redirect) => {
      if(redirect){
        return(
          <Redirect to={{
            pathname: '/checkout',
            state: { amount: {finalAmount}, products:{products}, reload:{reload} }
        }}
        />
          
        )
      }
      
    }

    const handleCheckout = () => {
      setActiveStep(0)
      setRedirect(true)
    }

  return (
    <Base title="Cart Page" description="Ready to checkout">
    {products.length > 0 ? (
      <div className=" px-4 py-3 text-uppercase font-weight-bold text-center mt-4 mb-4" style={{backgroundColor:"#5DD292"}}>You have {getCount()} products in your cart</div>
    ) : (
      <React.Fragment> 
      <div className="container mt-5">
      <img src={cart} alt="cart" />
      <div className="px-4 py-4 text-uppercase text-dark font-weight-bold text-center mt-0 mb-4" style={{backgroundColor:"#f7f7f7"}}>Your cart is empty! <Link to='/allproducts' ><u >Shop Now</u></Link></div>
      </div>
          
      </React.Fragment>
      

    )}
      <div className="row text-center">
        <div className="col-6">
          {products.length > 0 ? (
            loadAllProducts1(products)
          ) : (
                <div></div>
            )}
        </div>
        <div className="col-6">
        {getRedirect(redirect)}
        {products.length > 0 ? (
            <div>
            <div className="border px-4 py-3 text-uppercase font-weight-bold" style={{backgroundColor:"#5DD292"}}>Order summary </div>
            <div className="p-4">
              <p className="font-italic mb-4 text-dark">Shipping charge is 3% and Tax is 5% of the total amount.</p>
              <ul className="list-unstyled mb-4">
                <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-dark">Order Subtotal </strong><strong className="text-dark">${getSubTotal()}.00</strong></li>
                <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-dark">Shipping and handling (3%)</strong><strong className="text-dark">${getShippingCharges()}</strong></li>
                <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-dark">Tax (5%)</strong><strong className="text-dark">${getTax()}</strong></li>
                <li className="d-flex justify-content-between py-3 border-bottom"><strong className="font-weight-bold  text-dark">Total</strong>
                  <h5 className="font-weight-bold text-dark">${getFinalPrice()}</h5>
                </li>
              </ul>
            </div>
            <Button variant="contained" className="btn  btn-block" onClick={handleCheckout}>Proceed to checkout</Button>

            </div>
          ) : (
            <div></div>
          )}
          
        </div>
      </div>
    </Base>
  );
};

export default Cart;