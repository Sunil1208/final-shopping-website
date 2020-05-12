import React from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';



const UserDashBoard = () => {
    const {user} = isAuthenticated()
    const userRightSide = () => {
        return(
            <div className="card mb-4" style={{backgroundColor:"#e4e4e4"}}>
                <h4 className="card-header border-dark text-dark">User Information</h4>
                <ul className="list-group">
                    <li className="list-group-item border-bottom-dark" style={{backgroundColor:"#e4e4e4"}}>
                        <span className="badge badge-primary mr-3 text-white">
                            Name
                        </span><strong className="text-dark">{user.name}</strong>
                    </li>
                    <li className="list-group-item border-bottom-dark " style={{backgroundColor:"#e4e4e4"}}>
                        <span className="badge badge-primary mr-3 ">
                            Email 
                        </span><strong className="text-dark">{user.email}</strong>
                    </li>
                    <li className="list-group-item border-bottom-dark" style={{backgroundColor:"#e4e4e4"}}>
                        <span className="badge badge-danger mr-3">
                            User Privelege 
                        </span>
                    </li>
                </ul>
            </div>
        )
    }
    return(
        <Base title="User DashBoard" description={`Hello, ${user.name} welcome to your dashboard`}>
            <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
                {userRightSide()}
                <button className="btn btn-block btn-primary">
                <Link to="/" className="text-white" style={{fontWeight:"bold"}}>Go to Homepage</Link>
                </button>
            </div>
            </div>
            
        </Base>        
    )
}

export default UserDashBoard;