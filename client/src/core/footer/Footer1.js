import React from 'react';
import { Link } from 'react-router-dom';
import ContactMailIcon from '@material-ui/icons/ContactMail';

const Footer1=() => {
    return(
        <React.Fragment>
        <footer className="page-footer font-small blue-grey lighten-5">

        <div style={{backgroundColor:"#21d192"}}>
          <div className="container">
            <div className="row py-4 d-flex align-items-center">
      

              <div className="col-md-6 col-lg-5 text-center text-md-left mb-4 mb-md-0">
                <h5 className="mb-0"><strong>Get connected with us on social networks!</strong></h5>
              </div>

      

              <div className="col-md-6 col-lg-7 text-center text-md-right">
      

                <a className="fb-ic">
                  <i className="fab fa-facebook-f fa-lg white-text mr-4"> </i>
                </a>

                <a className="tw-ic">
                  <i className="fab fa-twitter fa-lg white-text mr-4"> </i>
                </a>

                <a className="gplus-ic">
                  <i className="fab fa-google-plus-g fa-lg white-text mr-4"> </i>
                </a>

                <a className="li-ic">
                  <i className="fab fa-linkedin-in fa-lg white-text mr-4"> </i>
                </a>

                <a className="ins-ic">
                  <i className="fab fa-instagram fa-lg white-text"> </i>
                </a>
      
              </div>      
            </div>
      
          </div>
        </div> 
        <div className="container text-center text-md-left mt-5">
      

          <div className="row mt-3 dark-grey-text">
      

            <div className="col-md-3 col-lg-4 col-xl-3 mb-4">
      
              <h6 className="text-uppercase font-weight-bold">ShopIt Easy</h6>
              <hr className="teal accent-3 mb-4 mt-0 d-inline-block mx-auto" style={{width: "60px"}}></hr>
              <p>We provide a wide range of clothing products ranging from basic clothing to all the fashion accessories you need. We offer the best quality products.</p>
              <p ><Link style={{color:"blue"}} to="/contactus"><strong style={{fontWeight:"bolder"}}><ContactMailIcon/>{"  "} Get in touch with us </strong></Link></p>
              <p ><Link style={{color:"blue"}} to="/testimonial"><strong style={{fontWeight:"bolder"}}><i className="fas fa-info mr-3"></i> {" "} Testimonial</strong></Link></p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
      
              <h6 className="text-uppercase font-weight-bold">Products</h6>
              <hr className="teal accent-3 mb-4 mt-0 d-inline-block mx-auto" style={{width: "60px"}}></hr>
              <p>
                <a className="dark-grey-text" href="#!">Basic Clothings</a>
              </p>
              <p>
                <a className="dark-grey-text" href="#!">Accessories</a>
              </p>
              <p>
                <a className="dark-grey-text" href="#!">Latest Trends</a>
              </p>
              <p>
                <a className="dark-grey-text" href="#!">Personal Care</a>
              </p>
      
            </div>
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
      
              <h6 className="text-uppercase font-weight-bold">Useful links</h6>
              <hr className="teal accent-3 mb-4 mt-0 d-inline-block mx-auto" style={{width: "60px"}}></hr>
              <p>
                <a className="dark-grey-text" href="#!">Your Account</a>
              </p>
              <p>
                <a className="dark-grey-text" href="#!">Become an Affiliate</a>
              </p>
              <p>
                <a className="dark-grey-text" href="#!">Shipping Rates</a>
              </p>
              <p>
                <a className="dark-grey-text" href="#!">Help</a>
              </p>
      
            </div>
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
      

              <h6 className="text-uppercase font-weight-bold">Contact</h6>
              <hr className="teal accent-3 mb-4 mt-0 d-inline-block mx-auto" style={{width: "60px"}}></hr>
              <p>
                <i className="fas fa-home mr-3"></i> Jalandhar, 144411, INDIA</p>
              <p>
                <i className="fas fa-envelope mr-3"></i> skmy03@gmail.com</p>
              <p>
                <i className="fas fa-phone mr-3"></i> + 01 234 567 89</p>
              <p>
                <i className="fas fa-print mr-3"></i> + 01 234 567 89</p>
                <p><Link to="/testimonial" className="text-primary"><i className="fas fa-print mr-3"></i>  Testimonial</Link>
                </p>
                
      
            </div>
      
          </div>

      
        </div>
        <div className="footer-copyright text-center text-black-50 py-3">© 2020 Copyright:
          <a className="dark-grey-text" href="https://www.facebook.com/profile.php?id=100003672910922"> Sunil_Kumar</a>
        </div>
      
      </footer>
        </React.Fragment>
    )
}


export default Footer1;