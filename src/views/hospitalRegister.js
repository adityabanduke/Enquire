
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
  import firebase from '../config/firebase-enquire'

  
  const hospitalRegister = () => {
    const [userData, setUserData] = react.useState({});
    const [name, setName] = react.useState();
    const [email, setEmail] = react.useState();
    const [password, setPassword] = react.useState();
    const [address, setAddress] = react.useState();
    const [city, setCity] = react.useState();
    const [country, setCountry] = react.useState();
    const [postalCode, setPostalCode] = react.useState();
    const [about, setAbout] = react.useState();



const submit=()=>{

  firebase.auth().createUserWithEmailAndPassword(email,password).then((userCredential)=>{
    var user = userCredential.user;
      firebase
    .database()
    .ref("admin/"+ user.uid)
    .set({
      name , email , address , city , country , postalCode , about , password
    })
  })
  
}
    return (
      <>
        {/* Page content */}
        <div  style={{background:" #000046",
background: "-webkit-linear-gradient(to right, #1CB5E0, #000046)",
background: "linear-gradient(to right, #1CB5E0, #000046)",width:"100vw",
height:"100vh",position:"fixed",top:"0",left:"0"
}}>
          
        </div>
        <Container className="mt-7" fluid>
          <Row className="d-flex justify-content-center">
             {
           }
            <Col className="order-xl-1" xl="8">
            <button onClick={submit}>submit</button>

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
                             onChange={(e)=>{
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
                              onChange={(e)=>{
                                console.log(e.target.value);
                                setEmail(e.target.value);
                               }}
                            />
                          </FormGroup>
                        </Col>
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
                              onChange={(e)=>{
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
                              onChange={(e)=>{
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
                              onChange={(e)=>{
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
                              onChange={(e)=>{
                                console.log(e.target.value);
                                setPostalCode(e.target.value);
                               }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
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
                          onChange={(e)=>{
                            console.log(e.target.value);
                            setAbout(e.target.value);
                           }}
                         
                        />
                      </FormGroup>

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
                              onChange={(e)=>{
                                console.log(e.target.value);
                                setPassword(e.target.value);
                               }}
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
  
  export default hospitalRegister;
  