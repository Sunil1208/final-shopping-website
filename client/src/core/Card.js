import React, {useState, useEffect} from 'react';
import ImageHelper from './helper/ImageHelper';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/cartHelper';

const Card = ({
  product,addtoCart = true,
  removefromCart = false, 
  setReload= f => f ,
  reload = undefined}) => {
    
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);


    const cardTitle = product ? product.name : "A new product";
    const cardDescription = product ? product.description : "Description of the card"
    const cardPrice = product ? product.price : "Default"
    const cardCategory = product ? product.category.name : "product"


    const addToCart = () => {
      addItemToCart(product, () => setRedirect(true))
      
    }

    const getARedirect = (redirect) => {
      if(redirect) {
        return (
          <Redirect to="/cart" />
        )
      }
    }

    const showAddToCart = (addtoCart) => {
        return(
            addtoCart && (
                <button
                onClick={addToCart}
                className="btn btn-block btn-outline-primary mt-2 mb-2"
              >
                Add to Cart
              </button>
            )
        )
    }

    const showRemoveFromCart = (removefromCart) => {
        return(
            removefromCart && (
                <button
                onClick={() => {
                  removeItemFromCart(product._id);
                  setReload(!reload)
                }}
                className="btn btn-block btn-outline-danger mt-2 mb-2"
              >
                Remove from cart
              </button>
            )
        )
    }
    
    
    return (
      <div className="card text-white  border border-info " style={{backgroundColor:"#A7C9C9"}}>
        <div className="card-header lead" style={{backgroundColor:"#070739"}}>{cardTitle}<br></br>
          <div className="badge badge-dark">Category: {cardCategory}</div>
        </div>
        <div className="card-body">
          {getARedirect(redirect)}
          <ImageHelper product={product}/>
          <p className="lead font-weight-normal text-wrap" style={{backgroundColor:"none"}}>
            {cardDescription}
          </p>
          <p className="btn btn-primary rounded  btn-sm px-4">$ {cardPrice}</p>
          <div className="row">
            <div className="col-12">
              {showAddToCart(addtoCart)}
            </div>
            <div className="col-12">
              {showRemoveFromCart(removefromCart)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Card;