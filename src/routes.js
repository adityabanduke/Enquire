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

import Index from "views/Admin/dashboard.js";
import Profile from "views/Admin/Profile.js";
import EditProfile from "views/Admin/EditProfile.js";
import AddDoctor from "views/Admin/AddDoctor.js";
import EditAddDoctor from "views/Admin/EditAddDoctor.js";

// import Landing from "views/Admin/Landing.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: Icons,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: Maps,
  //   layout: "/admin",
  // },
  {
    path: "/user-profile",
    name: "Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/edit-profile",
    name: "Edit Profile",
    icon: "ni ni-single-02 text-yellow",
    component: EditProfile,
    layout: "/admin",
    invisible: true,

  },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Tables,
  //   layout: "/admin",
  // },  
  {
    path: "/add-doctor",
    name: "Add Doctor",
    icon: "ni ni-bullet-list-67 text-red",
    component: AddDoctor,
    layout: "/admin",
  },
  {
    path: "/edit-doctor",
    name: "Edit Doctor",
    icon: "ni ni-bullet-list-67 text-red",
    component: EditAddDoctor,
    layout: "/admin",
    invisible: true,

  },
  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: "ni ni-key-25 text-info",
  //   component: Login,
  //   layout: "/auth",
  // },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: Register,
  //   layout: "/auth",
  // },
];
export default routes;
