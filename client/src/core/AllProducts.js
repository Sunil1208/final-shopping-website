import React,{useState, useEffect} from 'react';
import '../styles.css';
import { API } from '../backend'
import Base from './Base'
import Card from './Card';
import { getProducts } from './helper/coreapicalls';
import ItemCards from '../components/cards/Cards';
import SkeletonLoading from '../components/skeleton/SkeletonLoading';
import {PacmanLoader, ScaleLoader,PulseLoader} from "react-spinners";
import { css } from "@emotion/core";
import ProductCard from '../components/TestCards/Card2/ProductCard';
import AddToCartNotification from '../components/Notifications/Notification';
import CardSkeleton from '../components/cardSkeleton/CardSkeleton';



const AllProducts = () => {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false)
    const [loading,setLoading] = useState(true)

    const loadAllProducts = () => {
        getProducts().then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setProducts(data);
                setLoading(false)
            }
        })
    }

    useEffect( () => {
        loadAllProducts()
    }, [])

    const skeletonLoading = () => {
        if(loading){
            return(
              <React.Fragment>
              <div className="col-12 text-center mt-3">
                {loadingMessage(loading)}
              </div>
              <div className="col-4 mb-4 mt-5">
                  <CardSkeleton/>
              </div>
              <div className="col-4 mb-4 mt-5">
              <CardSkeleton/>
              </div>
           <div className="col-4 mb-4 mt-5">
           <CardSkeleton/>
              </div>
              <div className="col-4 mb-4 mt-5">
              <CardSkeleton/>
          </div>
          <div className="col-4 mb-4 mt-5">
          <CardSkeleton/>
          </div>
       <div className="col-4 mb-4 mt-5">
       <CardSkeleton/>
          </div>
              </React.Fragment>
              
            )
        }
    }

    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    `;

  const loadingMessage = (loading) => {
    if(loading){
      return(
        <div className="sweet-loading">
        <PulseLoader
          css={override}
          
          color={"#1eb2a6"}
          loading={loading}
        />
        </div>
      )
    }
  }

  const leftSide = () => {
     //
  }

    
    
    
    return(
        <Base title="All Products" description="You are viewing all the products">
        <div className="row text-center">
        <div className=" col-12 text-white text-center badge mt-3 py-2" style={{backgroundColor:"#5DD292"}}><strong><h1>You are viewing All Products</h1></strong></div>
        </div>
        <div className="container">

            <div className="row text-center">
            {skeletonLoading()}
            <div className="col-12">
            
            <br></br>
            <div className="row">
                {products.map((product, index) => {
                 
                        return (
                            <div key={index} className="col-4 mb-4 mt-5">
                                <ProductCard product={product}/>
                            </div>
                        )
                })}
            </div>
                </div>
            </div>
            </div>
            <AddToCartNotification/>
        </Base>
    )
}

export default AllProducts;