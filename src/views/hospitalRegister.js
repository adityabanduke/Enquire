
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
// import React from "react";
import react from "react";
import firebase from '../config/firebase-enquire';
import { db } from "../config/firebase-enquire";
import Select from "react-dropdown-select";

const hospitalRegister = () => {

  const [userData, setUserData] = react.useState({});
  const [uniTags, setUniTags] = react.useState([]);
  const [name, setName] = react.useState();
  const [email, setEmail] = react.useState();
  const [password, setPassword] = react.useState();
  const [address, setAddress] = react.useState();
  const [city, setCity] = react.useState();
  const [country, setCountry] = react.useState();
  const [postalCode, setPostalCode] = react.useState();
  const [about, setAbout] = react.useState();
  const [tags, setTags] = react.useState([]);
  const [h_id, setid] = react.useState("");
  const [users, setUsers] = react.useState([]);
  const [imageAsUrl, setImageAsUrl] = react.useState({});
  const [DATA, setDATA] = react.useState([]);
  const [doctorName, setDoctorName] = react.useState("");
  const [doctorSpec, setDoctorSpec] = react.useState("");
  const [doctorImg, setDoctorImg] = react.useState("");
  const [latitude, setLatitude] = react.useState(23.30778);
  const [longitude, setLongitude] = react.useState(77.33058);
  // const DATA = [
  //   {
  //     value: "Ekansh",
  //     label: "Ekansh",
  //   },
  //   {
  //     value: "Ekansh ki gand",
  //     label: "Ekansh ki gand",
  //   },
  //   {
  //     value: "Ekansh ki chut",
  //     label: "Ekansh ki chut",
  //   },
  //   {
  //     value: "Ekansh ka nunnu",
  //     label: "Ekansh ka nunnu",
  //   },
  // ]
  react.useEffect(() => {


    // if ("geolocation" in navigator) {
    //   console.log("Available");
    //   navigator.geolocation.getCurrentPosition(function(position) {
    //     console.log(position);
    //     console.log("Latitude is :", position.coords.latitude);
    //     setLatitude(position.coords.latitude);
    //     setLongitude(position.coords.longitude);
    //     console.log("Longitude is :", position.coords.longitude);
  

        
    //   });
    // } else {
    //   console.log("Not Available");
    // }
  

    firebase
      .database()
      .ref("search_tags/")
      .once("value")
      .then((snapshot) => {
        var data = snapshot.val();
        console.log(data);
        setUniTags(data);
        for (let i = 0; i < data.length; i++) {
          DATA.push({value:data[i],label:data[i]});
          console.log(DATA);
        }
      })

  }, [])

  const submit = () => {

    firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
      var user = userCredential.user;
     const ID = user.uid;
     var tempTags = tags;
     tempTags.push(name);
      db.collection("Admin").doc(user.uid).set({
        name, email, address, city, country, postalCode, about, password, tags:tempTags , users, h_id:ID,doctorName,doctorSpec,doctorImg,longitude,latitude,
        avalabilityStatus:true
      })
    }).then((err) => {
      if (err) {
        console.log('first');
        console.log(err);
      } else {
        console.log("success!!");
        // window.location.href = '/';

      }
    })
    if (uniTags.length) {
      for (let i = 0; i < tags.length; i++) {
        if (!uniTags.includes(tags[i])) {
          uniTags.push(tags[i].toLowerCase());
        }
      }

      uniTags.push(name);

    }
    firebase
    .database()
    .ref("search_tags")
    .set(uniTags)
    
  }
  return (
    <>
      {/* Page content */}
      <div style={{
        background: " #000046",
        background: "-webkit-linear-gradient(to right, #1CB5E0, #000046)",
        background: "linear-gradient(to right, #1CB5E0, #000046)", width: "100vw",
        height: "100vh", position: "fixed", top: "0", left: "0"
      }}>

      </div>
      <Container className="mt-7" fluid>
        <Row className="d-flex justify-content-center">
          {
          }
          <Col className="order-xl-1" xl="8">
            {/* <button onClick={submit}>submit</button> */}

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
                            id="input-username"
                            placeholder='name'
                            type="text"
                            onChange={(e) => {
                              console.log(e.target.value);
                              setName(e.target.value);
                            }}
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
                            placeholder="email"
                            type="email"
                            onChange={(e) => {
                              console.log(e.target.value);
                              setEmail(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg={6}>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-password"
                          >
                            Password
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-password"
                            placeholder="password"
                            type="password"
                            onChange={(e) => {
                              console.log(e.target.value);
                              setPassword(e.target.value);
                            }}
                          />
                        </FormGroup></Col>
                    </Row>

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
                            id="input-address"
                            placeholder="address"
                            type="text"
                            onChange={(e) => {
                              console.log(e.target.value);
                              setAddress(e.target.value);
                            }}
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
                            id="input-city"
                            placeholder="city"
                            type="text"
                            onChange={(e) => {
                              console.log(e.target.value);
                              setCity(e.target.value);
                            }}
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
                            id="input-country"
                            placeholder="country"
                            type="text"
                            onChange={(e) => {
                              console.log(e.target.value);
                              setCountry(e.target.value);
                            }}
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
                            placeholder="postalCode"
                            type="number"
                            onChange={(e) => {
                              console.log(e.target.value);
                              setPostalCode(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">Specialities</h6>
                  <Col lg={6}>
                    <Select
                      multi
                      clearable
                      create
                      onCreateNew={(item) => console.log('%c New item created ', 'background: #555; color: tomato', item)}
                      options={DATA}
                      onChange={(value) => {
                        const array = value.map(item => item.value);
                        setTags(array);

                      }}

                    /></Col>
                  <hr className="my-4" />
                  {/* Description */}
                  <h6 className="heading-small text-muted mb-4">About me</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>About Me</label>
                      <Input
                        className="form-control-alternative"
                        placeholder="about"
                        rows="4"
                        type="textarea"
                        onChange={(e) => {
                          console.log(e.target.value);
                          setAbout(e.target.value);
                        }}

                      />
                    </FormGroup>


                    <Button onClick={submit}
                      color="info"
                    // href="/admin/editProfile"
                    // onClick={(e) => e.preventDefault()}
                    >
                      Submit
                    </Button>
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

export default hospitalRegister;
