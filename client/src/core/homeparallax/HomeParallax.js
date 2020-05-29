import React from 'react';
import { Parallax } from "react-parallax";
import onlineShopping from '../../resources/onlineshopping.jpg'
import sale from '../../resources/sale1.jpg'
import { Typography } from '@material-ui/core';
import { MDBAnimation } from "mdbreact";

const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
  };

  const insideStyles = {
    background: "none",
    opactiy:"0.5",
    padding: 10,
    position: "absolute",
    top: "85%",
    left: "50%",
    transform: "translate(-50%,-50%)"
  };
  

const HomeParallax = () => {
    return(
        <div style={styles} >
      <Parallax bgImage={onlineShopping} strength={-150}>
      <div style={{ height: 500 }}>
        <div style={insideStyles}>
        <MDBAnimation type="flash" infinite>
        <Typography variant="h4" >Shopping at your fingertips</Typography>
        </MDBAnimation>
        </div>
      </div>
    </Parallax>
    <Parallax bgImage={sale} strength={-150}>
      <div style={{ height: 500 }}>
        <div style={insideStyles}>
        <MDBAnimation type="flash" infinite>
        <Typography variant="h4" >30% off on all products</Typography>
        </MDBAnimation>
        </div>
      </div>
    </Parallax>
        </div>
    )
}

export default HomeParallax;