import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';

import CardHeader from '@material-ui/core/CardHeader';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        // maxWidth: 300,
        // maxHeight:550,
        // minHeight: 550,
        width:"300px",
        height:"450px",
         maxWidth: "300px",
         maxHeight:"450px",
      },
      card: {
        borderRadius: "28px",
        boxShadow: "5px 5px 15px rgba(0,0,0,0.9)",
      },

    
  }));

const CardSkeleton = () => {
    const classes=useStyles()
    return(
        <div className={classes.root}>
    <Card component={Paper}   className ={classes.card} style={{boxShadow: "0px 10px 30px rgba(0,0,0,0.5)",transition: "0.5s ease",borderRadius:"12px"}}>
    <CardHeader>
   
    </CardHeader>
      <CardActionArea>
        <CardMedia>
        <Skeleton variant="rect" width={300} height={225} />
        </CardMedia>
        <CardContent className="text-center">
          <Typography gutterBottom variant="h5" component="h2">
          <Skeleton variant="circle" width={35} height={30} />
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          <Skeleton variant="circle" width={268} height={20} />
          </Typography>
        </CardContent>
      </CardActionArea>
      <Skeleton variant="circle" width={300} height={36} />
    </Card>
    </div>
    )
}

export default CardSkeleton;


