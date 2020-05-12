import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategories ,deleteCategory, getCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  // const preloadCategory = (categoryId) => {
  //   getCategory(categoryId).then(data => {
  //     if(data.error) {
  //       setValues({...values, error: data.error})
  //     } else {
  //       setValues({
  //         name: data.name,
  //         formData : new FormData()
  //       })
  //     }
  //   })
  // }

  useEffect(() => {
    preload();
  }, []);

  // const updateThisCategory = () => {

  // }

  const getCount = () => {
    let count = 0
    categories.map((cate,index) => {
      count= count+1
    })
    return count;
  }

  const deleteThisCategory = categoryId => {
      deleteCategory(categoryId, user._id, token).then( data => {
          if(data.error) {
              console.log(data.error);
          } else {
              preload();
          }
      })
  }

  return (
    <Base title="Welcome admin" description="Manage categories here">
      <h2 className="mb-4">All categories:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total {getCount()} categories</h2>

          {categories.map((cate, index) => {
            return (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-4">
                  <h3 className="text-white text-left">{cate.name}</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success"
                    to={`/admin/category/update/${cate._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button
                  onClick = { () => {
                      deleteThisCategory(cate._id);
                  }}
                    className="btn btn-danger"
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

export default ManageCategories;