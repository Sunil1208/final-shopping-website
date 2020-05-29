import React,{useState} from "react";
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from
"mdbreact";
import { Redirect, Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import  bwGirl from '../../resources/blackwhite.jpg';
import shoes from '../../resources/shoes.jpg';
import outdoor from '../../resources/outdoor.jpg'
import blazer from '../../resources/blazer.jpg';
import tshirt from '../../resources/tshirt.jpg';
import goggles from '../../resources/goggles.jpg'
import corona from '../../resources/corona.png'
import sanitizer from '../../resources/sanitizer.png'
import mask from '../../resources/mask.png'
import gloves from '../../resources/gloves.png'
import local from '../../resources/local.jpg'
import sale from '../../resources/sale.jpg'

const CarouselPage = () => {

    const [redirect,setRedirect] = useState(false)
    const [state, setState] = useState(0)
    const getRedirect = () => {
        if(state===1){
            return(
                
                <Redirect to="/coronavirus"/>
            )
        } else if(state===2){
          return(
              <Redirect to="/allproducts"/>
          )
      } else if(state ===3) {
        return(
          <Redirect to='/indianproducts'/>
        )
      }
       
    }

  return (
    <MDBContainer>
      <MDBCarousel
      activeItem={1}
      slide={true}
      length={11}
      
      showControls={true}
      showIndicators={true}
      className="z-depth-1"
    >
    {getRedirect(state)}
      <MDBCarouselInner>
      <MDBCarouselItem itemId="1">
          <MDBView onClick={() => {setState(1)}}>
          <Link to='/coronavirus'>
            <img
              className="d-block w-100 img-fluid"
              style={{height:"410px"}}
              src={corona}
              alt="First slide"
              
            />
            </Link>
          <MDBMask overlay="black-slight" />
          </MDBView>
          <MDBCarouselCaption className="text-center" >
            <h3 className="h6-responsive" ><span style={{backgroundColor:"red"}}>Delivery at your Doorstep</span></h3>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="2">
          <MDBView onClick={() => {setState(1)}}>
          <Link to='/coronavirus'>
            <img
              className="d-block w-100 img-fluid"
              style={{height:"410px"}}
              src={sale}
              alt="First slide"
              
            />
            </Link>
          <MDBMask overlay="black-slight" />
          </MDBView>
          <MDBCarouselCaption className="text-right" >
            <h3 className="h6-responsive" >Applicable on all products</h3>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="3">
          <MDBView onClick={() => {setState(3)}}>
          <Link to='/indianproducts'>
            <img
              className="d-block w-100 img-fluid"
              style={{height:"410px"}}
              src={local}
              alt="First slide"
              
            />
            </Link>
          <MDBMask overlay="black-slight" />
          </MDBView>
          <MDBCarouselCaption>
            <h3 className="h3-responsive"><span style={{backgroundColor:"red"}}>Empowering local products</span></h3>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="4">
          <MDBView onClick={() => {setState(1)}}>
          <Link to='/coronavirus'>
            <img
              className="d-block w-100 img-fluid"
              style={{height:"410px"}}
              src={sanitizer}
              alt="First slide"
              
            />
            </Link>
          <MDBMask overlay="black-slight" />
          </MDBView>
          <MDBCarouselCaption>
            <h3 className="h3-responsive"><span style={{backgroundColor:"red"}}>We've got a whole lot of in stock</span></h3>
          </MDBCarouselCaption>
        </MDBCarouselItem>
      <MDBCarouselItem itemId="5">
          <MDBView onClick={() => {setState(1)}}>
          <Link to='/coronavirus'>
            <img
              className="d-block w-100 img-fluid"
              style={{height:"410px"}}
              src={mask}
              alt="First slide"
              
            />
            </Link>
          <MDBMask overlay="black-slight" />
          </MDBView>
          <MDBCarouselCaption>
            <h3 className="h3-responsive"><span style={{backgroundColor:"red"}}>The ultimate weapon again COVID-19 and yes we'are delivering them</span></h3>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="6">
          <MDBView onClick={() => {setState(2)}}>
          <Link to='/allproducts'>
            <img
              className="d-block w-100 img-fluid"
              style={{height:"410px"}}
              src={gloves}
              alt="First slide"
              
            />
            </Link>
          <MDBMask overlay="black-slight" />
          </MDBView>
          <MDBCarouselCaption>
            <h3 className="h3-responsive"><span style={{backgroundColor:"red"}}>Keep yourself safe by using high quality gloves</span></h3>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="7">
          <MDBView onClick={() => {setState(2)}}>
          <Link to='/allproducts'>
            <img
              className="d-block w-100 img-fluid"
              style={{height:"410px"}}
              src={bwGirl}
              alt="First slide"
              
            />
            </Link>
          <MDBMask overlay="black-slight" />
          </MDBView>
          <MDBCarouselCaption>
            <h3 className="h3-responsive"><span style={{backgroundColor:"red"}}>Whole new collection for women</span></h3>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="8">
          <MDBView onClick={() => {setState(2)}} >
          <Link to='/allproducts'>
            <img
              className="d-block w-100"
              src={outdoor}
              alt="Second slide"
            />
            </Link>
          <MDBMask overlay="black-slight" />
          </MDBView>
          <MDBCarouselCaption>
            <h3 className="h3-responsive"><span style={{backgroundColor:"red"}}>Awsome outdoor collections</span></h3>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="9">
          <MDBView onClick={() => {setState(2)}} >
          <Link to='/allproducts'>
            <img
              className="d-block w-100"
              src={tshirt}
              alt="Third slide"
            />
            </Link>
          <MDBMask overlay="black-slight" />
          </MDBView>
          <MDBCarouselCaption>
            <h3 className="h3-responsive"><span style={{backgroundColor:"red"}}>Tshirts that you can count on</span></h3>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="10">
        <MDBView>
          <img
            className="d-block w-100"
            src={goggles}
            alt="Third slide"
          />
        <MDBMask overlay="black-slight" />
        </MDBView>
        <MDBCarouselCaption>
          <h3 className="h3-responsive"><span style={{backgroundColor:"red"}}>Going somewhere, don't forget your goggles</span></h3>
          <p><span style={{backgroundColor:"red"}}>High quality goggles</span></p>
        </MDBCarouselCaption>
      </MDBCarouselItem>
      <MDBCarouselItem itemId="11">
      <MDBView>
        <img
          className="d-block w-100"
          src={shoes}
          alt="Third slide"
        />
      <MDBMask overlay="black-slight" />
      </MDBView>
      <MDBCarouselCaption>
        <h3 className="h3-responsive"><span style={{backgroundColor:"red"}}>Shoes that never leaves you</span></h3>
      </MDBCarouselCaption>
    </MDBCarouselItem>
      </MDBCarouselInner>
    </MDBCarousel>
    </MDBContainer>
  );
}

export default CarouselPage;