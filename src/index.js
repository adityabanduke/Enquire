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
import { BrowserRouter, Route, Switch} from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import UserLayout from "layouts/User.js";
import Index from "views/Index";
import UserLogin from "views/userLogin.js"
import UserRegister from "views/userRegister.js";

import HospitalRegister from "views/hospitalRegister"
import UserEditProfile from "views/user/UserEditProfile.js";
import HospitalDetail from "views/user/HospitalDetail.js"

ReactDOM.render(
  <BrowserRouter>
    <Switch>
    <Route path="/"  exact>
        <Index/>
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
      {/* <Redirect to="/" /> */}



    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
