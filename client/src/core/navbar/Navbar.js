// import React from 'react';
// import Navbar from 'react-bootstrap/Navbar';
// import {Button,FormControl, Nav,Form} from 'react-bootstrap';


// const NavbarFinal = () => {
//     return(
// <Navbar bg="light" variant="light" >
// <Navbar.Brand href="#home">Navbar</Navbar.Brand>
// <Nav className="mr-auto">
//   <Nav.Link href="#home">Home</Nav.Link>
//   <Nav.Link href="#features">Features</Nav.Link>
//   <Nav.Link href="#pricing">Pricing</Nav.Link>
// </Nav>
// <Form inline>
//   <FormControl type="text" placeholder="Search" className="mr-sm-2" />
//   <Button variant="outline-primary">Search</Button>
// </Form>
// </Navbar>
//     )
// }
// export default NavbarFinal;


import React, {  useState } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
import { BrowserRouter as Router, Link, Redirect } from 'react-router-dom';
import { isAuthenticated, signout } from "../../auth/helper";
import {BarLoader} from "react-spinners";
import { css } from "@emotion/core";
import { Typography } from "@material-ui/core";



const NavbarFinal = () => {

  const[isOpen,setIsOpen] = useState(false)
  const[redirect,setRedirect] = useState(false)
  const [loading, setLoading] = useState(false)
  const toggleCollapse = () => {
    setIsOpen(!isOpen)
  }

  const handleChange = () => {
    setLoading(false)
  }
  const getRedirect = (redirect) => {
    if(redirect){
      return(
        <React.Fragment>
        
        <Redirect to="/signin" />
        </React.Fragment>
      )
    }
  }

  const getUser = () => {
    const {user} = isAuthenticated()
    return user.name;
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
      <BarLoader
        css={override}
        color={"#123abc"}
        loading={loading}
        width={"400px"}
      />
      </div>
    )
    }
  }

  return (
<React.Fragment>
      <MDBNavbar  dark expand="md" style={{backgroundColor:"#F8F9FA"}}>
        <MDBNavbarBrand>
          <strong className="text-dark">ShopIt Easy</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem active>
              <MDBNavLink to="/" className="text-dark">Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <MDBNavLink to="/user/dashboard" className="text-dark">Dashboard</MDBNavLink>
              )}
              {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <MDBNavLink to="/admin/dashboard" className="text-dark">Dashboard</MDBNavLink>
              )}
              
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/cart" className="text-dark">Cart</MDBNavLink>
            </MDBNavItem>
            
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret className="text-dark">
                  <div className="d-none d-md-inline text-dark">Pages</div>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default text-dark">
                <MDBNavLink to="/allproducts" className="text-dark"><Typography>Products</Typography></MDBNavLink>
                <MDBNavLink to="/indianproducts" className="text-dark"><Typography>Vocal For Local</Typography></MDBNavLink>
                <MDBNavLink to="/coronavirus" className="text-dark"><Typography>COVID-19</Typography></MDBNavLink>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/contactus" className="text-dark">Contact Us</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
                {!isAuthenticated() && (
                  <React.Fragment>
                  <MDBNavLink to="/signup" onClick={() => {setLoading(true)}}  className="text-dark">Signup</MDBNavLink>
                  </React.Fragment>
                )}
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right className="mr-5">
        
            <MDBNavItem  >
              <MDBDropdown className="container"  >
                <MDBDropdownToggle nav caret className="text-dark" >
                  {!isAuthenticated() && (
                    <span className="font-weight-bold">Guest </span>
                  )}
                  {isAuthenticated() && (
                    <span className="font-weight-bold">{getUser()} </span>
                  )}
                  <MDBIcon icon="user" className="text-dark" />
                  
                </MDBDropdownToggle>
                {getRedirect(redirect)}
                <MDBDropdownMenu className="dropdown-dark dropdown-menu-left" >
                
                <MDBDropdownItem><MDBNavLink to="/" className="text-dark p-0">Home</MDBNavLink></MDBDropdownItem>
                  {!isAuthenticated() && (
                    <MDBDropdownItem><MDBNavLink to="/signin" className="text-dark p-0">Login</MDBNavLink></MDBDropdownItem>
                  )}
                  {!isAuthenticated() && (
                    <MDBDropdownItem  ><MDBNavLink to="/signup" className="text-dark p-0">Signup</MDBNavLink></MDBDropdownItem>
                  )}
                  {isAuthenticated() && (
                    <React.Fragment>
                    
                    <MDBDropdownItem  onClick={()=>signout( () => {setRedirect(true)} )}><span >Logout</span></MDBDropdownItem>
                    </React.Fragment>
                  )}
                  <MDBDropdownItem ><MDBNavLink to="/contactus" className="text-dark p-0">About Us</MDBNavLink></MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
          
        </MDBCollapse>
      </MDBNavbar>
      <div className="col-12">{loadingMessage(redirect)}</div>
      </React.Fragment>
    );
}

export default NavbarFinal;