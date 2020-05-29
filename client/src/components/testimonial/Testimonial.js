import React from "react";
import { MDBContainer, MDBIcon, MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBTestimonial } from
"mdbreact";
import Base from "../../core/Base";
import myImage from '../../resources/sunil.jpg'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from "@material-ui/core";



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(17),
    height: theme.spacing(17),
    marginLeft:"45%",
    marginBottom:"3%"
  },
}));


const Testimonial = () => {
  const classes = useStyles();

    const TestimonialsPage = () => {
        return (
          <MDBContainer>
            <section className="text-center text-dark my-5">
              <h2 className="h1-responsive font-weight-bold my-5">
                About the Developer
              </h2>
      
              <MDBCarousel activeItem={1} length={1} testimonial interval={false} showIndicators={false} className="no-flex">
                <MDBCarouselInner>
                  <MDBCarouselItem itemId="1">
                   <div className="contianer">
                      <Avatar  className={classes.large}>
                        <img src={myImage} className="rounded-circle img-fluid" style={{width:"170px",height:"170px"}}
                          alt="" />
                      </Avatar>
                      <p>
                        <MDBIcon icon="quote-left" /> I am a web developer with ample knowledge in front-end(ReactJS) and back-end(NodeJS), databases (MongoDB,MySQL),
                        and best code practices. My objective is simply to be the best web developer that I can be and to contribute to the technology industry all that I know and can do. 
                        I am dedicated to perfecting my craft by learning from more seasoned and experienced developers, remaining humble, and continuously making strides to learn all that I can about development. 
                        While currently a final year student at Lovely Professional University pursuing B.tech CSE, and at Newton School, currently pursuing Full Stack Developer Course
                        and I believe that my understanding of problem solving and complex algorithms are also 
                        skills that have and will continue to contribute to my overall success as a developer.
                        <MDBIcon icon="quote-right" /></p>
                      <h4 className="font-weight-bold">Sunil Kumar</h4>
                      <h6 className="font-weight-bold my-3">
                        Student at Lovely Professional University
                      </h6>
                      
                      </div>
                  </MDBCarouselItem>
                </MDBCarouselInner>
              </MDBCarousel>
            </section>
          </MDBContainer>
        );
      }

      return(
          <Base>
            {TestimonialsPage()}
          </Base>
      )

}



export default Testimonial;