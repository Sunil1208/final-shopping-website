import React, {Fragment} from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";

import home from './home.svg'


const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#FFFFFF" };
  }
};
const getUser = () => {
  const {user} = isAuthenticated()
  return user.name;
}
const Menu = ({ history }) => (

  <div >
    <ul className="nav nav-tabs p-3" style={{backgroundColor:"#5DD292"}}>
    {!isAuthenticated() && (
      <li className="nav-item">
        <Link style={currentTab(history, "/")} className="nav-link" to="/">
        <i className="fa fa-user  fa-lg" aria-hidden="true" style={{color:"white"}}> Guest</i>
        </Link>
      </li>

    )}

    {isAuthenticated() && (
      <li className="nav-item">
        <Link style={currentTab(history, "/")} className="nav-link" to="/">
        <i className="fa fa-user fa-lg" aria-hidden="true" style={{color:"white"}}> {getUser()}</i>
        </Link>
      </li>

    )}

      <li className="nav-item">
        <Link style={currentTab(history, "/")} className="nav-link" to="/">
        <i className="fa fa-home fa-lg" aria-hidden="true" style={{color:"white"}}> Home</i>
        </Link>
      </li>
      <li className="nav-item">
        <Link
          style={currentTab(history, "/cart")}
          className="nav-link"
          to="/cart"
        >
        <i className="fa fa-shopping-cart fa-lg p-0" aria-hidden="true" style={{color:"white"}}> Cart</i>

          
        </Link>
      </li>
     
      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <li className="nav-item">
        <Link
          style={currentTab(history, "/user/dashboard")}
          className="nav-link"
          to="/user/dashboard"
        ><i className="fa fa-th-large fa-lg" aria-hidden="true" style={{color:"white"}}> Dashboard</i>
        </Link>
      </li>
      )}

      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <li className="nav-item">
        <Link
          style={currentTab(history, "/admin/dashboard")}
          className="nav-link"
          to="/admin/dashboard"
        >
        <i className="fa fa-th-large fa-lg"  aria-hidden="true" style={{color:"white"}}> Dashboard</i>
        </Link>
      </li>
      )}

      {!isAuthenticated() && (
        <Fragment>
        <li className="nav-item">
          <Link
            style={currentTab(history, "/signup")}
            className="nav-link"
            to="/signup"
          ><i className="fas fa-user-plus fa-lg" style={{color:"white"}}> Signup</i>
            
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={currentTab(history, "/signin")}
            className="nav-link"
            to="/signin"
          ><i className="fas fa-sign-in-alt fa-lg" style={{color:"white"}}> Sign In</i>
            
          </Link>
        </li>
       
        </Fragment>
      )}
      {isAuthenticated() && (
        <li className="nav-item">
          <span
            className="nav-link text-warning"
            onClick={() => {
              signout( () => {
                history.push('/');
              })
            }}
          >
          <i className="fas fa-sign-out-alt fa-lg" style={{color:"white"}}> Signout</i>
           
          </span>
      </li>
      ) }
    </ul>
  </div>
);

export default withRouter(Menu);