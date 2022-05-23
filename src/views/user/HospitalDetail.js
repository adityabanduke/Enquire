import React, { Component } from 'react'
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

import { db } from '../../config/firebase-enquire';
import firebase from '../../config/firebase-enquire';
// import { useHistory, useParams } from 'react-router-dom';

import { nanoid } from 'nanoid'
import hospitalimg from "../../assets/img/hospital.jpg"
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
            Hbooking:[],
            hospitalName: '',
            booking_id: '',
            status: 0,

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
                    this.setState({ user_id: user.uid });


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
                        this.setState({ hData: hospitalData, hospitalName: hospitalData.name , profilepic:hospitalData.imageAsUrl? hospitalData.imageAsUrl : hospitalimg});

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

    this.setState({ booking_id : model });

}).then(()=>{
    

      



            this.state.booking.push({
                h_id: this.state.h_id, hospitalName: this.state.hospitalName, bookingDate: this.state.today,
                bookingTime: this.state.time, bookingId: this.state.booking_id, status: this.state.status
            })
            this.state.Hbooking.push({
                user_id: this.state.user_id, hospitalName: this.state.hospitalName, bookingDate: this.state.today,
                bookingTime: this.state.time,  bookingId: this.state.booking_id, status: this.state.status,h_id: this.state.h_id,
            })

            firebase.database().ref("Hospitals/" + this.state.h_id).set({
                data: this.state.Hbooking

            }).then(() => {

                firebase.database().ref("users/" + this.state.user_id + "/YourBookings").set({
                    bookings: this.state.booking
                })
            }).then(() => {
                // alert("Appointment Booked Successfully");
               window.location.href=`${'/BookingDetail?Booking_id='+ this.state.booking_id}`


        })

    })


    }
    render() {
        return (
            <>
                <div
                    className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                    style={{
                        minHeight: "200px",
                        //  backgroundImage:`url(${this.state.profilepic})`,
                        backgroundPosition: "center top",
                    }}
                >
                    {/* Mask */}
                    <span className="mask bg-gradient-default opacity-5" />
                    {/* Header container */}
                    <Container className="d-flex align-items-center justify-content-between" fluid>
                        <Row style={{"padding":'20px'}} className="d-flex justify-content-between">
                            <Col lg="4"><img src={this.state.profilepic} className="img-fluid img-responsive product-image" style={{'position':'absolute' , 'height':'150px'}} ></img></Col>
                            <Col lg="7" md="10" >
                                {this.state.hData ? <h1 className="display-2 text-white">{this.state.hospitalName}</h1> : null}
                                {this.state.hData ? <p className="text-white mt-0 mb-5">
                                    {this.state.hData.about}
                                </p> : null}

                            </Col>
                        </Row>
                    </Container>
                </div>
                <Container className='text-center mt-5' fluid>

                    <Button className='text-center my-4' color="info" onClick={this.bookAppointment}>
                        Book Appointment
                    </Button>
                </Container>
            </>
        )
    }
}
