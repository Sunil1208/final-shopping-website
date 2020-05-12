import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
 import { getProducts } from './helper/coreapicalls';
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "react-stripe-checkout";
import ImageHelper from './helper/ImageHelper';
import { addItemToCart, removeItemFromCart } from './helper/cartHelper';
import ImageHelper1 from "./helper/ImageHelper1";
import StripeCheckoutComp from "./StripeCheckout";






const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  const addtoCart = false;
  const removefromCart = true

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = products => {
    return (
      <div>
      <div className="bg-dark rounded-pill px-4 py-3 text-uppercase font-weight-bold">You have {getCount()} product in the cart </div>
      <br></br>  
      {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            addtoCart={false}
            removefromCart={true}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };
  const showRemoveFromCart = (removefromCart, product) => {
    return(
        removefromCart && (
          <button 
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload)
          }}
          type="submit" className="btn btn-block" style={{color:"white"}}>
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
                  <th scope="col-" className="border-0 bg-dark text-white">
                    <div className="p-1 px-3 text-uppercase">Product</div>
                  </th>
                  <th scope="col" className="border-0 bg-dark text-white">
                    <div className="py-1 text-uppercase">Price</div>
                  </th>
                  <th scope="col" className="border-0 bg-dark text-white">
                    <div className="py-1 text-uppercase">Category</div>
                  </th>
                  <th scope="col" className="border-0 bg-dark text-white">
                    <div className="py-1 text-uppercase">Remove</div>
                  </th>
                </tr>
              </thead>
              <tbody>            
              
              {products.map((product, index) => (
                
                <tr key={index}>
                  <td scope="row" className="border-0 text-white">
                    <div className="p-1">
                    <ImageHelper1 product={product}/>
                      
                      <div className="ml-0 d-inline-block align-middle">
                        <h5 className="mb-0"> <a href="#" className="text-white d-inline-block align-middle">{product.name}</a></h5>
                      </div>
                    </div>
                  </td>
                  <td className="border-0 align-middle text-white text-lg"><strong>${product.price}</strong></td>
                  <td className="border-0 align-middle text-white"><strong>{product.category.name}</strong></td>
                  <td className="border-0 align-middle">{showRemoveFromCart(removefromCart,product)}</td>
                </tr>
              ))}
              
            </tbody>
            </table>
            </div>
    );
  };


  

  const loadCheckout = () => {
    return (
      <div>
      <div className="bg-dark rounded-pill px-4 py-3 text-uppercase font-weight-bold">You have {getCount()} products in the cart </div>
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

const getFinalPrice = () => {
    let totalAmount = parseFloat(getSubTotal())  + parseFloat(getShippingCharges()) + parseFloat( getTax())
    totalAmount= totalAmount.toFixed(2)
    console.log(`Final amount is : ${totalAmount}`)
    
    return totalAmount;
}

  return (
    <Base title="Cart Page" description="Ready to checkout">
    {products.length > 0 ? (
      <div className="bg-dark rounded-pill px-4 py-3 text-uppercase font-weight-bold text-center mb-4">You have {getCount()} products in your cart</div>
    ) : (
      <div className="bg-dark rounded-pill px-4 py-3 text-uppercase font-weight-bold text-center mb-4">You have no products in your cart</div>

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
        {products.length > 0 ? (
            <div>
            <div className="bg-dark  px-4 py-3 text-uppercase font-weight-bold">Order summary </div>
            <div className="p-4">
              <p className="font-italic mb-4">Shipping charge is 3% and Tax is 5% of the total amount.</p>
              <ul className="list-unstyled mb-4">
                <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-white">Order Subtotal </strong><strong>${getSubTotal()}.00</strong></li>
                <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-white">Shipping and handling (3%)</strong><strong>${getShippingCharges()}</strong></li>
                <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-white">Tax (5%)</strong><strong>${getTax()}</strong></li>
                <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-white">Total</strong>
                  <h5 className="font-weight-bold">${getFinalPrice()}</h5>
                </li>
              </ul>
              <StripeCheckoutComp className="btn btn-dark rounded-pill py-2 btn-block" amount={getFinalPrice()*100} count={getCount()}  products={products} setReload={setReload} />
            </div>
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