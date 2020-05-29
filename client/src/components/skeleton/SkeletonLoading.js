import React from 'react'
import Skeleton from "react-loading-skeleton";

const SkeletonLoading = () => {

    return(
        <React.Fragment>
        <div class="card" style={{width: "18rem"}}>
        <Skeleton variant="rect" width={280} height={225} />
        <div class="card-body mt-1">
        <Skeleton variant="rect" width={150} height={20} />
        <br></br>
        <Skeleton variant="rect" width={250} height={40} />
        <br></br>
        <Skeleton variant="rect" width={100} height={20} />
        </div>
        <div class="card-footer bg-transparent"><Skeleton variant="rect" width={260} height={50} />
        </div>
        </div>
        </React.Fragment>
    )
}

export default SkeletonLoading;