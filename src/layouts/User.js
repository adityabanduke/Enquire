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
import React , {useState} from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core compone
import Sidebar from "components/Sidebar/Sidebar.js";
import UserNavbar from "components/Navbars/UserNavbar.js";
// import UserFooter from "components/Footers/UserFooter.js";
import userroutes from "userroutes.js";
import firebase from '../config/firebase-enquire';

const User = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
 const [name, setName] = useState('');
 const [profile, setProfile] = useState("")
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  React.useEffect(()=>{
    firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				firebase.database().ref("users/" + user.uid).once('value').then((snapshot) => {
					var userData = snapshot.val();
					console.log(userData);
          setName(userData.username);
          setProfile(userData.profilepic);
				})
			}
			else {
				window.location.href = "/Login";
			}
		}) 
  })

  const getRoutes = (userroutes) => {
    return userroutes.map((prop, key) => {
      if (prop.layout === "/user") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < userroutes.length; i++) {
      if (
        props.location.pathname.indexOf(userroutes[i].layout + userroutes[i].path) !==
        -1
      ) {
        return userroutes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <Sidebar
        {...props}
        routes={userroutes}
        logo={{
          innerLink: "/user/index",
          imgSrc: require("../assets/img/brand/argon-react.png").default,
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
      <UserNavbar name={name} profile={profile}/>
        <Switch>
          {getRoutes(userroutes)}
          <Redirect from="*" to="/user/dashboard" />
        </Switch>
        <Container fluid>
        </Container>
      </div>
    </>
  );
};

export default User;
