import React, { useState, useEffect } from "react";

import Base from "../core/Base";
import { Link } from "react-router-dom";

import { getProducts, deleteProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import ImageHelper1 from "../core/helper/ImageHelper1";


const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getProducts().then(data => {
      if (data?.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const getCount = () => {
    let count = 0;
    products.map((product,index) => {
      count=count+1
    })
    return count;
  }

  const deleteThisProduct = productId => {
    deleteProduct(productId, user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
        <br></br>
         <h1 className="text-center"><span className="badge badge-primary">Total {getCount()} products</span></h1>

          {products.map((product, index) => {
            return (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-4">
                <ImageHelper1 product={product}/>
                  <h5 className="text-white text-center">{product.name}</h5>
                  
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-primary btn-lg  mt-3"
                    to={`/admin/product/update/${product._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                      deleteThisProduct(product._id);
                    }}
                    className="btn btn-danger btn-lg mt-3"
                  >
                    Delete
                  </button>
                </div>
              </div>
              
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default ManageProducts;