import React from 'react';
import { API } from '../../backend';


const ImageHelper = ({product}) => {
   const imageurl = product ? 
        `${API}/product/photo/${product._id}`:
        `https://images.pexels.com/photos/581087/pexels-photo-581087.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`
    return(
        <div className="rounded  p-2">
            <img
            src={imageurl}
            alt="photo"
              // style={{ maxHeight: "100%", maxWidth: "100%" }}
              style = {{width:"300px", height:"150px"}}
              className="mb-2 ml-1 border-rounded"
            />
          </div>
    )
}

export default ImageHelper;