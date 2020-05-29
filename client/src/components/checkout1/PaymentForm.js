import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import BrainTreePayment from '../Payment/BraintreePayment';
import { useGlobal,getGlobal } from 'reactn';


const PaymentForm = ({amount,products,reload}) => {

  const [addressFirstName,setaAddressFirstName] = useGlobal('firstname')
  const [addressLastName,setaAddressLastName] = useGlobal('lastname')
  const [addressCountry,setaAddressCountry] = useGlobal('country')
  const [addressLine1,setaAddressLine1] = useGlobal('address_line1')
  const [addressLine2,setaAddressLine2] = useGlobal('address_line2')
  const [addressCity,setaAddressCity] = useGlobal('city1')
  const [addressProvince,setaAddressProvince] = useGlobal('province')
  const [addressZip,setaAddressZip] = useGlobal('zip_code')
  const address ={
    firstname: addressFirstName,
    lastname:addressLastName,
    country:addressCountry,
    address_line1: addressLine1,
    address_line2:addressLine2,
    city: addressCity,
    state:addressProvince,
    zip: addressZip
  }
  console.log(`Address is : ${address}`)
  console.log(address)


  console.log(amount)
  console.log(products)
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Typography  gutterBottom>
        **To ensure your safety we are not offering <span className="font-weight-bold"> cash on delivery</span> as of now.
      </Typography>
      <div className="container mb-4">
        <Typography variant="h6"><span className="font-weight-bold">Enter the following card details</span></Typography>
        <Typography variant="h6" ><span className="font-weight-bold">Card no. : </span>371449635398431</Typography>
        <Typography variant="h6" ><span className="font-weight-bold">Expiry Date : </span>12/21</Typography>
      </div>
      <div className="container">
        <BrainTreePayment amount={amount} products={products} address={address} setReload={reload} />
      </div>
    </React.Fragment>
  );
}


export default PaymentForm;