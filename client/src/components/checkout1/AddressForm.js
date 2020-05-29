// import React from 'react';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';

// const  AddressForm = () => {
//   return (
//     <React.Fragment>
//       <Typography variant="h6" gutterBottom>
//         Shipping address
//       </Typography>
//       <Grid container spacing={3}>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             required
//             id="firstName"
//             name="firstName"
//             label="First name"
//             fullWidth
//             autoComplete="given-name"
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             required
//             id="lastName"
//             name="lastName"
//             label="Last name"
//             fullWidth
//             autoComplete="family-name"
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             required
//             id="address1"
//             name="address1"
//             label="Address line 1"
//             fullWidth
//             autoComplete="shipping address-line1"
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             id="address2"
//             name="address2"
//             label="Address line 2"
//             fullWidth
//             autoComplete="shipping address-line2"
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             required
//             id="city"
//             name="city"
//             label="City"
//             fullWidth
//             autoComplete="shipping address-level2"
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField id="state" name="state" label="State/Province/Region" fullWidth />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             required
//             id="zip"
//             name="zip"
//             label="Zip / Postal code"
//             fullWidth
//             autoComplete="shipping postal-code"
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             required
//             id="country"
//             name="country"
//             label="Country"
//             fullWidth
//             autoComplete="shipping country"
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <FormControlLabel
//             control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
//             label="Use this address for payment details"
//           />
//         </Grid>
//       </Grid>
//     </React.Fragment>
//   );
// }

// export default AddressForm;


import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useGlobal,setGlobal,getGlobal } from 'reactn';
import { Button } from '@material-ui/core';


setGlobal({
  addressData:[]
})


const  AddressForm = () => {

  const [addressFirstName,setaAddressFirstName] = useGlobal('firstname')
  const [addressLastName,setaAddressLastName] = useGlobal('lastname')
  const [addressCountry,setaAddressCountry] = useGlobal('country')
  const [addressLine1,setaAddressLine1] = useGlobal('address_line1')
  const [addressLine2,setaAddressLine2] = useGlobal('address_line2')
  const [addressCity,setaAddressCity] = useGlobal('city1')
  const [addressProvince,setaAddressProvince] = useGlobal('province')
  const [addressZip,setaAddressZip] = useGlobal('zip_code')
  console.log(addressFirstName)
  //console.log(address)

  let addressing = getGlobal().addressData;


  const [checked, setChecked] = useState(false);

  const [globalAddress,setGlobalAddress] = useGlobal('address')

  const [addressData1,setAddressData1] = useState({
    firstname:"",
    lastname:"",
    address_line1:"",
    address_line2:"",
    city:"",
    state:"",
    zip_code:"",
    country:""
  })

  const {
    firstname,
    lastname,
    address_line1,
    address_line2,
    city,
    state,
    zip_code,
    country
  } = addressData1


  const handleChange = name => event => {
    const value = event.target.value;
    
    // formData.set(name, value);
    setAddressData1({
      ...addressData1,
      [name]: value
    })
    if(name ==='firstname'){
      // setGlobal({firstname:value})
       setaAddressFirstName(value)
    } else if(name ==='lastname'){
      //setGlobal({lastname:value})
       setaAddressLastName(value)
    }else if(name ==='state'){
      //setGlobal({province:value})
       setaAddressProvince(value)
    }else if(name ==='address_line1'){
      //setGlobal({address_line1:value})
       setaAddressLine1(value)
    }else if(name ==='address_line2'){
      //setGlobal({address_line2:value})
       setaAddressLine2(value)
    }else if(name ==='city'){
      //setGlobal({city1:value})
       setaAddressCity(value)
    }else if(name ==='zip_code'){
      //setGlobal({zip_code:value})
       setaAddressZip(value)
    }else if(name ==='country'){
      //setGlobal({country:value})
       setaAddressCountry(value)
    }
}

  // const setAddressField = (checked) => {
  //   if(checked) {
  //     setaAddressFirstName(addressData1.firstname)
  //   setaAddressLastName(addressData1.lastname)
  //   setaAddressProvince(addressData1.state)
  //   setaAddressLine1(addressData1.address_line1)
  //   setaAddressLine2(addressData1.address_line2)
  //   setaAddressCity(addressData1.city)
  //   setaAddressZip(addressData1.zip_code)
  //   setaAddressCountry(addressData1.country)
  //   }
    
  // }




  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            onChange={handleChange("firstname")}
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            onChange={handleChange("lastname")}
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={handleChange("address_line1")}
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={handleChange("address_line2")}
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
          onChange={handleChange("city")}
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
          onChange={handleChange("state")}
            id="state" 
            name="state" 
            label="State/Province/Region" 
            fullWidth 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
          onChange={handleChange("zip_code")}
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
          onChange={handleChange("country")}
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            
          />
        </Grid>
        <Grid item xs={12}>
           <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="I hereby declare that this is a valid address."
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default AddressForm;
