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
  Modal,

  Row,
  Col,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserEditProfile";
// import React from "react";
import react, { useState, useEffect, Component } from "react";
import firebase from '../../config/firebase-enquire'
import getCroppedImg from "utils/cropImage";
import Cropper from "react-easy-crop";

import defaultIcon from "../../assets/images/blankProfilepic.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Lottie from 'react-lottie';
//  import rocket  from '../../assets/lottie/72284-rocket-animation.json'
import rocket from '../../assets/lottie/9764-loader.json'
import Loader from "../../components/loader/Loader.js";

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      name: "",
      contact: "",
      city: '',
      state: '',
      address: "",
      sameP: false,

      profilepic: '',
      newprofilepic: null,
      mentorModal: false,
      submitModal: false,
      Modal: false,
      profile: '',
      croppedArea: null,
      croppedAreaPixels: null,
      coords: [],
      longitude:'',
      latitude:'',
     
      crop: {
        x: 0,
        y: 0,
        width: 250,
        height: 250,
      },
      zoom: 1,


    }

    this.setCropFunction = this.setCropFunction.bind(this);
    this.setZoomFunction = this.setZoomFunction.bind(this);
    this.onCropCompleteFunction = this.onCropCompleteFunction.bind(this);
    this.getNewImg = this.getNewImg.bind(this);
    this.uploadNewProfilePic = this.uploadNewProfilePic.bind(this);
    this.submitmodal = this.submitmodal.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);


  }



  componentDidMount() 
  {
    let temp = [];
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if ("geolocation" in navigator) {
          console.log("Available");
          navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position);
            console.log("Latitude is :", position.coords.latitude);

            // this.setState({ latitude: position.coords.latitude});
            
            temp.push(position.coords.latitude);
            temp.push(position.coords.longitude);

          
           

            // this.setState({ longitude: position.coords.longitude });

            console.log("Longitude is :", position.coords.longitude);
          });
        } else {
          console.log("Not Available");
        }

        this.setState({coords: temp});
        console.log(this.state.coords);

        firebase
          .database()
          .ref("users/" + user.uid)
          .once("value")
          .then((snapshot) => {
            var data = snapshot.val();
            console.log(data);
            this.setState({
              userData: data, name: data.username, contact: data.contact, city: data.city, state: data.state, address: data.address, postalCode: data.postalCode, profilepic: data.profilepic,
              prevprofile: data.profilepic, longitude: data.username, latitude: data.latitude
            });
          })

      } else {
        window.location.href = "/";
      }
    });
  }


  handleName = (e) => {
    this.setState({ name: e.target.value });
  };
  handleContact = (e) => {
    this.setState({ contact: e.target.value });
  };



  handleCity = (e) => {
    this.setState({ city: e.target.value });
  };

  handleState = (e) => {
    this.setState({ state: e.target.value });
  };



  handleAddress = (e) => {
    this.setState({ address: e.target.value });
  };

  handlePostalcode = (e) => {
    this.setState({ postalCode: e.target.value });
  };




  getNewImg = (e) => {
    this.setState({
      newprofilepic: URL.createObjectURL(e.target.files[0]),
    });
    this.setState({ mentorModal: true });

  };

  setCropFunction = (newcrop) => {
    this.setState({
      crop: newcrop,
    });
  };
  setZoomFunction = (newzoom) => {
    this.setState({
      zoom: newzoom,
    });
  };
  onCropCompleteFunction = (croppedArea, croppedAreaPixels) => {
    this.setState({
      croppedArea: croppedArea,
      croppedAreaPixels: croppedAreaPixels,
    });

  };
  uploadNewProfilePic = () => {
    getCroppedImg(
      this.state.newprofilepic,
      this.state.croppedAreaPixels,
      0
    ).then((result) => {
      this.setState({
        newprofilepic: null,
        profilepic: result,
      })
    }).then(() => {
      console.log(this.state.profilepic);
    })
  };


  toggleMentor = () => {
    if (this.state.mentorModal) {
      console.log("Modal Close");
      this.setState({
        mentorModal: false,
      });
    } else {
      console.log("Modal Open");
      this.setState({
        mentorModal: true,

      });
    }
  };

  // openModal = () =>{

  //     this.setState({mentorModal: true});
  // }

  submitmodal = () => {
    this.setState({ submitModal: true })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    firebase.auth().onAuthStateChanged((user) => {
      firebase.database().ref(`users/${user.uid}`).once("value")
        .then((snap) => {
          this.setState({ createloader: true });

          const db = firebase.database();
          db.ref("users/" + user.uid)
            .update({
              username: this.state.name,

              contact: this.state.contact,

              address: this.state.address,
              city: this.state.city,
              state: this.state.state,
              postalCode: this.state.postalCode,
              longitude:this.state.coords[1],
              latitude:this.state.coords[0],


            }).then(() => {



              if (this.state.profilepic !== this.state.prevprofile) {
                firebase
                  .storage()
                  .ref("users/" + user.uid + "/profile.jpeg")
                  .putString(this.state.profilepic, "data_url")
                  .then((snapshot) => {

                    firebase
                      .storage()
                      .ref("users")
                      .child(user.uid + "/profile.jpeg")
                      .getDownloadURL()
                      .then((urls) => {

                        const db = firebase.database();
                        db.ref("users/" + user.uid)
                          .update({
                            profilepic: urls,
                          }).then(() => {
                            this.setState({ createloader: false });

                            this.submitmodal();
                          });

                      })
                  })
              } else {
                this.submitmodal();
                this.setState({ createloader: false });

              }


            })



        })
    })

  };





  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: rocket,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };
    return (
      <>   {this.state.newprofilepic ?
        (
          <>
            <Modal isOpen={this.state.mentorModal} toggle={this.toggleMentor}>
              <Card className="cropperCard" style={{ width: '800px', height: "80vh", alignItems: "center", marginRight: "100px", justifyContent: "center", position: 'relative' }}>
                {/* <CardHeader> */}
                <Button size="lg" onClick={this.toggleMentor} style={{ position: "absolute", top: "0", left: "0", margin: "5px" }}>
                  {/* <FontAwesomeIcon
                            icon={faWindowClose}
                            style={{
                                color: "rgb(185, 185, 185)",
                                marginLeft: "auto",
                                cursor: "pointer",
                                fontSize: "20px",
                                zIndex:'100',
                            }}
                        /> */}
                </Button>
                {/* </CardHeader> */}
                <div className="imgCropperParentDiv">
                  <Cropper
                    className="cropperClass"
                    image={this.state.newprofilepic}
                    crop={this.state.crop}
                    zoom={this.state.zoom}
                    aspect={1 / 1}
                    onCropChange={this.setCropFunction}
                    onCropComplete={this.onCropCompleteFunction}
                    onZoomChange={this.setZoomFunction}
                  />

                </div>
                <Button color="primary" className="cancel" onClick={this.uploadNewProfilePic}>
                  Upload
                </Button>
                {/* </CardFooter> */}
              </Card>
            </Modal>
          </>
        ) : null}


        <Modal isOpen={this.state.submitModal} toggle={this.toggleSubmit}>
          <Card style={{ width: '100%', height: "30vh", alignItems: "center", justifyContent: 'center', position: 'relative' }}>

            <h2>Profile Succesfully Updated</h2>

            <a href="/user/Profile"><Button color="info">Return To Profile</Button></a>
          </Card>
        </Modal>
        <UserHeader userData={this.state.userData} />
        {/* Page content */}

        {this.state.createloader ? <Lottie options={defaultOptions}
          height={300}
          width={100}></Lottie> :
          <Container className="mt--7" fluid>
            <Row>
              {/*<Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-Editprofile shadow">
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
                  <div
                    style={{
                      display: "flex",
                      width: "fit-content",
                      position: "relative",
                    }}
                    className="align-items-center"
                  >
                    <img
                      alt="..."
                      className="rounded-circle"
                      style={{
                        width: "100px",
                        height: "100px",
                        margin: "0 20px",
                      }}
                      src={
                        this.state.profilepic
                          ? this.state.profilepic
                          : defaultIcon
                      }
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: "-10px",
                        right: "0",
                        width: "30px",
                      }}
                    >
                      <div className="image-upload">
                        <label htmlFor="file-input" style={{ display: "block" }}>
                          <FontAwesomeIcon
                            icon={faPen}
                            style={{
                              fontSize: "30px",
                              color: "#5E72E4",
                              backgroundColor: "#DEE1E6",
                              borderRadius: "50%",
                              padding: "30%",
                              cursor: "pointer",
                            }}
                          />
                        </label>
                        <input
                          id="file-input"
                          type="file"
                          style={{ display: "none" }}
                          onChange={this.getNewImg}
                        />
                      </div>
                    </div>
                  </div>
                  <CardBody>
                    <Form>
                      <h6 className="heading-small text-muted mb-4">
                        Edit Details
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
                              <Input
                                className="form-control-alternative"
                                defaultValue={this.state.username}
                                id="input-username"
                                onChange={this.handleName}

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
                                Contact No.
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-email"
                                placeholder={this.state.contact}
                                type="email"
                                onChange={this.handleContact}

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
                                defaultValue={this.state.address}
                                id="input-address"
                                placeholder={this.state.userData.address}
                                type="text"
                                onChange={this.handleAddress}

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
                                defaultValue={this.state.city}
                                id="input-city"
                                placeholder={this.state.userData.city}
                                type="text"
                                onChange={this.handleCity}

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
                              <Input
                                className="form-control-alternative"
                                defaultValue={this.state.state}
                                id="input-state"
                                placeholder={this.state.userData.state}
                                type="text"
                                onChange={this.handleState}

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
                                placeholder={this.state.postalCode}
                                type="number"
                                onChange={this.handlePostalcode}

                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                      <hr className="my-4" />
                      {/* Description */}

                    </Form>
                  </CardBody>
                  <Button
                    color="info"
                    onClick={this.handleSubmit}

                  > Edit profile
                  </Button>
                </Card>
              </Col>
            </Row>
          </Container>}
      </>
    );
  }
};

