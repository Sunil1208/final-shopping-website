import React from 'react';
import { API } from '../../backend';


const ImageHelper1 = ({product}) => {
   const imageurl = product ? 
        `${API}/product/photo/${product._id}`:
        `https://images.pexels.com/photos/581087/pexels-photo-581087.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`
    return(
        <div className="rounded  p-2">
            <img
            src={imageurl}
            alt="photo"
            style = {{width:"200px", height:"100px"}}
            className="mb-2 ml-1 border-rounded container-fluid"
            />
          </div>
    )
}

export default ImageHelper1;