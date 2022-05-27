/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch , Redirect} from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import UserLayout from "layouts/User.js";
import UserLocation from 'views/UserLocation';
import Index from "views/Index";
import UserLogin from "views/userLogin.js"
import UserRegister from "views/userRegister.js";
// import MyProvider from "./context/MyProvider.js"
import HospitalRegister from "views/hospitalRegister"
import UserEditProfile from "views/user/UserEditProfile.js";
import HospitalDetail from "views/user/HospitalDetail.js";
import AdminLocation from "views/AdminLocation.js";
import AdminLogin from "views/AdminLogin";



ReactDOM.render(
  <BrowserRouter basename='/'>
    <Switch>
    {/* <MyProvider> */}
    <Route path="/"  exact>
        <Index/>
      </Route>
      <Route path="/argon-dashboard-react" exact>
      <Redirect to="/" /> 
      </Route>

     
      <Route path="/auth" >
        <AuthLayout/>
      </Route>

      <Route path="/user">
        <UserLayout/>
      </Route>
   
      <Route path="/login" exact >
        <UserLogin/>
      </Route>
      <Route path="/register" exact >
        <UserRegister/>
      </Route>

       
      <Route path="/UserEditProfile" exact >
        <UserEditProfile/>
      </Route>

      <Route path="/userLocation" exact >
        <UserLocation/>
      </Route>

      <Route path="/adminLocation" exact >
        <AdminLocation/>
</Route>

      <Route path="/HospitalDetail" exact >
        <HospitalDetail/>
</Route>



{/* // ************ Admin Routing *********** */}

      <Route path="/admin">
        <AdminLayout/>
        </Route> 




      <Route path="/admin-register" exact >
        <HospitalRegister/>
      </Route>
      <Route path="/AdminLogin" exact >
        <AdminLogin/>
      </Route>
      {/* <Redirect to="/" /> */}

      {/* </MyProvider> */}

    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
