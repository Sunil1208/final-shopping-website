import React, {useState, useEffect} from 'react';
import { createProduct, getCategories } from './helper/adminapicall';
import { Link } from 'react-router-dom';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { css } from "@emotion/core";
import {RotateLoader, ScaleLoader} from "react-spinners";
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { Button } from '@material-ui/core';


const useStyles1 = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const AddProduct = () => {

    const {user, token} = isAuthenticated();

    const [open, setOpen] = useState(true);

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        origin:"",
        stock : "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        error: "",
        createdProduct : "",
        getaRedirect: false,
        formData: ""
    })

    const {
      name,
      description,
      price,
      stock,
      categories,
      category,
      origin,
      loading,
      error,
      createdProduct,
      getaRedirect,
      formData
    } = values;

    const preload = () => {
      getCategories().then( data => {
        console.log(data);
        
        if(data.error) {
          setValues({
            ...values,
            error: data.error
          })
        } else {
          setValues({...values,categories: data, formData: new FormData()})
          console.log(categories);
          
        }
      })
    }

    useEffect( () => {
      preload();
    }, [])

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: "", loading: true})
        createProduct(user._id,token, formData)
          .then(data => {
            if(data.error) {
              setValues({...values, error:data.error})
            } else{
              setValues({
                ...values,
                name: "",
                description: "",
                origin:"",
                price: "",
                photo: "",
                stock: "",
                loading: false,
                createdProduct: data.name
              })
            }
          })
    }

    const handleChange = name => event => {
        const value = name ==="photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({
          ...values,
          [name]: value
        })
    }

    const ColorAlerts = () => {
      const classes = useStyles1();
      if(createdProduct){
        return(
          <div className={classes.root} style={{display: createdProduct ? "": "none"}}>
              <div className="row">
              <div className="col-12">
              <Alert variant="filled" severity="success" color="success" action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setValues({...values, createdProduct: ""})
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              } > 
                Product added successfully.
              </Alert>
              </div>
              </div>
          </div>
        )
      } else{
        return(
          <div className={classes.root} style={{display: error ? "": "none"}}>
          <div className="row">
            <div className="col-12">
            <Alert variant="filled" severity="warning" color="warning" action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setValues({...values, error: ""})
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            } >
            Error : {error}
            </Alert>
            </div>
          </div>
        </div>
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
          <ScaleLoader
            css={override}

            color={"#123abc"}
            loading={loading}
          />
          </div>
        )
      }
    }

    const productForm = () => (
        <form className="pt-3 pb-3">
          <div className="form-group">
            <label className="btn btn-block btn-primary" >
              <input
              className="text-white"
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="Upload photo"
                
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
            //   value={description}
            />
          </div>
          <div className="form-group">
          <input
              onChange={handleChange("origin")}
              name="origin"
              className="form-control"
              placeholder="Origin (optional)"
              value={origin}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
              {categories &&
              categories.map((cate, index) => (
                <option key={index} value={cate._id}>{cate.name}</option>
              ))} 
              
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
          </div>
    
          <Button
            type="submit"
            color="primary"
            variant="contained"
            onClick={onSubmit}
            className=" mb-3 text-white font-weight-bold"
            
          >
            Add Product
          </Button>
        </form>
      );

    return (
            <div className="row border rounded" style={{backgroundColor:"#E4E4E4"}}>
            <div className="col-12 text-center text-white font-weight-bold pt-3 pb-3" style={{backgroundColor:"#3F51B5"}}><span className="display-5">Add Product here</span></div>
                <div className="col-md-8 offset-md-2">
                <div className="col-12 text-center p-3" >
                  {loadingMessage(loading)}
                  {ColorAlerts()}
                </div>   
                {productForm()}
                </div>
            </div>
    )
}

export default AddProduct;