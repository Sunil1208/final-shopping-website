import React from 'react';
import Menu from './Menu';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
const Base = ({
    title = "My Title",
    description="My description",
    className="text-white p-0",
    photo="",
    children
}) => {

    const {user} = isAuthenticated();

    return(
        <div>
        <Menu />
            <div className="container">
                <div className="jumbotron  text-white text-center" style={{backgroundColor:"#070739"}}>
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>                    
                </div>
                <div className={className}>{children}</div>
            </div>
            <footer className="footer mt-4 py-3 border rounded" style={{backgroundColor:"#070739"}}>
                <div className="container-fluid  text-white text-center py-3">
                    <h4>If you got any questions, feel free to reach out!</h4>
                    <button className="btn btn-primary btn-lg">
                    <Link to="/contactus" className="text-white">Contact Us</Link>
                    </button>                    
                </div>
                <div className="container">
                <div className="row">
                <div className="col-md-6">
                <span className="text-muted">
                An amazing place to <span className="text-white">SHOP</span> online
            </span>
                </div>
                <div className="col-md-6 text-right text-white">
                <span>Follow us on 
                <a href="#" style={{color:"white"}}><i className="fab fa-instagram fa-lg ml-2"></i></a> 
                <a href="#" style={{color:"white"}}><i class="fab fa-facebook fa-lg ml-2"></i></a>
                <a href="#" style={{color:"white"}}><i class="fab fa-twitter fa-lg ml-2"></i></a>
                <a href="#" style={{color:"white"}}><i class="fab fa-google-plus-g fa-lg ml-2"></i></a>

                </span>
                
                </div>
                </div>
                <h5 className="text-white text-center">&copy; Sunil1208</h5>
                </div>
            </footer>
        </div>
    )
}

export default Base;