import React, {useState} from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import { createCategory } from './helper/adminapicall';
import { css } from "@emotion/core";
import {RotateLoader, ScaleLoader} from "react-spinners";
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import SimpleBackdrop from '../core/backdrop/Backdrop';
import { Button } from '@material-ui/core';


const useStyles1 = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));


const AddCategory = () => {

    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const { user, token } = isAuthenticated();

    const goBack = () => (
        <div className="mt-5">
            <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">Admin Home</Link>
        </div>
    )

    const handleChange = event => {
        setError("");
        setName(event.target.value);
    }

    const onSubmit = event => {
        event.preventDefault();
        setError("");
        setSuccess(false)
        setLoading(true)

        //backend request fired
        createCategory(user._id,token, {name})
            .then( data => {
                if(data.error){
                    setError(true)
                    setLoading(false)
                } else {
                    setError("");
                    setSuccess(true);
                    setLoading(false);
                    setName("");
                }
            })
    }

    const successMessage = () => {
        if(success){
            return(
                <h4 className="text-success">Category created successfully
                </h4>
            )
        }
    }

    const warningMessage = () => {
        if(error){
            return(
                
                <h4 className="text-success">Failed to create category</h4>
            )
        }
    }

    const categoryForm = () => {
        return(
            <form>
            <div className="form-group">
                <input 
                    type="text"
                    className="form-control my-3"
                    onChange={handleChange}
                    value = {name}
                    autoFocus
                    required
                    placeholder="For eg. Jeans"
                />
                <Button variant="contained" color="primary" onClick={onSubmit} className="btn btn-outline text-white" >Create Category</Button>
            </div>
        </form>
        )
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


    const ColorAlerts = () => {
        const classes = useStyles1();
        if(success){
          return(
            <div className={classes.root} style={{display: success ? "": "none"}}>
                <div className="row">
                <div className="col-12">
                <Alert variant="filled" severity="success" color="success" action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setSuccess(false)
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                } > 
                  Category created successfully.
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
                    setError(false)
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              } >
              Error : Failed to create category.
              </Alert>
              </div>
            </div>
          </div>
          )    
        }
      }

    return (
                <div className="row  rounded" style={{backgroundColor:"#E4E4E4"}}>
                <div className="col-12 text-center text-white font-weight-bold pt-3 pb-3" style={{backgroundColor:"#3F51B5"}}><span className="display-5">Add Category</span></div>
                    <div className="col-md-8 offset-md-2">
                    <div className="col-12 text-center pt-3">
                    {loadingMessage(loading)}
                    {ColorAlerts()}
                    </div>   
                    {categoryForm()}
                    </div>
                </div>
    )
}

export default AddCategory;