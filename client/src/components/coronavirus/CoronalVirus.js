import React, {useState, useEffect} from 'react';
import Base from '../../core/Base';
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from
"mdbreact";
import { Redirect, Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import sanitizer from '../../resources/sanitizer.png'
import symptoms from '../../resources/symptoms.png'
import mask from '../../resources/mask.png'
import prevention from '../../resources/prevention.png'
import gloves from '../../resources/gloves.png'
import stop from '../../resources/stop.png'
import thankyou from '../../resources/thankyou.png'
import corona from '../../resources/corona.png'
import { getProducts } from '../../core/helper/coreapicalls';
import ItemCards from '../cards/Cards';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import hands from '../../resources/holdinghands.png'
import DeliveryParallaxView from './CoronaParallax';
import ProductCard from '../TestCards/Card2/ProductCard';
import AddToCartNotification from '../Notifications/Notification';
import CardSkeleton from '../cardSkeleton/CardSkeleton';



const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));



const CoronaPage = () => {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false)
    const [loading,setLoading] = useState(true)
    const [state,setState] = useState("allproducts")

    const loadAllProducts = () => {
        getProducts().then(data => {
            if(data?.error) {
                setError(data.error)
            } else {
                setProducts(data);
                setLoading(false)
            }
        })
    }

    useEffect( () => {
        loadAllProducts()
    }, [])

    const SimpleExpansionPanel = () => {
        const classes = useStyles();
      
        return (
          <div className="container">
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>View details and safety measures of COVID-19</Typography>
                
                </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                {CoronaInfo()}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        );
      }


    const CarouselPage = () => {
    return (
      <MDBContainer>
        <MDBCarousel
        activeItem={1}
        slide={true}
        length={5}

        showControls={true}
        showIndicators={true}
        className="z-depth-1"
      >
        <MDBCarouselInner>
          <MDBCarouselItem itemId="1">
            <MDBView >
            <Link to='/allproducts'>
              <img
                className="d-block w-100 img-fluid"
                style={{height:"410px"}}
                src={hands}
                alt="First slide"

              />
              </Link>
            <MDBMask overlay="black-light" />
            </MDBView>
            <MDBCarouselCaption>
              <Typography className="h3-responsive font-weight-bold" ><span style={{backgroundColor:"red"}}>#STAY HOME, STAY SAFE</span></Typography>
              </MDBCarouselCaption>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="2">
            <MDBView>
              <img
                className="d-block w-100"
                src={symptoms}
                alt="Second slide"
              />
            <MDBMask overlay="black-light" />
            </MDBView>
            <MDBCarouselCaption>
            <Typography className="h3-responsive font-weight-bold" ><span style={{backgroundColor:"red"}}>If you have any of the symptoms,</span> </Typography>
            <Typography className="h3-responsive font-weight-bold" ><span style={{backgroundColor:"red"}}>consult the doctor immediately.</span></Typography>
            </MDBCarouselCaption>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="3">
            <MDBView>
              <img
                className="d-block w-100"
                src={prevention}
                alt="Third slide"
              />
            <MDBMask overlay="black-light" />
            </MDBView>
            <MDBCarouselCaption>
            <Typography className="h3-responsive font-weight-bold" ><span style={{backgroundColor:"red"}}>Preventive measures you can follow.</span></Typography>
            </MDBCarouselCaption>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="4">
          <MDBView>
            <img
              className="d-block w-100"
              src={stop}
              alt="Third slide"
            />
          <MDBMask overlay="black-light" />
          </MDBView>
          <MDBCarouselCaption>
          <Typography className="h3-responsive font-weight-bold" ><span style={{backgroundColor:"red"}}>Most importantly, never forget to wear your mask whenever you go outdoors.</span></Typography>
          <Typography className="h3-responsive font-weight-bold" ><span style={{backgroundColor:"red"}}>At the end of the day, the goals are simple: safety and security.</span></Typography>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="5">
        <MDBView>
          <img
            className="d-block w-100"
            src={thankyou}
            alt="Third slide"
          />
        <MDBMask overlay="black-light" />
        </MDBView>
        <MDBCarouselCaption>
        <Typography className="h3-responsive font-weight-bold" ><span style={{backgroundColor:"red"}}>Don't forget to thank all the doctors and nurses, who are our frontline soldiers.</span></Typography>
        </MDBCarouselCaption>
      </MDBCarouselItem>
        </MDBCarouselInner>
      </MDBCarousel>
      </MDBContainer>
    );
    }

    const CoronaInfo = () => {
        return(
            <Paper elevation={14} className="border">
                <div className="row">
                    <div className="col-6" >
                        <Typography className="mt-2 text-center" style={{backgroundColor:"#5DD292"}} >Know about COVID-19<hr className="mt-0"></hr></Typography>
                        
                        <ul>
                            <li className="text-muted" >Coronavirus (COVID-19) is an illness caused
                            by a virus that can spread from person
                            to person.
                            </li>
                            <li className="text-muted" >
                            The virus that causes COVID-19 is a new
                            coronavirus that has spread throughout
                            the world. 
                            </li>
                            <li className="text-muted" >
                            COVID-19 symptoms can range from mild
                            (or no symptoms) to severe illness.
                            </li>
                        </ul>
                    </div>
                    <div className="col-6">
                            <Typography className="mt-2 text-center" style={{backgroundColor:"#5DD292"}}>Prevent the spread of
                            COVID-19 if you are sick<hr className="mt-0"></hr></Typography>
                            <ul>
                                <li className="text-muted" >
                                Stay home if you are sick,
                                except to get medical care.
                                </li>
                                <li className="text-muted" >
                                Avoid public transportation,
                                ride-sharing, or taxis.
                                </li>
                                <li className="text-muted" >
                                Separate yourself from other
                                people and pets in your home. 
                                </li>
                                <li className="text-muted" >
                                There is no specific treatment
                                for COVID-19, but you can seek
                                medical care to help relieve
                                your symptoms
                                </li>
                            </ul>
                            </div>
                </div>
                <div className="row">
                    
                    <div className="col-6">
                    <Typography className="mt-2 text-center" style={{backgroundColor:"#5DD292"}}>Practice social distancing<hr className="mt-0"></hr></Typography>
                        <ul>
                            <li className="text-muted" >
                            Buy groceries and medicine,
                            go to the doctor, and
                            complete banking activities
                            online when possible.
                            </li>
                            <li className="text-muted" >
                            If you must go in person,
                            stay at least 6 feet away from
                            others and disinfect items you
                            must touch.
                            </li>
                            <li className="text-muted" >
                            Get deliveries and takeout,
                            and limit in-person contact as
                            much as possible. 
                            </li>
                        </ul>
                    </div>
                    <div className="col-6">
                    <Typography className="mt-2 text-center" style={{backgroundColor:"#5DD292"}}>Know your risk for
                    severe illness<hr className="mt-0"></hr></Typography>
                    <ul>
                    <li className="text-muted">
                    Everyone is at risk of
                    getting COVID-19.
                    </li>
                    <li className="text-muted">
                    Older adults and people of
                    any age who have serious
                    underlying medical conditions
                    may be at higher risk for more
                    severe illness. 
                    </li>
                    </ul>
                    </div>
                </div>
                <div className="row">
                <div className="col-6">
                <Typography className="mt-2 text-center" style={{backgroundColor:"#5DD292"}}>Know how COVID-19 is spread<hr className="mt-0"></hr></Typography>
                <ul>
                    <li className="text-muted" >
                    You can become infected by coming into
                    close contact (about 6 feet or two
                    arm lengths) with a person who has
                    COVID-19. COVID-19 is primarily spread
                    from person to person.
                    </li>
                    <li className="text-muted" >
                    You can become infected from respiratory
                    droplets when an infected person coughs,
                    sneezes, or talks.
                    </li>
                    <li className="text-muted" >
                    You may also be able to get it by touching a
                    surface or object that has the virus on it, and
                    then by touching your mouth, nose, or eyes.
                    </li>

                </ul>
                </div>
                <div className="col-6">
                    <Typography className="mt-2 text-center" style={{backgroundColor:"#5DD292"}}>Protect yourself and others from COVID-19<hr className="mt-0"></hr></Typography>
                    <ul>
                            <li className="text-muted" >
                            There is currently no vaccine to protect
                            against COVID-19. The best way to protect
                            yourself is to avoid being exposed to the
                            virus that causes COVID-19
                            </li>
                            <li className="text-muted" >
                            Stay home as much as possible and avoid
                            close contact with others.
                            </li>
                            <li className="text-muted" >
                            Wear a cloth face covering that covers your
                            nose and mouth in public settings.
                            </li>
                            <li className="text-muted" >
                            Clean and disinfect frequently
                            touched surfaces.
                            </li>
                            <li className="text-muted" >
                            Wash your hands often with soap and water
                            for at least 20 seconds, or use an alcoholbased hand sanitizer that contains at least
                            60% alcohol.
                            </li>
                    </ul>
                    </div>
                           
                </div>
            </Paper>
        )
    }


    const CategoryName = 'Caps'
    const OriginPlace = 'India'

    const Products = (state) => {
        return (
            <div className="row">
                
            {products.map((product, index) => {
                if(state === 'allproducts'){
                    if((product.category.name === "Masks" || product.category.name === "Sanitizers" || product.category.name === "Gloves") && product.category.name != null) {
                        return (
                            <div key={index} className="col-4 mb-4">
                                <ProductCard product={product}/>
                            </div>
                        )
                    }
                } else {
                    if(product.category.name === state) {
                        return (
                            <div key={index} className="col-4 mb-4">
                                <ProductCard product={product}/>
                            </div>
                        )
                    }
                } 
                
            })}
        </div>
        )
    }

    const leftSide = () => {
        return(
            <div className="card mt-3">       
            <Typography className="card-header text-center font-weight-bold" style={{backgroundColor:"#5DD292"}} >Filters</Typography>
               
                <ul className="list-group"> 
                        <li style={{ listStyleType: "none" }} ><button onClick={() => {setState("allproducts")}}  className="btn btn-block  font-weight-bold pb-2 pt-2" style={{color:"#7c7575"}}>All Products</button></li>
                        <li style={{ listStyleType: "none" }} ><button onClick={() => {setState("Masks")}} className="btn btn-block  font-weight-bold pb-2 pt-2" style={{color:"#7c7575"}}>Masks</button></li>
                        <li style={{ listStyleType: "none" }} ><button onClick={() => {setState("Sanitizers")}} className="btn btn-block  font-weight-bold pb-2 pt-2" style={{color:"#7c7575"}}>Sanitizers</button></li>
                        <li style={{ listStyleType: "none" }} ><button onClick={() => {setState("Gloves")}} className="btn btn-block  font-weight-bold pb-2 pt-2" style={{color:"#7c7575"}}>Gloves</button></li>

                </ul>
            </div>
        )
    }

    const GetSkeleton = () => {
      return(
        <div className="row">
        <div className="col-4"> <CardSkeleton/></div>
        <div className="col-4"> <CardSkeleton/></div>
        <div className="col-4"> <CardSkeleton/></div>
        </div>
      )
    }




    return(
        <Base>
           
            <div className="container">
            {CarouselPage()}
            <div className="row mt-3 mb-3">
            {SimpleExpansionPanel()}
            </div>
            
            <div className="row">
              <div className="col-12"><DeliveryParallaxView/></div>
            <div className="col-2">
            {leftSide()}
            </div>
            
            <div className="col-10">
            {loading && (
              <GetSkeleton/>
            )}
                {Products(state)}
            </div>
            </div>
            </div>
            <AddToCartNotification/>
        </Base>
    )
}

export default CoronaPage;