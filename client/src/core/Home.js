import React,{useState, useEffect} from 'react';
import '../styles.css';
import { API } from '../backend'
import Base from './Base'
import Card from './Card';
import { getProducts } from './helper/coreapicalls';
import { Redirect, Link } from 'react-router-dom';
import ItemCards from '../components/cards/Cards';
import ParallaxView from './parallax/Parallax';
import SkeletonLoading from '../components/skeleton/SkeletonLoading';
import NavbarFinal from './navbar/Navbar';
import Footer1 from './footer/Footer1';
import CarouselPage from '../components/carousel/CarouselMdBootstrap';
import ProductCard from '../components/TestCards/Card2/ProductCard';
import AddToCartNotification from '../components/Notifications/Notification';
import Coverflow from 'react-coverflow';
import { Typography } from '@material-ui/core';
import HomeParallax from './homeparallax/HomeParallax';
import Skeleton from 'react-loading-skeleton';




const Home = () => {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false)
    const [loading,setLoading] = useState(true)

    const loadAllProducts = () => {
        getProducts().then(data => {
            if(data?.error) {
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
    
      const SkeletonLoading = () => {
          if(loading){
              return(
                <React.Fragment>
                  <Skeleton variant="rect" width={1110} height={500} />
                </React.Fragment>
                
              )
          }
      }

      const fn = function () {
        /* do your action */
      }
      
      const CarouselthreeD = () => {
          return(
            <Coverflow width="1110" height="500"
            displayQuantityOfSide={2}
            infiniteScroll={true}
            navigation={false}
            enableScroll={true}
            clickable={true}
            active={0}
            currentFigureScale={0.8}
            otherFigureScale={0.4}
            
          >
          
            <div
              onClick={() => fn()}
              onKeyDown={() => fn()}
              role="menuitem"
              tabIndex="0"
            ><ProductCard product={products[0]} />
              
              />
            </div>
            <ProductCard product={products[1]} />
            <ProductCard product={products[2]} />
            <ProductCard product={products[3]} />
            <ProductCard product={products[4]} />
            <ProductCard product={products[5]} />
            <ProductCard product={products[6]} />
            <ProductCard product={products[7]} />
            <ProductCard product={products[8]} />
            <ProductCard product={products[9]} />
            
          </Coverflow>
          )
      }
    
    return(
        <React.Fragment>
        <div style={{background:" linear-gradient(to right, #8e9eab, #eef2f3)"}}>
        <NavbarFinal/>
        
        <CarouselPage/>
        <div className="container ">
          <HomeParallax/>  
        </div>  
        <div className="container mb-5"> 
          
            <div className="row text-center">
          
            
                <div className="row text-center mt-3">
                <div className="container-fluid ml-1">
                <button className="btn  btn-block mt-3" style={{backgroundColor:"#E0E0E0"}}>
                
                <Link  className="nav-link">
                <i className="text-lg fa fa-lg" aria-hidden="true" style={{color:"black"}}> Some of the products that we offer</i>
                </Link>
                </button>
                </div>
                <div className="container-fluid ml-3" >
               
               {loading === true ? (
                    <SkeletonLoading/>
               ):(
                  <CarouselthreeD/>
               )}
              
                </div>
                <div className="container-fluid ml-1">
                <button className="btn  btn-block mb-5" style={{backgroundColor:"#E0E0E0"}}>   
                <Link  className="nav-link" to="/allproducts">
                <i className="text-lg fa fa-lg" aria-hidden="true" style={{color:"black"}}> View all products</i>
                </Link>
                </button>
                </div>             
                </div>     
            </div>
            </div>
            </div>
            
            <AddToCartNotification />
            <Footer1/>
        </React.Fragment>
    )
}

export default Home;