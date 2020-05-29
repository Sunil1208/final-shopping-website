import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { useGlobal,getGlobal } from 'reactn';
import { isAuthenticated } from '../../auth/helper';
import { getUser } from '../../admin/helper/adminapicall';


// const products = [
//   { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
//   { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
//   { name: 'Product 3', desc: 'Something else', price: '$6.51' },
//   { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
//   { name: 'Shipping', desc: '', price: 'Free' },
// ];



const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

const Review = (props) => {
  const classes = useStyles();
  const [products,setProducts] = useState(props.products)
  const [amount,setAmount] = useState(props.amount)
  console.log(`Props is`)
  console.log(props)

  //Address
  const [addressFirstName,setaAddressFirstName] = useGlobal('firstname')
  const [addressLastName,setaAddressLastName] = useGlobal('lastname')
  const [addressCountry,setaAddressCountry] = useGlobal('country')
  const [addressLine1,setaAddressLine1] = useGlobal('address_line1')
  const [addressLine2,setaAddressLine2] = useGlobal('address_line2')
  const [addressCity,setaAddressCity] = useGlobal('city1')
  const [addressProvince,setaAddressProvince] = useGlobal('province')
  const [addressZip,setaAddressZip] = useGlobal('zip_code')
  console.log(`First name is : ${addressFirstName}`)
  console.log(`Last name is : ${addressLastName}`)
  //End of address
  const[userDetails,setUserDetails] = useState([])
  const [activeStep,setActiveStep] = useGlobal('activeStep')
  console.log(`Active step is : ${activeStep}`)

  const [ global, setGlobal ] = useGlobal()
  console.log(`Accessing global object`)
  console.log(global)

  const {user} = isAuthenticated()

  const preload = () => {
    getUser(user._id).then(data => {
        if(data?.error) {
            console.log(data.error)
        } else {
          console.log(data)
            setUserDetails(data)
        }
    })
  }
  
    useEffect(() => {
      preload();
    }, [])

    const getSubTotal = () => {
      let amount = 0
      products.map((product, index) => {
          amount = amount + product.price;  
      })
      return amount
  }
  
  const getShippingCharges= () =>{
      let shippingcharge = 0.03*getSubTotal()
      shippingcharge=shippingcharge.toFixed(2)
      return shippingcharge;
  };
  const getTax = () => {
      let tax = 0.05 * getSubTotal()
      tax=tax.toFixed(2)
          console.log(`Tax is : ${tax}`)
      return tax;
  }

  const addresses = [`${addressLine1}`, `${addressLine2}`, `${addressCity}`, `${addressProvince}`, `${addressCountry}`,`${addressZip}`];
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem className={classes.listItem} key={product._id}>
            <ListItemText primary={product.name} secondary={product.description} />
            <Typography variant="body2">{product.price}$</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
        <ListItemText primary="Subtotal" className={classes.total}/>
        <Typography variant="body2" className={classes.total} >{getSubTotal()}$</Typography>
      </ListItem>
        <ListItem className={classes.listItem}>
        <ListItemText primary="Shipping and handling charges" className={classes.total}/>
        <Typography variant="body2" className={classes.total} >{getShippingCharges()}$</Typography>
      </ListItem>
      <ListItem className={classes.listItem}>
        <ListItemText primary="Tax" className={classes.total}/>
        <Typography variant="body2" className={classes.total} >{getTax()}$</Typography>
      </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {amount}$
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping Details
          </Typography>
          <Typography gutterBottom>{addressFirstName} {addressLastName}</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Ordering details
          </Typography>
          <Grid container>
              <React.Fragment >
                <Grid item xs={6}>
                  <Typography gutterBottom>Order placed by: </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{userDetails.name} {userDetails.lastname}</Typography>
                  <Typography gutterBottom>{userDetails.email}</Typography>
                </Grid>
              </React.Fragment>
           
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Review;