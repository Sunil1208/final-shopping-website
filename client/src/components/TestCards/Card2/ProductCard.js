import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import blackwhite from '../../../resources/blackwhite.jpg'
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import Fab from '@material-ui/core/Fab';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import {Label } from 'semantic-ui-react'
import styles from './ProductCard.module.css'
import { Paper } from '@material-ui/core';
import { API } from '../../../backend';
import { addItemToCart } from '../../../core/helper/cartHelper';
import { Redirect } from 'react-router-dom';
import { useGlobal } from 'reactn';


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

    
  }));
  
const ProductCard = ({
  product,
  addtoCart = true,
  removefromCart = false, 
  setReload= f => f ,
  reload = undefined
}) => {
  const classes = useStyles();
  console.log(product)

    const [redirect, setRedirect] = useState(false);
    const cardTitle = product ? product.name : "A new product";
    const cardDescription = product ? product.description : "Description of the card"
    const cardPrice = product ? `$${product.price}` : "Default"
    const cardCategory = product ? product.category.name : "product"

    const [enableNotification,setEnableNotification] = useGlobal('enableAddToCart')

    const addToCart = () => {
      addItemToCart(product, () => setEnableNotification(true))
      }
  
      const getARedirect = (redirect) => {
        if(redirect) {
          return (
            <Redirect to="/cart" />
          )
        }
      }

      const imageurl = product ? 
    `${API}/product/photo/${product._id}`:
    `https://images.pexels.com/photos/581087/pexels-photo-581087.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`


  return (
      <div className={classes.root}>
      {getARedirect(redirect)}
    <Card component={Paper}   className ={styles.card} style={{boxShadow: "0px 10px 30px rgba(0,0,0,0.5)",transition: "0.5s ease",borderRadius:"12px"}}>
    <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            30%
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={cardTitle}
        className="text-center"
        
      />
      <CardActionArea>
        <CardMedia
        
          component="img"
          alt="Contemplative Reptile"
          height="225"
          image={imageurl}
          title="Contemplative Reptile"
        />
        <CardContent className="text-center">
          <Typography gutterBottom variant="h5" component="h2">
          {cardPrice}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {cardDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Button onClick={addToCart} variant="contained" className="btn-block" >Add to Cart</Button>
      
    </Card>
    </div>
  );
}

export default ProductCard;
