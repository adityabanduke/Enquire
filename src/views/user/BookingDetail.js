import React, { Component } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
  Container,
  Row,
  Col,
  CardTitle,
  Button,
  Modal
} from "reactstrap";

import { db } from '../../config/firebase-enquire';
import firebase from '../../config/firebase-enquire';

import AddLocationIcon from '@mui/icons-material/AddLocation';
import doctor from "../../assets/img/doctor.jpg"
import ForumIcon from '@mui/icons-material/Forum';



export default class BookingDetail extends Component {

  constructor(props) {


    super(props)
    this.state = {
      b_id: "",
      b_no: 0,
      h_id: "",
      h_name: "",
      book_time: '',
      book_date: '',
      bookingNo: 1,
      bNo: 1,
      c_no: 1,
      CurrentP: 1,
      Extime: '',
      hData:{},
      cancel:false,

    }
  }

  componentDidMount() {

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var currenturl = window.location.search;
        var currenturlsearch = new URLSearchParams(currenturl);
        var b_id = currenturlsearch.get("Booking_id");
        this.setState({ b_id: b_id });



        firebase.database().ref("users/" + user.uid + "/YourBookings/bookings").once('value').then((snapshot) => {
          var Data = snapshot.val();
          this.setState({ user_id: user.uid });

          Data.map((items) => {
            if (items.bookingId == this.state.b_id) {
              this.setState({
                h_id: items.h_id,
                h_name: items.hospitalName,
                book_time: items.bookingTime,
                book_date: items.bookingDate,
              })
            }
          })


        }).then(() => {

          db.collection("Admin").doc(this.state.h_id).get().then((snapshot) => {
            // console.log(snapshot.data());
            var hospitalData = snapshot.data();
            // console.log(hospitalData.name);
            this.setState({ hData: hospitalData });

             console.log(this.state.hData);
        })

          firebase.database().ref("Hospitals/" + this.state.h_id + "/data").once('value').then((snapshot) => {

            var hData = snapshot.val();
            console.log(hData);
            hData.map((items) => {
              if (items.bookingId == this.state.b_id) {
                this.setState({ bookingNo: this.state.bNo })
              } else {
                this.setState({ bNo: this.state.bNo + 1 })
              }


              if (items.status == 0) {
                this.setState({ c_no: this.state.c_no })
              } else if (items.status == 1) {

                this.setState({ CurrentP: this.state.c_no })
              } else if (items.status == 2) {
                this.setState({ c_no: this.state.c_no + 1 })

              }else{
                this.setState({c_no:"Appointment Cancelled"})
              }


            })
          }).then(() => {
            if (this.state.CurrentP < this.state.bookingNo) {
              var timeDiff = this.state.bookingNo - this.state.CurrentP;
              this.setState({ Extime: timeDiff * 10 })
            }

            if (this.state.CurrentP == this.state.bookingNo) {
              this.setState({ Extime: "Appointment InProgress" })

            } if (this.state.CurrentP > this.state.bookingNo) {
              this.setState({ Extime: "Appointment Completed" })

            }
          })




        })



      }
      else {
        window.location.href = "/Login";
      }
    })

  }

  openCancel=()=>{

  this.setState({cancel:true});

  }

   toggleMentor = () => {
    if (this.state.cancel) {
      console.log("Modal Close");
      this.setState({
        cancel: false,
      });
    } else {
      console.log("Modal Open");
      this.setState({
        cancel: true,

      });
    }
  };

  cancelAppointment = ()=>{
    firebase.database().ref("Hospitals/" + this.state.h_id + "/data").once('value').then((snapshot) => {

      var hData = snapshot.val();
      hData.map((items,index) => {
        if (items.bookingId == this.state.b_id) {

          let huData = hData.splice(index , 1);
           console.log(hData);


           firebase.database().ref("Hospitals/" + this.state.h_id).set({
            data:hData,
          })
        }
      })

      this.setState({cancel:false});



    }).then(()=>{
      firebase.database().ref("users/" + user.uid + "/YourBookings/bookings").once('value').then((snapshot) => {
        var Data = snapshot.val();
        this.setState({ user_id: user.uid });
  
        Data.map((items, index) => {
          if (items.bookingId == this.state.b_id) {
           

            let huData = Data.splice(index , 1);
            console.log(Data);
 
 
            firebase.database().ref("users/" + user.uid + "/YourBookings").set({
             bookings:Data,
           })
          }
        })
  
  
      })
    }).then(()=>{
      window.location.href="/user/dashboard"
    })

  



  }


  render() {
    return (
      <>

      {this.state.cancel ? <> <Modal isOpen={this.state.cancel} toggle={this.toggleMentor}> <Card className="cropperCard" style={{ width: '50vw', height: "40vh", alignItems: "center", marginRight: "100px", justifyContent: "center", position: 'relative' }}>
        <h2>Are you sure you want to cancel your Appointment?</h2>
        
       <div className='d-flex'> <Button color='primary' onClick={this.cancelAppointment}>Yes</Button><Button color='danger' onClick={()=>{this.setState({cancel:false})}}>Cancel</Button></div>
        </Card></Modal> </>: null}

      {this.state.hData ? 
      <div>
    


        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Booking No
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.state.bookingNo}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>

                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Current Patient No
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">{this.state.CurrentP}</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fas fa-chart-pie" />
                          </div>
                        </Col>
                      </Row>

                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Expected time
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">{this.state.Extime}</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i className="fas fa-users" />
                          </div>
                        </Col>
                      </Row>

                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Status of Doctor
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">{this.state.hData.avalabilityStatus ? "Available" : " Unavailable"}</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="fas fa-percent" />
                          </div>
                        </Col>
                      </Row>

                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>

           
          </Container>
         
        </div>
        <Container className='mt--7' style={{zIndex:'15'}} fluid>
             
              <Card>
                <CardHeader> <h1>Booking Information</h1></CardHeader>
                <CardBody>
                <Row style={{ "padding": '20px' }} className="d-flex justify-content-between">
                            <Col lg="4"><img src={this.state.hData.profilepic? this.state.hData.profilepic:  "https://www.blkmaxhospital.com/slider-mobile.jpg"} className="img-fluid img-responsive product-image shadow  bg-white rounded" style={{ 'position': 'absolute', 'height': '200px' }} ></img></Col>
                            <Col lg="7" md="10" >
                                {this.state.hData ? <h1 className="display-2 ">{this.state.hData.name}</h1> : null}
                                {this.state.hData ? <p className=" mt-0 mb-5">
                                    {this.state.hData.address}
                                    <p>{this.state.hData.city} , {this.state.hData.country}</p>
                                </p> : null}

                                {/* <div className="text-white mt-0 mb-5"><p color='#fff'><AddLocationIcon/> {this.state.hData.address}</p>
                                <p color='#fff'><EmailIcon/> {this.state.hData.email}</p>
                                                       <p><LanguageIcon/> {this.state.hData.city},{this.state.hData.country}</p>

                                </div> */}

                            </Col>

                        </Row>

                        <Row className='pt-lg-5 text-center mx-3 justify-space-between'> 
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              Booking Date
                            </label>
                            <Input disabled
                              className="form-control-alternative"
                              placeholder={this.state.book_date}
                              id="input-contact"
                              // placeholder={this.state.hData.contact}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg='4'>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Booking Time
                            </label>
                            <Input disabled
                              className="form-control-alternative"
                              placeholder={this.state.book_time}
                              id="input-address"
                              // placeholder={this.state.hData.address}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
<br/>
<br/>
                      <Card className='shadow p-3 mb-5 mx-4 bg-white rounded '>
                        <CardBody>
                        <Row><Col lg={4} md={8} className="text-center "><img src={doctor} className='rounded-circle' style={{width:'150px',height:'150px' }}/></Col>
                         <Col style={{borderLeft:'1px solid grey'}} lg={4} md={8} className='text-center align-items-center'><h1>{this.state.hData.doctorName}</h1> <h3>{this.state.hData.doctorSpec}</h3>


                         <br></br>
                         <p><AddLocationIcon/> {this.state.hData.name}</p>
                         <p><ForumIcon/> Hindi , English</p>
                       </Col><Col lg={4}>
                           
                           <h2 color='#3972C1'>Mon - Fri</h2>
                           <p color='#4FA9E2'>(10.00 AM-5.00 PM)</p>
                           </Col></Row>
                        </CardBody></Card>


                      
                </CardBody>
                <div className='mx-auto mb-5'><Button className='btn' color='primary'> Reschedule Appointment</Button> <Button className='btn' color='danger' onClick={this.openCancel}> Cancel Appointment</Button></div>
              </Card>
             
            </Container >
        

            </div>

            : <h1>Loading...</h1> }
      </>
    )
  }
}
