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
    Row,
    Col,
  } from "reactstrap";
  // core components
  import UserHeader from "components/Headers/UserHeader.js";
  // import React from "react";
  import react,{useState,useEffect} from "react";
  import firebase from '../../config/firebase-enquire'
  import {db} from '../../config/firebase-enquire'
  import Select from "react-dropdown-select";
  import { Chip } from "@mui/material";

// import { Preview } from "@mui/icons-material";
export default class EditProfile extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      adminData:{},
      tags: [],
      uniTags:[],
      DATA: [],
      selectBool: true,
    };
  }

    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     userData: {},
    //   };
    // }
  
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        console.log(user.uid);
        db.collection("Admin").doc(user.uid).get().then((snapshot)=>{
          console.log(snapshot.data());
          var hospitalData = snapshot.data();
          console.log(hospitalData.name);
           this.setState({userData:hospitalData,adminData:hospitalData});
          // console.log(userData);
        })

        firebase
        .database()
        .ref("search_tags/")
        .once("value")
        .then((snapshot) => {
          var data = snapshot.val();
          console.log(data);
          this.setState({uniTags:data});
          for (let i = 0; i < data.length; i++) {
            this.state.DATA.push({value:data[i],label:data[i]});
            console.log(this.state.DATA);
          }
        })
      }
    
    }
    )
  }
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

    
    UpdateData= ()=>{
      firebase.auth().onAuthStateChanged((user) =>{
        if(user){
          db.collection('Admin').doc(user.uid).update(this.state.userData).then((err) => {
            if(err){
              console.log(err);
            }
          });
          console.log(this.state.userData);
          if (this.state.uniTags.length) {
            for (let i = 0; i < this.state.tags.length; i++) {
              if (!this.state.uniTags.includes(this.state.tags[i])) {
                this.state.uniTags.push(this.state.tags[i]);
              }
            }
      
          }
          firebase
          .database()
          .ref("search_tags")
          .set(this.state.uniTags)}
      })
      
    }
    
    render() {
    
    return (
      <>
        <UserHeader adminData={this.state.adminData} bool={1} />
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
                    <Button 
                      color="info"
                    // href="/admin/editProfile"
                    onClick={this.UpdateData}
                    >
                      Submit Changes
                    </Button>
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
                          <Input
                            className="form-control-alternative"
                            defaultValue={this.state.userData.name}
                            id="input-username"
                            placeholder={this.state.userData.name}
                            type="text"
                            onChange={e =>this.setState({userData:{...this.state.userData,name:e.target.value}})}
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
                            <Input
                              className="form-control-alternative"
                              id="input-email"
                              defaultValue={this.state.userData.email}
                              placeholder={this.state.userData.email}
                              type="email"
                              onChange={e =>this.setState({userData:{...this.state.userData,email:e.target.value}})}
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
                            <Input
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
                            <Input
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
                            <Input
                              className="form-control-alternative"
                              defaultValue={this.state.userData.address}
                              id="input-address"
                              placeholder={this.state.userData.address}
                              type="text"
                              onChange={e =>this.setState({userData:{...this.state.userData,address:e.target.value}})}
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
                            <Input
                              className="form-control-alternative"
                              defaultValue={this.state.userData.city}
                              id="input-city"
                              placeholder={this.state.userData.city}
                              onChange={e =>this.setState({userData:{...this.state.userData,city:e.target.value}})}
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
                            <Input
                              className="form-control-alternative"
                              defaultValue={this.state.userData.country}
                              id="input-country"
                              placeholder={this.state.userData.country}
                              onChange={e =>this.setState({userData:{...this.state.userData,country:e.target.value}})}
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
                            <Input
                              className="form-control-alternative"
                              id="input-postal-code"
                              defaultValue={this.state.userData.postalCode}
                              placeholder={this.state.userData.postalCode}
                              onChange={e =>this.setState({userData:{...this.state.userData,postalCode:e.target.value}})}
                              type="number"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                  {/* Description */}
                  {/* Description */}
                  <h6 className="heading-small text-muted mb-4">Specialities</h6>
                  <div className="pl-lg-4 ">
                     <Button 
                    color="info"
                  // href="/admin/editProfile"
                  onClick={()=>{
                    this.setState({selectBool:false});
                  }}
                  style={{float:"right"}}
                  >
                    Add Tags
                  </Button>
                  
                  <Row>
                  

                  
                  { this.state.adminData.tags && this.state.adminData.tags.map((tag)=>(
                    
                  <Chip className="m-1" label={tag} color="primary" />
                ) )}
                                  
                                
                  </Row>

                </div>
                  {this.state.selectBool?null:
                <Col lg={6}>
                  <Select
                    multi
                    clearable
                    create
                    onCreateNew={(item) => console.log('%c New item created ', 'background: #555; color: tomato', item)}
                    options={this.state.DATA}
                    onChange={(value) => {
                      const array = value.map(item => item.value);
                      const arr1 = [];
                      for (let i = 0; i < array.length; i++) {
                        if(!this.state.adminData.tags.includes(array[i])){
                          arr1.push(array[i]);
                        }
                      }
                      this.setState({tags:arr1});
                    this.setState ({userData:{...this.state.userData,tags:arr1.concat(this.state.adminData.tags)}})
                       console.log(arr1);
                    }}

                  /></Col>}
         
                    
                    <hr className="my-4" />
                    {/* Description */}
                    <h6 className="heading-small text-muted mb-4">About me</h6>
                    <div className="pl-lg-4">
                      <FormGroup>
                        <label>About Me</label>

                        <Input
                          className="form-control-alternative"
                          placeholder={this.state.userData.about}
                          rows="4"
                          defaultValue={this.state.userData.about}
                          onChange={e =>this.setState({userData:{...this.state.userData,about:e.target.value}})}
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
   }
  };
