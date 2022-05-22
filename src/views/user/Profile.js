
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserProfile";
// import React from "react";
import react, { useState, useEffect, Component } from "react";
import firebase from '../../config/firebase-enquire'
import Link from "react-router-dom/Link";

import blank from "../../assets/images/blankProfilepic.png"

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      loading:false,
    }


  }



  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .database()
          .ref("users/" + user.uid)
          .once("value")
          .then((snapshot) => {
            var data = snapshot.val();

            console.log(data);
            this.setState({ userData: data });
          })
         
      } else {
        window.location.href = "/";
      }
    });
  }

  // useEffect(() => {
  // // firebase.auth().onAuthStateChanged((user) => {
  //    // if (user) {
  //       firebase
  //         .database()
  //         .ref("users/" + 'user1')
  //         .once("value")
  //         .then((snapshot) => {
  //           var data = snapshot.val();
  //           console.log(data.username);
  //           setUserData(data);
  //         })
  //         .then(() => { 
  //           document.getElementById("userHeaderNameId").innerHTML =userData.username;
  //         });
  //     // } else {
  //     //   window.location.href = "/";
  //     // }
  //   // });
  // }, [])
  render() {
    return (
      <>
        <UserHeader userData={this.state.userData} />
        {/* Page content */}
        {this.state.userData && 
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a ><img
                          alt="..."
                          className="rounded-circle"

                          src={this.state.userData.profilepic ? this.state.userData.profilepic : blank}
                          height='100'
                          width='100'

                        />
                      </a>
                    </div>
                  </Col>
                </Row>

                <CardBody className="mt-5 pt-5 pt-md-4">

                  <div className="text-center">
                    <h3>
                      {this.state.userData.username}
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      {this.state.userData.address}
                    </div>
                    {/* <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      Solution Manager - Creative Tim Officer
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                      University of Computer Science
                    </div> */}
                    <hr className="my-4" />
                    <a style={{ color: "#fff" }} href="/user/UserEditProfile">
                      <Button
                        color="info"


                      > Edit profile
                      </Button></a>

                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">My account</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      {/* <Button
                        color="primary"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                      >
                        Settings
                      </Button> */}
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Your Profile
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Name
                            </label>
                            <Input disabled
                              className="form-control-alternative"
                              defaultValue={this.state.userData.username}
                              id="input-username"
                              placeholder={this.state.userData.username}
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
                              placeholder={this.state.userData.email}
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
                      <Row> <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              Contact Number
                            </label>
                            <Input disabled
                              className="form-control-alternative"
                              defaultValue={this.state.userData.contact}
                              id="input-contact"
                              placeholder={this.state.userData.contact}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
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
                              defaultValue={this.state.userData.address}
                              id="input-address"
                              placeholder={this.state.userData.address}
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
                              defaultValue={this.state.userData.city}
                              id="input-city"
                              placeholder={this.state.userData.city}
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
                              State
                            </label>
                            <Input disabled
                              className="form-control-alternative"
                              defaultValue={this.state.userData.state}
                              id="input-country"
                              placeholder={this.state.userData.state}
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
                              placeholder={this.state.userData.postalCode}
                              type="number"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Description */}
                  
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>}

        
      </>
    );
  }
};

