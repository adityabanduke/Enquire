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
 import Booking from "views/user/Booking";
import Index from "views/user/dashboard.js";
import HospitalDetail from "views/user/HospitalDetail";

 import Profile from "views/user/Profile.js";
 import UserEditProfile from "views/user/UserEditProfile.js";
import SearchResult from "views/user/SearchResult.js";
import BookingDetail from "views/user/BookingDetail";
import BookHistory from "views/user/BookHistory";

// import Maps from "views/examples/Maps.js";
// import Register from "views/examples/Register.js";
// import Login from "views/examples/Login.js";
// import Tables from "views/examples/Tables.js";
// import Icons from "views/examples/Icons.js";

var userroutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/user",
    class: "",

  },
  {
    path: "/Profile",
    name: "Profile",
    icon: "ni ni-circle-08 text-primary",
    component: Profile,
    layout: "/user",
    class: "",

  },
  {
    path: "/UserEditProfile",
    name: "userEp",
    icon: "ni ni-circle-08 text-primary",
    component: UserEditProfile,
    layout: "/user",
    invisible: true,

    
  },
  {
    path: "/searchresult",
    name: "searchresult",
    icon: "ni ni-tv-2 text-primary",
    component: SearchResult,
    layout: "/user",
    invisible: true,
  },
  {
    path: "/HospitalDetail",
    name: "Details",
    icon: "ni ni-tv-2 text-primary",
    component: HospitalDetail,
    layout: "/user",
    invisible: true,

    
  },
  {
    path: "/Booking",
    name: "Your Bookings",
    icon: "ni ni-check-bold text-primary",
    component: Booking,
    layout: "/user",
    class: "",

  },
  {
    path: "/BookingDetail",
    name: "Booking Detail",
    icon: "ni ni-tv-2 text-primary",
    component: BookingDetail,
    layout: "/user",
    class: "",
    invisible: true,
  },
  {
    path: "/History",
    name: "History",
    icon: "ni ni-archive-2 text-primary",
    component: BookHistory,
    layout: "/user",
    class: "",

  },
  // {
  //   path: "/Tables",
  //   name: "Tables",
  //   icon: "ni ni-tv-2 text-primary",
  //   component: Tables,
  //   layout: "/user",
  //   class: "",

  // },

];
export default userroutes;