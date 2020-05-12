import React from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import admin from './admin.jpg';


const AdminDashBoard = () => {

    const {
        user: {name, email, role}
    } =isAuthenticated();

    const adminLeftSide = () => {
        return(
            <div className="card">       
                <h4 className="card-header" style={{backgroundColor:"#e4e4e4"}}>Admin Navigation</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/admin/create/category" className="nav-link text-primary" >
                        Create Categories
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/categories" className="nav-link text-primary" >
                        Manage Categories
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/create/product" className="nav-link text-primary" >
                        Create Product
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/products" className="nav-link text-primary" >
                        Manage Products
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/orders" className="nav-link text-primary" >
                        Manage Orders
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }

    const adminRightSide = () => {
        return(
            <div className="card mb-4" style={{backgroundColor:"#e4e4e4"}}>
                <h4 className="card-header border-dark">Admin Information</h4>
                <ul className="list-group">
                    <li className="list-group-item border-bottom-dark" style={{backgroundColor:"#e4e4e4"}}>
                        <span className="badge badge-primary mr-3 text-white">
                            Name 
                        </span>{name}
                    </li>
                    <li className="list-group-item border-bottom-dark " style={{backgroundColor:"#e4e4e4"}}>
                        <span className="badge badge-primary mr-3 ">
                            Email 
                        </span>{email}
                    </li>
                    <li className="list-group-item border-bottom-dark" style={{backgroundColor:"#e4e4e4"}}>
                        <span className="badge badge-danger mr-3">
                            Admin Privelege 
                        </span>
                    </li>
                </ul>
            </div>
        )
    }

    return(
        <Base 
            title="Welcome to the Admin Page" 
            description="Manage products here"
            className="container  p-4"
            photo={admin}
            >
            <div className="row mb-2 " style={{backgroundColor:"#241663"}}>
                <div className="col-3">
                    {adminLeftSide()}
                </div>
                <div className="col-9">
                    {adminRightSide()}
                </div>
            </div>
        </Base>        
    )
}

export default AdminDashBoard;