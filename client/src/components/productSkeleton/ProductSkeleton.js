import React from 'react'
import Skeleton from 'react-loading-skeleton'

const ProductSkeleton = () =>{
    return(
        <React.Fragment>
            <div className="row text-center">
                <div className="col-4" >
                <Skeleton variant="rect" width={125} height={100} />
                </div>
                <div className="col-4" >
                <Skeleton variant="rect" width={136} height={54} />
                </div>
                <div className="col-4" >
                <Skeleton variant="rect" width={136} height={54} />
                </div>
            </div>
        </React.Fragment>
    )
}

export default ProductSkeleton;