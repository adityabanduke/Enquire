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

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
// import React from "react";
import react,{useState,useEffect} from "react";
import firebase from '../../config/firebase-enquire';
import { Chip } from "@material-ui/core";
import Link from "react-router-dom/Link";
import {db} from "../../config/firebase-enquire"
const Profile = () => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     userData: {},
  //   };
  // }


  // componentDidMount() {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       firebase
  //         .database()
  //         .ref("users/" + user.uid)
  //         .once("value")
  //         .then((snapshot) => {
  //           var data = snapshot.val();
  //           console.log(data);
  //           this.setState({ userData: data });
  //         })
  //         .then(() => { 
  //           document.getElementById("userHeaderNameId").innerHTML =
  //             "Hello " + this.state.userData.username;
  //         });
  //     } else {
  //       window.location.href = "/";
  //     }
  //   });
  // }
  const [userData, setUserData] = useState({});
  const [adminData, setAdminData] = useState({});
  const data ="https://firebasestorage.googleapis.com/v0/b/enquire-3bea9.appspot.com/o/images%2FScreenshot%20(4).png?alt=media&token=f035f28a-2a0c-44b4-8ccc-714c6b190cbf";
  useEffect(() => {
  // firebase.auth().onAuthStateChanged((user) => {
     // if (user) {
        // firebase
        //   .database()
        //   .ref("users/" + 'user1')
        //   .once("value")
        //   .then((snapshot) => {
        //     var data = snapshot.val();
        //     console.log(data.username);
        //     setUserData(data);
        //   })
        //   .then(() => { 
        //     document.getElementById("userHeaderNameId").innerHTML =userData.username;
        //   });
      // } else {
      //   window.location.href = "/";
      // }
    // });
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        console.log(user.uid);
        db.collection("Admin").doc(user.uid).get().then((snapshot)=>{
          console.log(snapshot.data());
          var hospitalData = snapshot.data();
          console.log(hospitalData.name);
           setUserData(hospitalData);
           setAdminData(hospitalData);
          // console.log(userData);
        })
      }
    }
    // db.collection("Admin").
  )}, [])
  
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8"
      style={{
        backgroundImage:`url(${data})`
      }}
      >
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
       
             <h1 className="px-3" style={{color:'#fff' , fontSize:'2.5rem'}}>
               {userData.name}{
                 console.log(userData.imageAsUrl)
               }
             </h1>
            </Row>
          </div>
        </Container>
      </div>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
           {/*<Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={
                          require("../../assets/img/theme/team-4-800x800.jpg")
                            .default
                        }
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Connect
                  </Button>
                  <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Message
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">22</span>
                        <span className="description">Friends</span>
                      </div>
                      <div>
                        <span className="heading">10</span>
                        <span className="description">Photos</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    Jessica Jones
                    <span className="font-weight-light">, 27</span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    Bucharest, Romania
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Solution Manager - Creative Tim Officer
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    University of Computer Science
                  </div>
                  <hr className="my-4" />
                  <p>
                    Ryan — the name taken by Melbourne-raised, Brooklyn-based
                    Nick Murphy — writes, performs and records all of his own
                    music.
                  </p>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    Show more
                  </a>
                </div>
              </CardBody>
            </Card>
          </Col> */}
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  
                  <Col className="text-right" xs="4">
                  <Link to="/admin/edit-profile"><Button 
                      color="info"
                    // href="/admin/editProfile"
                    // onClick={(e) => e.preventDefault()}
                    >
                      Edit Profile
                    </Button></Link>
                 
                    <Link to="/adminLocation">                      <Button
                        color="info"


                      > Set Location
                      </Button></Link>

                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Hospital Details
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Hospital Name
                          </label>
                        <Input disabled
                          className="form-control-alternative"
                          defaultValue={userData.name}
                          id="input-username"
                          placeholder={userData.name}
                          type="text"
                        />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input disabled
                            className="form-control-alternative"
                            id="input-email"
                            placeholder={userData.email}
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    {/* <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            First name
                          </label>
                          <Input disabled
                            className="form-control-alternative"
                            defaultValue="Lucky"
                            id="input-first-name"
                            placeholder="First name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Last name
                          </label>
                          <Input disabled
                            className="form-control-alternative"
                            defaultValue="Jesse"
                            id="input-last-name"
                            placeholder="Last name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row> */}
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Contact information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Address
                          </label>
                          <Input disabled
                            className="form-control-alternative"
                            defaultValue={userData.address}
                            id="input-address"
                            placeholder={userData.address}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            City
                          </label>
                          <Input disabled
                            className="form-control-alternative"
                            defaultValue={userData.city}
                            id="input-city"
                            placeholder={userData.city}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Country
                          </label>
                          <Input disabled
                            className="form-control-alternative"
                            defaultValue={userData.country}
                            id="input-country"
                            placeholder={userData.country}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Postal code
                          </label>
                          <Input disabled
                            className="form-control-alternative"
                            id="input-postal-code"
                            placeholder={userData.postalCode}
                            type="number"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Description */}
                  <h6 className="heading-small text-muted mb-4">Specialities</h6>
                  
                  <div className="pl-lg-4 ">
                    <Row>
                    
                    { userData.tags && userData.tags.map((tag)=>(
                      
                    <Chip className="ml-2" label={tag} color='#21AEE4' />
                 ) )}
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Description */}
                  <h6 className="heading-small text-muted mb-4">About me</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>About Me</label>
                      <Input disabled
                        className="form-control-alternative"
                        placeholder={userData.about}
                        rows="4"
                        defaultValue={userData.about}
                        type="textarea"
                       
                      />
                    </FormGroup>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
