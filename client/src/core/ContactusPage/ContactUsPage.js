import React, { useState } from 'react';
import Base from '../Base';
import TestCard from '../../components/contact/ContactsUs';


const ContactUs = () => {
    const [toggle, setToggle] = useState(false);


    const contactForm = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                            <label className="text-light" style={{fontWeight:"bold"}}>Enter your first name*</label>
                            <input className="form-control" type="text" placeholder="First name" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                            <label className="text-light" style={{fontWeight:"bold"}}>Enter your last name*</label>
                            <input className="form-control" type="text" placeholder="Last name" />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                            <label className="text-light" style={{fontWeight:"bold"}}>Email*</label>
                            <input className="form-control" type="email" placeholder="Enter your email address" />
                        </div>
                        <div className="form-group">
                            <label className="text-light" style={{fontWeight:"bold"}}>If you would like us to call you, please provide your phone number</label>
                            <input className="form-control" type="Number" placeholder="Enter your phone number" />
                        </div>
                        
                        <div className="form-group">
                            <label className="text-light" style={{fontWeight:"bold"}}>Enter your query*</label>
                            <textarea  className="form-control" type="text" placeholder="Enter your query" />
                        </div>
                        <button onClick={() => {setToggle(true)}} className="btn btn-primary btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    // return (
    //     <Base title="Contact Us" description="Get in touch with us">
    //     <div >
    //     {!toggle ? (
    //         contactForm()
    //     ) : (
    //         <h1 className="text-center">Thanks for reaching out, we will contact you soon!</h1>
    //     )}
        
    //     </div>
        
    //     </Base>
    // )
    return(
        <Base>
            <TestCard/>
        </Base>
    )

}

export default ContactUs;