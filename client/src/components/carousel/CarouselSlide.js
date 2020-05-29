import React from 'react';
import Carousel from 'react-material-ui-carousel'
import {Paper, Button} from '@material-ui/core'
import  bwGirl from '../../resources/blackwhite.jpg';
import shoes from '../../resources/shoes.jpg';
import outdoor from '../../resources/outdoor.jpg'
import blazer from '../../resources/blazer.jpg';
import { Redirect } from 'react-router-dom';

 
const CarouselSlider = () => 
{
    const handleChange= () => {
        return(
            <Redirect to='/allproducts' />
        )
    }
 
    return (
        <Carousel autoPlay={true} interval={2000} animation={"slide"}>    
        <img onClick={handleChange} src={bwGirl} alt="image1" className="img-fluid w-100" style={{height:"500px"}} />     
        <img src={outdoor} alt="image1" className="img-fluid w-100" style={{height:"500px"}} /> 
        <img src={blazer} alt="image1" className="img-fluid w-100" style={{height:"500px"}} />            
        <img src={shoes} alt="image1" className="img-fluid w-100" style={{height:"500px"}} />            

        </Carousel>
       
    )
}
 

// function Item(props)
// {
//     return (
//         <Paper>     
//             <img src={props.items} alt="image1" />
//             <Button className="CheckButton">
//                 Check it out!
//             </Button>
//         </Paper>
//     )
// }


export default CarouselSlider;