import React from 'react';
import Footer1 from './footer/Footer1';
import NavbarFinal from './navbar/Navbar';


const Base = ({
    title = "My Title",
    description="My description",
    className="text-white p-0",
    photo="",
    children
}) => {
    return(
        <div>
        <NavbarFinal/>
            <div className="container mt-0 p-0 pb-3">
                <div className={className}>{children}</div>
            </div>
        <Footer1/>
        </div>
    )
}

export default Base;