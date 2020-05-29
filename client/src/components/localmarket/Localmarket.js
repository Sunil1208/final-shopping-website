import React, {useState, useEffect} from 'react'
import Base from '../../core/Base'
import { MDBCarousel, MDBIcon, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from
"mdbreact";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import support from '../../resources/support.jpg';
import local from '../../resources/local.jpg'
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import women from '../../resources/women.jpg'
import charkha from '../../resources/charkha.jpg'
import { getProducts } from '../../core/helper/coreapicalls';
import ItemCards from '../cards/Cards';
import child from '../../resources/child.png'
import ProductCard from '../TestCards/Card2/ProductCard';
import AddToCartNotification from '../Notifications/Notification';
import Avatar from '@material-ui/core/Avatar';
import CardSkeleton from '../cardSkeleton/CardSkeleton';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    large: {
      width: theme.spacing(15),
      height: theme.spacing(15),
      marginLeft:"40%",
      marginBottom:"3%",
      marginTop:"0%"
    },
  }));

const IndianProducts = () => {
  const classes = useStyles()

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

    const CarouselPage = () => {
        return (
          <MDBContainer>
            <MDBCarousel
            activeItem={1}
            slide={true}
            length={3}
    
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
                    src={support}
                    alt="First slide"
    
                  />
                  </Link>
                <MDBMask overlay="black-slight" />
                </MDBView>
                <MDBCarouselCaption>
                  <Typography className="h3-responsive font-weight-bold" ><span style={{backgroundColor:"red"}}>#Support local products</span></Typography>
                  </MDBCarouselCaption>
              </MDBCarouselItem>
              <MDBCarouselItem itemId="2">
                <MDBView >
                  <img
                    className="d-block w-100 img-fluid"
                    style={{height:"410px"}}
                    src={local}
                    alt="First slide"
    
                  />

                <MDBMask overlay="black-slight" />
                </MDBView>
                <MDBCarouselCaption>
                  <Typography className="h3-responsive font-weight-bold" ><span style={{backgroundColor:"red"}}>#Be Vocal for Local</span></Typography>
                  </MDBCarouselCaption>
              </MDBCarouselItem>
              <MDBCarouselItem itemId="3">
                <MDBView >

                  <img
                    className="d-block w-100 img-fluid"
                    style={{height:"410px"}}
                    src={child}
                    alt="First slide"
    
                  />

                <MDBMask overlay="black-slight" />
                </MDBView>
                <MDBCarouselCaption >
                  <Typography className="h3-responsive font-weight-bold" ><span style={{backgroundColor:"red"}}>For every local product you purchase,</span></Typography>
                  <Typography className="h3-responsive font-weight-bold" ><span style={{backgroundColor:"red"}}>we pay 2% of it to the local charity for child education.</span></Typography>
                  </MDBCarouselCaption>
              </MDBCarouselItem>
            </MDBCarouselInner>
          </MDBCarousel>
          </MDBContainer>
        );
        }

        const LocalPageInfoLeft = () => {
            return (
              <MDBContainer>
                <section className="text-center text-dark my-5">
                  <h2 className="h1-responsive font-weight-bold my-3">
                    Why purchase local products?
                  </h2>
          
                  <MDBCarousel activeItem={1} length={1} testimonial interval={false} showIndicators={false} className="no-flex">
                    <MDBCarouselInner>
                      <MDBCarouselItem itemId="1">
                      <div className="contianer">
                          <Avatar className={classes.large}>
                            <img src={charkha} className="rounded-circle img-fluid" style={{width:"170px",height:"170px"}}
                              alt="" />
                          </Avatar>
                          <p className="text-justify">
                            <MDBIcon icon="quote-left" /> The first thing that we get in mind when hearing this question is "Why should I purchase local products if I can purchase some branded product?".
                                It's a obvious question and the fact that this question arises in our mind is because of the mentality we have developed from a past couple of decades that quality can only be met by international brands.
                                But the reality is that when we purchase products of international brand, directly or indirectly we have to pay for their advertisment fee, shipping fee and many other hidden fee which get reveled only if we go in depth.
                                Purchasing local products releives us from this big charges and the quality these days of the local products are perfectly upto expectation.<MDBIcon icon="quote-right" />
                          </p>
                          <h4 className="font-weight-bold">Think Smart, Choose Smart.</h4>
                          <h6 className="font-weight-bold my-3">
                            #SUPPORT LOCAL PRODUCTS
                          </h6>
                          
                          </div>
                      </MDBCarouselItem>
                    </MDBCarouselInner>
                  </MDBCarousel>
                </section>
              </MDBContainer>
            );
          }
          const Fact = () => {
            return (
              <MDBContainer>
                <section className="text-center text-dark my-5">
                  <h2 className="h1-responsive font-weight-bold my-5">
                    Fact
                  </h2>
          
                  <MDBCarousel activeItem={1} length={1} testimonial interval={false} showIndicators={false} className="no-flex">
                    <MDBCarouselInner>
                      <MDBCarouselItem itemId="1">
                        
                          <Avatar className="mx-auto mb-4">
                            <img src={charkha} className="rounded-circle img-fluid" style={{width:"170px",height:"170px"}}
                              alt="" />
                          </Avatar>
                          <p className="text-justify">
                            <MDBIcon icon="quote-left" /> The first thing that we get in mind when hearing this question is "Why should I purchase local products if I can purchase some branded product?".
                                It's a obvious question and the fact that this question arises in our mind is because of the mentality we have developed from a past couple of decades that quality can only be met by international brands.
                                But the reality is that when we purchase products of international brand, directly or indirectly we have to pay for their advertisment fee, shipping fee and many other hidden fee which get reveled only if we go in depth.
                                Purchasing local products releives us from this big charges and the quality these days of the local products are perfectly upto expectation.<MDBIcon icon="quote-right" />
                          </p>
                          <h4 className="font-weight-bold">Think Smart, Choose Smart.</h4>
                          <h6 className="font-weight-bold my-3">
                            #SUPPORT LOCAL PRODUCTS
                          </h6>
                          
                        
                      </MDBCarouselItem>
                    </MDBCarouselInner>
                  </MDBCarousel>
                </section>
              </MDBContainer>
            );
          }
          const LocalPageInfoRight = () => {
            return (
              <MDBContainer>
                <section className="text-center text-dark my-5">
                  <h2 className="h1-responsive font-weight-bold my-3">
                    How does it benefit Me or the economy?
                  </h2>
                  
          
                  <MDBCarousel activeItem={1} length={1} testimonial interval={false} showIndicators={false} className="no-flex">
                    <MDBCarouselInner>
                      <MDBCarouselItem itemId="1">
                        <div className="container">
                          <Avatar className={classes.large}>
                            <img src={women} className="rounded-circle img-fluid" style={{width:"170px",height:"170px"}}
                              alt="" />
                          </Avatar>
                          <p className="text-justify">
                            <MDBIcon icon="quote-left" /> Of course it benefits us. Let's understand how does it benefit us an individual? When we purchase some local products, it encourages the local 
                            manufacturer to produce more goods and at the same time the brand value of these products increases. Of course we may not see this difference in short term, but considering the long term,
                            it could benefit us in all the way. As the local market increases the country economy boots which results in elevation of country's GDP due to which prices of products may decrease as well the 
                            cost of living. So we must ensure to encourage everyone to support local products and benefit ourself in the long run.<MDBIcon icon="quote-right" />
                          </p>
                          <h4 className="font-weight-bold">Ham badhenge tabhi to desh badhega.</h4>
                          <h6 className="font-weight-bold my-3">
                            #SHOP LOCAL
                          </h6>
                          </div>
                       
                      </MDBCarouselItem>
                    </MDBCarouselInner>
                  </MDBCarousel>
                </section>
              </MDBContainer>
            );
          }
    
          const SimpleExpansionPanel = () => {
            const classes = useStyles();
          
            return (
              <div className="container mt-3 mb-3">
                <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>Local Products FAQ's</Typography>
                    </ExpansionPanelSummary>
                    <hr></hr>
                  <ExpansionPanelDetails>
                        {Info()}
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
            );
          }


          const Info = () => {
              return(
                    <React.Fragment>
                    <div className="container">
                    <div className="row">
                    <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10 text-justify">
                    <h1 style={{color:"#85A393"}} className="font-weight-bold text-center">Harsh Fact</h1>
                        <Typography>Global brands currently dominate the Indian market in most categories and there are few local alternatives. They account for over 90% of the Indian market in the smartphone and television categories and over 80% in refrigerators and washing machines.</Typography>
                        <Typography>They have a 50-65% share in toothpaste, skin creams, soaps, shampoos and laundry. In most discretionary segments, such as beer, aerated drinks, chocolates and coffee, global brands make up for almost 90% of the overall market.</Typography>
                    </div>
                    </div>
                    <div className="col-6">
                        {LocalPageInfoLeft()}
                    </div>
                    <div className="col-6">
                    {LocalPageInfoRight()}
                    </div>
                </div>
                <div className="row text-center">
                <div className="col-12 text-center">
                <Typography className="text-dark font-weight-bold" >*For every purchase on local product we pay, 2% of the amount to the local charity for child education.</Typography>
                <br></br>
                <Typography variant="h5" className="text-dark font-weight-bold"><span ><MDBIcon icon="quote-left" /> You can't buy HAPPINESS, but you can buy LOCAL and that's kind of the same thing.<MDBIcon icon="quote-right" /> </span></Typography>
                
                </div>
                </div>
                </div>
                    </React.Fragment>
              )
          }

          const Products = (state) => {
            return (
                <div className="row">
                {products.map((product, index) => {
                    if(product.origin === "India"){
                        if(state === 'allproducts'){
                            
                                return (
                                    <div key={index} className="col-4 mb-4">
                                        <ProductCard product={product}/>
                                    </div>
                                )
                            
                        } else {
                            if(product.category.name === state) {
                                return (
                                    <div key={index} className="col-4 mb-4">
                                        <ProductCard product={product}/>
                                    </div>
                                )
                            }
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
                            <li style={{ listStyleType: "none" }} ><button onClick={() => {setState("Shawls")}} className="btn btn-block  font-weight-bold pb-2 pt-2" style={{color:"#7c7575"}}>Shawls</button></li>
                            <li style={{ listStyleType: "none" }} ><button onClick={() => {setState("Saree")}} className="btn btn-block  font-weight-bold pb-2 pt-2" style={{color:"#7c7575"}}>Saree</button></li>
                            <li style={{ listStyleType: "none" }} ><button onClick={() => {setState("Stationery")}} className="btn btn-block  font-weight-bold pb-2 pt-2" style={{color:"#7c7575"}}>Stationery</button></li>
                            <li style={{ listStyleType: "none" }} ><button onClick={() => {setState("Carpets")}} className="btn btn-block  font-weight-bold pb-2 pt-2" style={{color:"#7c7575"}}>Carpets</button></li>
                            <li style={{ listStyleType: "none" }} ><button onClick={() => {setState("Ittar")}} className="btn btn-block  font-weight-bold pb-2 pt-2" style={{color:"#7c7575"}}>Ittar</button></li>
                            
    
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
            {CarouselPage()}
            {SimpleExpansionPanel()}
            <div className="container">
            <div className="row">
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

export default IndianProducts;