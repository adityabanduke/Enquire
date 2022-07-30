import React, { Component } from 'react'
import {
    Button,
    Card,
    CardBody,

    Container,
    Row,
    Col,
} from "reactstrap";
import AddLocationIcon from '@mui/icons-material/AddLocation';
import { db } from '../../config/firebase-enquire';
import firebase from '../../config/firebase-enquire';
// import { useHistory, useParams } from 'react-router-dom';
import ForumIcon from '@mui/icons-material/Forum';
import { nanoid } from 'nanoid'
import hospitalimg from "../../assets/img/hospital.jpg"
import doctor from "../../assets/img/doctor.jpg"
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import { Chip } from "@material-ui/core";

export default class HospitalDetails extends Component {

    constructor(props) {

        var today = new Date(),
            todayDate =
                today.getFullYear() +
                "-" +
                ((today.getMonth() + 1 < 10 ? "0" : "") + (today.getMonth() + 1)) +
                "-" +
                ((today.getDate() < 10 ? "0" : "") + today.getDate());
        var time = today.getHours() + ":" + today.getMinutes();

        super(props)
        this.state = {
            h_id: "",
            user_id: "",
            today: todayDate,
            time: time,
            booking: [],
            Hbooking: [],
            hospitalName: '',
            booking_id: '',
            status: 0,
patientName:'',

        }
        this.bookAppointment = this.bookAppointment.bind(this);
    }

    componentDidMount() {
        // var currenturl = window.location.pathname;
        // this.setState({ h_id: h_id });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                firebase.database().ref("users/" + user.uid).once('value').then((snapshot) => {
                    var Data = snapshot.val();
                    console.log(Data);
                    this.setState({ user_id: user.uid , patientName: Data.username});


                    var currenturl = window.location.search;
                    var currenturlsearch = new URLSearchParams(currenturl);
                    var h_id = currenturlsearch.get("h_id");
                    console.log(h_id)

                    this.setState({ h_id: h_id });




                    firebase.database().ref("users/" + user.uid + "/YourBookings").once('value').then((snapshot) => {
                        var BData = snapshot.val();
                        console.log(BData);
                        this.setState({ booking: BData.bookings ? BData.bookings : [] });

                    })

                    firebase.database().ref("Hospitals/" + this.state.h_id).once('value').then((snapshot) => {
                        var BData = snapshot.val();
                        console.log(BData);
                        this.setState({ Hbooking: BData.data ? BData.data : [] });

                    })

                    db.collection("Admin").doc(h_id).get().then((snapshot) => {
                        console.log(snapshot.data());
                        var hospitalData = snapshot.data();
                        console.log(hospitalData.name);
                        this.setState({ hData: hospitalData, hospitalName: hospitalData.name, profilepic: hospitalData.imageAsUrl ? hospitalData.imageAsUrl : hospitalimg });

                        // console.log(userData);
                    }).then((err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("Success!!!")
                        }
                    })


                })
            }
            else {
                window.location.href = "/Login";
            }
        })

    }

    bookAppointment = () => {
        // db.collection('Admin').doc(this.state.h_id).update({
        //     users: db.FieldValue.arrayUnion(this.state.userData)
        // });

        firebase.database().ref("users/" + this.state.user_id + "/YourBookings").once('value').then((snapshot) => {

            var model = nanoid()

            this.setState({ booking_id: model });

        }).then(() => {






            this.state.booking.push({
                h_id: this.state.h_id, hospitalName: this.state.hospitalName, bookingDate: this.state.today,
                bookingTime: this.state.time, bookingId: this.state.booking_id, status: this.state.status
            })
            this.state.Hbooking.push({
                user_id: this.state.user_id, hospitalName: this.state.hospitalName, bookingDate: this.state.today,
                bookingTime: this.state.time, bookingId: this.state.booking_id, status: this.state.status, h_id: this.state.h_id,
                patientname:this.state.patientName
            })

            firebase.database().ref("Hospitals/" + this.state.h_id).set({
                data: this.state.Hbooking

            }).then(() => {

                firebase.database().ref("users/" + this.state.user_id + "/YourBookings").set({
                    bookings: this.state.booking
                })
            }).then(() => {
                // alert("Appointment Booked Successfully");
                 window.location.href = `${'/user/BookingDetail?Booking_id=' + this.state.booking_id}`


            })

        })


    }
    render() {
        return (
            <>
            <div>
             {this.state.hData ? 
             <div>
             
             <div
                    className="header pb-4 pt-2 pt-lg-8 d-flex align-items-center"
                    style={{
                        Height: "200px",
                        //  backgroundImage:`url(${this.state.profilepic})`,
                        backgroundPosition: "center top",
                    }}
                >
                    {/* Mask */}
                    <span className="mask bg-gradient-info opacity-7" />
                    {/* Header container */}
                    <Container className="d-flex align-items-center justify-content-between" fluid>
                        <Row style={{ "padding": '20px' }} className="d-flex justify-content-between">
                            <Col lg="4"><img src={this.state.profilepic} className="img-fluid img-responsive product-image shadow  bg-white rounded" style={{ 'position': 'absolute', 'height': '200px' }} alt="profile Image"></img></Col>
                            <Col lg="7" md="10" >
                                {this.state.hData ? <h1 className="display-2 text-white">{this.state.hospitalName}</h1> : null}
                                {this.state.hData ? <p className="text-white mt-0 mb-5">
                                    {this.state.hData.about}
                                </p> : null}

                                <div className="text-white mt-0 mb-5"><p color='#fff'><AddLocationIcon/> {this.state.hData.address}</p>
                                <p color='#fff'><EmailIcon/> {this.state.hData.email}</p>
                                                       <p><LanguageIcon/> {this.state.hData.city},{this.state.hData.country}</p>

                                </div>

                            </Col>

                        </Row>
                    </Container>
                </div>
                <Container className='text-center mt-5' fluid>

<div className='text-left justify-content-left align-items-center'>


<h1 className=" mb-1">Specialities</h1>
<hr style={{width:'100px' , backgroundColor:'#3972C1', marginLeft:'0'}}></hr>

                  <div className="pl-lg-2 mb-4">
                    <Row>
                    
                    { this.state.hData.tags && this.state.hData.tags.map((tag)=>(
                      
                    <Chip className="ml-2" label={tag} color="primary" />
                 ) )}
                    </Row>
                  </div>



                    <h1 >Featured Doctor</h1>
                    <hr style={{width:'100px' , backgroundColor:'#3972C1', marginLeft:'0'}}></hr></div>
                    <Card className='shadow p-3 mb-5 bg-white rounded '>
                        <CardBody>
                        <Row><Col lg={4} md={8}><img src={doctor} className='rounded-circle' style={{width:'150px',height:'150px' }}/></Col>
                         <Col style={{borderLeft:'1px solid grey'}} lg={4} md={8} className='text-center align-items-center'><h1>{this.state.hData.doctorName}</h1> <h3>{this.state.hData.doctorSpec}</h3>


                         <br></br>
                         <p><AddLocationIcon/> {this.state.hospitalName}</p>
                         <p><ForumIcon/> Hindi , English</p>
                       </Col><Col lg={4}>
                           
                           <h2 color='#3972C1'>Mon - Fri</h2>
                           <p color='#4FA9E2'>(10.00 AM-5.00 PM)</p>
                            <Button className='text-center my-4' color="info" onClick={this.bookAppointment}>
                            Book Appointment
                        </Button></Col></Row>
                        </CardBody></Card>

                </Container>
                </div>
                 : <h1>Loading...</h1>}
                </div>
            </>
        )
    }
}
