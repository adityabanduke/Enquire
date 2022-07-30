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
import react from 'react';
import {
  Badge,
  Card,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Table,
  CardTitle,
  Container,
  Row,
  Col,
  CardBody,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  FormGroup,
  Input,
Button
} from "reactstrap";
import Switch from '@mui/material/Switch';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// core components
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { db } from '../../config/firebase-enquire';
import firebase from '../../config/firebase-enquire';

import { nanoid } from 'nanoid';
// import Loader from '../../components/loader/Loader.js';

import Clock from 'react-live-clock';
import moment from 'moment';


export default class dashboard extends react.Component {
  constructor(props) {

    var today = new Date(),
      todayDate =
        today.getFullYear() +
        "-" +
        ((today.getMonth() + 1 < 10 ? "0" : "") + (today.getMonth() + 1)) +
        "-" +
        ((today.getDate() < 10 ? "0" : "") + today.getDate());
    var time = today.getHours() + ":" + today.getMinutes();
    var DATA = '';
    super(props)
    this.state = {
      patientname: "",
      open: false,
      h_id: "",
      user_id: "",
      hData: "",
      today: todayDate,
      time: time,
      booking: [],
      Hbooking: [],
      hospitalName: '',
      booking_id: '',
      status: 0,
      queue: [],
      PatientInProcess: "",
      loading: false,
      value: true,
currentNo:0,
profileComp:false,
    }
    this.handleOpen = this.handleOpen.bind(this);
    this.bookAppointment = this.bookAppointment.bind(this);
    this.handleclose = this.handleClose.bind(this);
    this.changeStatus = this.changeStatus.bind(this);



  }
  handleOpen = () => { this.setState({ open: true }) };
  handleClose = () => { this.setState({ open: false }) };
  componentDidMount() {
    // var currenturl = window.location.pathname;
    // this.setState({ h_id: h_id });

    firebase.auth().onAuthStateChanged((user) => {

      if (user) {
        db.collection("Admin").doc(user.uid).get().then((snapshot) => {
          console.log(snapshot.data());
          var hospitalData = snapshot.data();
          console.log(hospitalData.name);
          this.setState({ hData: hospitalData, hospitalName: hospitalData.name, h_id: hospitalData.h_id });

          // console.log(userData);
        }).then(() => {
          firebase.database().ref("Hospitals/" + this.state.h_id).once('value').then((snapshot) => {
            var Data = snapshot.val();
            this.setState({ Hbooking: Data.data });
            // this.setState({loading:true})
            console.log(Data.data);
            this.state.Hbooking.map((items , index)=>{
                 if(items.status == 1){
            this.setState({currentNo : index +1})
                 }  
            })
            // this.DATA=Data.data;
          })

        
        }).then(()=>{
          if(!this.state.hData.latitude || !this.state.hData.longitude){
            setTimeout(() => {
                this.setState({profileComp:true})
              }, 1000)
              
            }
        }).then((err) => {


          if (err) {
            console.log(err);
          } else {
            console.log("Success!!!")

          }
        })

    

      }
      else {
        window.location.href = "/";
      }
    })

  }


