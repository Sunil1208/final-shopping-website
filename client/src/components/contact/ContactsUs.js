import React, { useState } from 'react';
import './ContactUs.scss'
import { Paper, Typography, Button } from '@material-ui/core';
import { createQuery, getAllQueries } from '../../core/helper/queryHelper';

// React component for form inputs

const TestCard = (props) => {

  const [submitted,setSubmitted] = useState(false)
  const [queryData,setQueryData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    subject: "",
    query: "",
  })

  const {firstname,lastname,email,subject,query} = queryData;

  const handleChange = name => event => {
    const value = event.target.value
    setQueryData({
      ...queryData,
      [name]: value
    })
  }

  const handleFirstName = event => {
    const value = event.target.value
    setQueryData({
      ...queryData,
      firstname: value
    })
  }



  const CardProfileLinks = () => {
      const profileLinks = ['twitter', 'linkedin', 'dribbble', 'facebook', 'google-plus-g '];
      
      const linksList = profileLinks.map((link, index) =>
        <li key={index}><a href='#'><i className={`fab fa-info-lg fa-${link}`} > </i></a></li>
      );
                                       
      return(
        <div className='card-social-links'>
          <ul className='social-links' >
            {linksList}
          </ul>
        </div>
      )
  }

  const Background="https://images.pexels.com/photos/33999/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=350&w=440"
  const CardFront = () => {
      return(
        <div className='card-side side-front' style={{backgroundImage:`url(${Background})`}}>
          <div >
            <div className='row'>
              <div className='col-6 ml-0'>


                </div>
  
              <div className='col-6 side-front-content' >
                <h1><u>ShopIt Easy</u></h1>
                <h2><i>Live your life, the fashionable way.</i></h2>
  
                <h1>Online fashion and accessories store</h1>
                
                <p>ShopIt Easy is an online shopping store that eases your shopping experience by providing latest and best quality products.</p>
  
                <p>Our customer service provides you support <i style={{fontWeight:"bolder"}}>24x7</i>. Please reach us out with your query and our team will soon get in touch with you.</p>
  
                <h1>Happy Shopping</h1>
              </div>
            </div>
          </div>
        </div>
      )
  }

  const onSumbit = () => {
    console.log(queryData)
    createQuery(queryData).then( data =>{
      if(data?.error){
        console.log(data.error)
      }
      else {
        console.log(`Submission successfull`)
        setSubmitted(true)
      }
    })
  }

  // const FormInput = () => {
  //   return(
  //     <form formAction='' className='card-form'>
  //               <div className='row text-dark'>
  //                 <div className="col-6">
  //                 <fieldset>
  //                 <input onChange={handleFirstName} name="firstname" id="firstname" type="text" placeholder="Your first name" value={firstname} required />
  //               </fieldset>
  //                 </div>
  //                 <div className="col-6">
  //                 <fieldset>
  //                 <input onChange={handleChange("lastname")} name="lastname" id="lastname" type="text" placeholder="Your last name" value={lastname} required />
  //               </fieldset>
  //                 </div>
  //               </div>
    
  //               <div className='row'>
  //                 <div className='col-6'>
  //                 <fieldset>
  //                 <input onChange={handleChange("email")} name="email" id="email" type="email" placeholder="Your email address" value={email} required />
  //               </fieldset>
  //                 </div>
    
  //                 <div className='col-6'>
  //                   <fieldset>
  //                   <input onChange={handleChange("subject")} name="subject" id="subject" type="text" placeholder="Subject" value={subject} required />
  //                 </fieldset>
  //                 </div>
  //               </div>
  //               <fieldset>
  //                 <textarea onChange={handleChange("query")} name="query" id="query" placeholder="Your message" value={query} required ></textarea>
  //               </fieldset>
  //               <fieldset>
  //               <Button variant="contained" onClick={onSumbit} className="btn" type="submit" >Send Message</Button>
  //             </fieldset>              
  //             </form> 
  //   )
  // }

  // const CardBack = () => {
  //     return(
  //       <div className='card-side side-back'>
  //         <div className='container-fluid'>
  //           <h1>Let's get in touch!</h1>
  //             {submitted === true ? (
  //                 <Paper className="mt-5 mb-5">
  //                   <Typography variant="h6" className="text-center" >Thank you for getting in touch with us, </Typography>
  //                   <Typography variant="h6" className="text-center" >we'll get back to you soon. Happy Shopping!</Typography>
  //                 </Paper>
  //             ) : (
  //               <form formAction='' className='card-form'>
  //               <div className='row text-dark'>
  //                 <div className="col-6">
  //                 <fieldset>
  //                 <input onChange={handleFirstName} name="firstname" id="firstname" type="text" placeholder="Your first name" value={firstname} required />
  //               </fieldset>
  //                 </div>
  //                 <div className="col-6">
  //                 <fieldset>
  //                 <input onChange={handleChange("lastname")} name="lastname" id="lastname" type="text" placeholder="Your last name" value={lastname} required />
  //               </fieldset>
  //                 </div>
  //               </div>
    
  //               <div className='row'>
  //                 <div className='col-6'>
  //                 <fieldset>
  //                 <input onChange={handleChange("email")} name="email" id="email" type="email" placeholder="Your email address" value={email} required />
  //               </fieldset>
  //                 </div>
    
  //                 <div className='col-6'>
  //                   <fieldset>
  //                   <input onChange={handleChange("subject")} name="subject" id="subject" type="text" placeholder="Subject" value={subject} required />
  //                 </fieldset>
  //                 </div>
  //               </div>
  //               <fieldset>
  //                 <textarea onChange={handleChange("query")} name="query" id="query" placeholder="Your message" value={query} required ></textarea>
  //               </fieldset>
  //               <fieldset>
  //               <Button variant="contained" onClick={onSumbit} className="btn" type="submit" >Send Message</Button>
  //             </fieldset>              
  //             </form>      
  //             )}
           
  //           <CardProfileLinks />
  //         </div>
  //       </div>
  //     )
  // }

      const AfterSubmission = () => {
        return(
          <Paper className="mt-5 mb-5">
                  <Typography variant="h6" className="text-center" >Thank you for getting in touch with us, </Typography>
                  <Typography variant="h6" className="text-center" >we'll get back to you soon. Happy Shopping!</Typography>
                </Paper>
        )
      }


     return(
      <div className='card-container'>
        <div className='card-body'>
        <div className='card-side side-back'>
        <div className='container-fluid'>
          <h1>Let's get in touch!</h1>
            {submitted === true ? (
                <AfterSubmission/>
            ) : (
              <form formAction='' className='card-form'>
              <div className='row text-dark'>
                <div className="col-6">
                <fieldset>
                <input onChange={handleFirstName} name="firstname" id="firstname" type="text" placeholder="Your first name" value={firstname} required />
              </fieldset>
                </div>
                <div className="col-6">
                <fieldset>
                <input onChange={handleChange("lastname")} name="lastname" id="lastname" type="text" placeholder="Your last name" value={lastname} required />
              </fieldset>
                </div>
              </div>
  
              <div className='row'>
                <div className='col-6'>
                <fieldset>
                <input onChange={handleChange("email")} name="email" id="email" type="email" placeholder="Your email address" value={email} required />
              </fieldset>
                </div>
  
                <div className='col-6'>
                  <fieldset>
                  <input onChange={handleChange("subject")} name="subject" id="subject" type="text" placeholder="Subject" value={subject} required />
                </fieldset>
                </div>
              </div>
              <fieldset>
                <textarea onChange={handleChange("query")} name="query" id="query" placeholder="Your message" value={query} required ></textarea>
              </fieldset>
              <fieldset>
              <Button variant="contained" onClick={onSumbit} className="btn" >Send Message</Button>
            </fieldset>              
            </form>      
            )}
         
          <CardProfileLinks />
        </div>
      </div>

          <CardFront />
        </div>
      </div>
    )
}
export default TestCard
