import React,{useState} from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import SettingsIcon from '@material-ui/icons/Settings';
import UserPurchases from '../components/userPurchases/UserPurchase';




const AdminDashBoard = () => {

    const [state,setState] = useState(0);

    const {
        user: {name, email, role}
    } =isAuthenticated();


    const renderItem = () => {
        if(state === 0){
            return(adminRightSide())
        } else if(state === 1) {
            return(<UserPurchases/>)
        }
    }

    const adminLeftSide = () => {
        return(
            <div className="card">       
                <h4 className="card-header" style={{backgroundColor:"#5DD292"}}>User Navigation</h4>
                <ul className="list-group"> 
                        <li style={{ listStyleType: "none" }} ><button onClick={() => (setState(0))} className="btn btn-block  font-weight-bold pb-2 pt-2" style={{color:"#7c7575"}}>My info</button></li>
                        <li style={{ listStyleType: "none" }} ><button onClick={() => (setState(1))} className="btn btn-block  font-weight-bold pb-2 pt-2" style={{color:"#7c7575"}}>My Purchases</button></li>

                </ul>
            </div>
        )
    }

    const adminRightSide = () => {
        return(
            <div className="card " style={{backgroundColor:"#5DD292"}}>
                <h4 className="card-header border-dark">My Information</h4>
                <ul className="list-group">
                    <li className="list-group-item border-bottom-dark" style={{backgroundColor:"#e4e4e4"}}>
                        <span className="badge badge-primary mr-3 text-white">
                            Name 
                        </span><span className="text-dark">{name}</span>
                    </li>
                    <li className="list-group-item border-bottom-dark " style={{backgroundColor:"#e4e4e4"}}>
                        <span className="badge badge-primary mr-3 ">
                            Email 
                        </span><span className="text-dark">{email}</span>
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
        <Base>
        <div className="container">
        <div className="text-center text-white mb-3 mt-3 pt-1 pb-1" style={{backgroundColor:"#5DD292"}}><span><h1 >User Dashboard</h1></span></div>
                <div className="row">
                <div className="col-3">
                {adminLeftSide()}
                </div>
                <div className="col-9">
                    {renderItem()}
                </div>
                </div>
                </div>
        </Base>      
    )
}

export default AdminDashBoard;