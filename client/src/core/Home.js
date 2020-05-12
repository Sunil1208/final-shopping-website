import React,{useState, useEffect} from 'react';
import '../styles.css';
import { API } from '../backend'
import Base from './Base'
import Card from './Card';
import { getProducts } from './helper/coreapicalls';
import { Redirect, Link } from 'react-router-dom';


const Home = () => {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false)

    const loadAllProducts = () => {
        getProducts().then(data => {
            if(data?.error) {
                setError(data.error)
            } else {
                setProducts(data);
            }
        })
    }

    useEffect( () => {
        loadAllProducts()
    }, [])
    const getARedirect = () => {
          return (
            <Redirect to="/allproducts" />
          )

      }
    
    
    return(
        <Base title="Home Page" description="Welcome to the ShopItEasy store">
        <div className="container">
            <div className="row text-center">
                <h1 className="text-white">Some of the products</h1>
                <div className="row">
                    {products.map((product, index) => {
                        if(index<6) {
                            return (
                                <div key={index} className="col-4 mb-4">
                                    <Card product={product}/>
                                </div>
                            )
                        }
                        
                    })}
                </div>
                <button className="btn btn-primary rounded-pill btn-block">
                <Link  className="nav-link" to="/allproducts">
                <i className="text-lg fa fa-lg" aria-hidden="true" style={{color:"white"}}> View all products</i>
                </Link>
                </button>
            </div>
            </div>
        </Base>
    )
}

export default Home;