  changeStatus = (e) => {

    this.setState({ value: !this.state.value });
    console.log(this.state.value);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.uid);
        this.state.hData.avalabilityStatus = !e.target.value;
        this.setState({ hData: { ...this.state.hData, avalabilityStatus: this.state.value } })
        db.collection('Admin').doc(user.uid).update(this.state.hData).then((err) => {
          if (err) {
            console.log(err);
          }
        })
      }
      // console.log(userData);
    });
  }


  bookAppointment = async () => {
    console.log("book");
    var model = nanoid();
    await this.setState({ booking_id: model });
    console.log(this.state.h_id);
    console.log(this.state.booking_id);

    firebase.database().ref("Hospitals/" + this.state.h_id).once('value').then((snapshot) => {
      var Data = snapshot.val();
      this.setState({ Hbooking: Data.data });
    }).then(()=>{
      this.state.Hbooking.push({
        user_id: this.state.booking_id, hospitalName: this.state.hospitalName, bookingDate: this.state.today,
        bookingTime: this.state.time, bookingId: this.state.booking_id, status: this.state.status, patientname: this.state.patientname
      })
    }).then(()=>{


      firebase.database().ref("Hospitals/" + this.state.h_id).set({

        data: this.state.Hbooking
  
      })
    }).then(() => {
      this.setState({
        open: false
      })
      // alert("Appointment Booked Successfully");


    })
  }

  render() {
    return (

      <>
        {/* Modal */}

       
        <Modal open={this.state.profileComp} >
       
        <Card className='text-center' style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: '50%', backgroundColor: 'white', boxShadow: '24', padding: '30px' }}>
        <CardHeader><h1>Complete Your Profile</h1></CardHeader>
     
          
          <CardBody>
            <h2>Set Your Address</h2>
            <a href='/admin/user-profile'><Button color="primary" >Set Location</Button></a>
            </CardBody>
       
      
           </Card>
          
        </Modal>
       
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.state.open}>
            <Box style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: '500', backgroundColor: 'white', boxShadow: '24', padding: '30px' }}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Add a user
              </Typography>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3 mt-2">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-circle-08" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Name"
                    type="text"
                    value={this.state.patientname}
                    onChange={(e) => { this.setState({ patientname: e.target.value }) }}

                  />
                </InputGroup>
              </FormGroup>
              <div className="d-flex justify-content-between">
                <Button variant="text" type='button' onClick={() => { this.setState({ open: false }) }}>Close</Button>
                <Button variant="contained" onClick={this.bookAppointment}>Add</Button>
              </div>
            </Box>
          </Fade>
        </Modal>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="3" >
                  <Card className="card-stats mb-4 mb-xl-0" style={{height:'130px'}}>
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                           Hospital
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                          {this.state.hospitalName}

                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className=" ni ni-circle-08" />

                          </div>
                        </Col>
                      </Row>

                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0" style={{height:'130px'}}>
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Current Patient
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">  {this.state.PatientInProcess ? this.state.PatientInProcess : "Patient Name"}</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fas fa-chart-pie" />
                          </div>
                        </Col>
                      </Row>
                      {/* <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-danger mr-2">
                          <i className="fas fa-arrow-down" /> 3.48%
                        </span>{" "}
                        <span className="text-nowrap">Since last week</span>
                      </p> */}
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0" style={{height:'130px'}}>
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                           Clock                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">  
                          <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia'} /> <br/>
                         { moment().format('MMMM Do YYYY') }
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i className="fas fa-users" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        {/* <span className="text-warning mr-2">
                          <i className="fas fa-arrow-down" /> 1.10%
                        </span>{" "}
                        <span className="text-nowrap">Since yesterday</span> */}
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0" style={{height:'130px'}}>
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Status
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">Available</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="ni ni-button-power" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <Switch
                            value={this.state.value}
                            onChange={
                              this.changeStatus}

                            defaultChecked color="success"/>
                        </span>{" "}
                        <span className="text-nowrap">Toggle Availability</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}

          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0 d-flex justify-content-between">
                  <div className="d-flex">
                    <h3> Your Waiting List</h3>
                  </div>
                  {this.state.hData.avalabilityStatus ? <Fab color="success" onClick={this.handleOpen} size="small" aria-label="add">
                    <AddIcon />
                  </Fab> : null}


                </CardHeader>

                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">SNo.</th>
                      <th scope="col">Name</th>
                      <th scope="col">Booking Time</th>
                      <th scope="col">Status</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.Hbooking && this.state.Hbooking.map((item, index) => (


                      <>
                      
                     {(item.bookingDate == this.state.today) ? 


                      
                        <tr>
                          <th scope="row">
                            <span className="mb-0 text-sm">
                              {index + 1}.                          </span>

                          </th>
                          <th scope="row">
                            <span className="mb-0 text-sm">
                              {item.patientname}
                            </span>

                          </th>

                          <td>
                            <div className="d-flex align-items-center">
                              <span className="mr-2">{item.bookingTime}</span>

                            </div>
                          </td>
                          <td>
                            <Badge color="" className="badge-dot mr-4">
                              {!item.status ? <i className="bg-warning" /> : item.status == 1 ? <i className="bg-info" /> : <i className="bg-success" />}

                              {!item.status ? "Pending" : item.status == 1 ? "Progress" : "Done"}

                            </Badge>
                          </td>


                          <td className="text-right">
                            <UncontrolledDropdown>
                              <DropdownToggle
                                className="btn-icon-only text-light"
                                href="#pablo"
                                role="button"
                                size="sm"
                                color=""
                                onClick={(e) => {
                                  e.preventDefault();
                                }

                                }
                              >
                                <i className="fas fa-ellipsis-v" />
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-arrow" right>
                                {(!index && item.status === 1) ? <DropdownItem

                                  onClick={() => {
                                    var data = this.state.Hbooking;


                                    var removedVal;
                                    for (let i = 0; i < this.state.Hbooking.length; i++) {
                                      if (item.bookingId == this.state.Hbooking[i].bookingId) {

                                        removedVal = data.splice(i, 1);
                                        removedVal[0].status = 2;
                                        this.setState({ Hbooking: data });
                                        console.log(data);
                                        firebase.database().ref("Hospitals/" + this.state.h_id).set({

                                          data: data,

                                        })
                                      }


                                      firebase.database().ref("hospitalHistory/" + this.state.h_id).get().then((snapshot) => {
                                        if (snapshot.exists()) {
                                          var hHistory = snapshot.val();
                                          console.log(hHistory.history);
                                          console.log(removedVal);
                                          hHistory.history.push(removedVal[0]);
                                          firebase.database().ref("hospitalHistory/" + this.state.h_id).set({

                                            history: hHistory.history,

                                          })

                                        } else {
                                          firebase.database().ref("hospitalHistory/" + this.state.h_id).set({

                                            history: removedVal,

                                          })
                                        }
                                      }).catch((error) => {
                                        console.error(error);
                                      });



                                    }


                                    if (item.bookingId != item.user_id)
                                      firebase.database().ref("users/" + item.user_id + "/YourBookings").get().then((snapshot) => {
                                        if (snapshot.exists()) {
                                          var tempData = snapshot.val();
                                          console.log(tempData)
                                          tempData.bookings.map((uitem, index) => {
                                            console.log(uitem);
                                            console.log(index);

                                            if (uitem.bookingId == item.bookingId) {
                                              tempData.bookings[index].status = 2;
                                            }
                                            console.log(tempData);


                                          })

                                          firebase.database().ref("users/" + item.user_id + "/YourBookings").set({
                                            bookings: tempData.bookings
                                          })



                                        } else {
                                          console.log("No data available");
                                        }
                                      }).catch((error) => {
                                        console.error(error);
                                      });


                                  }}
                                >

                                  Done
                                </DropdownItem> : null}
                                {!index ? <DropdownItem

                                  onClick={() => {
                                    var data = this.state.Hbooking;
                                    for (let i = 0; i < this.state.Hbooking.length; i++) {
                                      if (item.bookingId == this.state.Hbooking[i].bookingId)
                                        data[i].status = 1;
                                        if(index == 0){
                                          this.setState({PatientInProcess : item.patientname})
                                        }
                                      // this.setState({ PatientInProcess: data[i].patientname })
                                      this.setState({ Hbooking: data });
                                      firebase.database().ref("Hospitals/" + this.state.h_id).set({
                                        data: data
                                      })



                                      if (item.bookingId != item.user_id)
                                        firebase.database().ref("users/" + item.user_id + "/YourBookings").get().then((snapshot) => {
                                          if (snapshot.exists()) {
                                            var tempData = snapshot.val();
                                            console.log(tempData)
                                            tempData.bookings.map((uitem, index) => {
                                              console.log(uitem);
                                              console.log(index);

                                              if (uitem.bookingId == item.bookingId) {
                                                tempData.bookings[index].status = 1;
                                              }
                                              console.log(tempData);


                                            })

                                            firebase.database().ref("users/" + item.user_id + "/YourBookings").set({
                                              bookings: tempData.bookings
                                            })



                                          } else {
                                            console.log("No data available");
                                          }
                                        }).catch((error) => {
                                          console.error(error);
                                        });

                                    }
                                  }}
                                >
                                  Process
                                </DropdownItem> : null}
                                <DropdownItem
                                  href="#pablo"
                                  onClick={() => {
                                    var data = this.state.Hbooking;
                                    for (let i = 0; i < this.state.Hbooking.length; i++) {
                                      if (item.bookingId == this.state.Hbooking[i].bookingId)
                                        data.splice(i, 1);
                                      console.log(data);
                                      this.setState({ Hbooking: data });
                                      firebase.database().ref("Hospitals/" + this.state.h_id).set({

                                        data: data,

                                      })
                                    }
                                  }}
                                >
                                  Remove
                                </DropdownItem>

                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                        </tr>
                     : null}</>
                    ))}

                  </tbody>
                </Table>



              </Card>
            </div>
          </Row>
          
          



        </Container>


      </>
    );
  };
}



