import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import AdminRoute from './auth/helper/AdminRoutes';
import PrivateRoute from './auth/helper/PrivateRoutes';
import UserDashBoard from './user/UserDashBoard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import UpdateProduct from './admin/UpdateProduct';
import Cart from './core/Cart';
import AllProducts from './core/AllProducts';
import ContactUs from './core/ContactusPage/ContactUsPage';
import Testimonial from './components/testimonial/Testimonial';
import CoronaPage from './components/coronavirus/CoronalVirus';
import IndianProducts from './components/localmarket/Localmarket';
import CollapsibleTable from './admin/Order2';
import Dashboard from './components/dashboard/Dashboard';
import Checkout1 from './components/checkout1/Checkout'





const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/cart" exact component={Cart} />
                <Route path='/allproducts' exact component={AllProducts} />
                <Route path='/contactus' exact component={ContactUs} />
                <Route path='/testimonial' exact component={Testimonial} />
                <Route path='/coronavirus' exact component={CoronaPage} />
                <Route path='/indianproducts' exact component={IndianProducts} />
                <Route path='/table' exact component={CollapsibleTable} />
                <Route path='/dashboard' exact component={Dashboard} />
                <Route path='/checkout' exact component={Checkout1}  />
                <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
                <AdminRoute path="/admin/dashboard" exact component={Dashboard} />
                <AdminRoute path="/admin/create/category" exact component={AddCategory} />
                <AdminRoute path="/admin/create/product" exact component={AddProduct}/> 
                <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct}/> 


            </Switch>
        </BrowserRouter>
    )
}

export default Routes;