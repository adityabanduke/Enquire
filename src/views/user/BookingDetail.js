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
    CardTitle
} from "reactstrap";

import { db } from '../../config/firebase-enquire';
import firebase from '../../config/firebase-enquire';
import { useHistory, useParams } from 'react-router-dom';
import UserHeader from 'components/Headers/UserHeader';




export default class BookingDetail extends Component {

    constructor(props) {


        super(props)
        this.state = {
            b_id: "",
            b_no:0,
            h_id:"",
            h_name:"",
            book_time:'',
            book_date:'',

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
					console.log(Data);
         this.setState({user_id: user.uid});

		     Data.map((items)=>{
if(items.bookingId == this.state.b_id){
  this.setState({ b_no:items.bookingNo,
    h_id:items.h_id,
    h_name:items.hospitalName,
    book_time:items.bookingTime,
    book_date:items.bookingDate,})
}
         })
        




       


            



   
    })
}
else {
    window.location.href = "/login";
}
})

    }


    render() {
        return (
            <>
          
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
                         {this.state.b_no}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 
                      </span>{" "}
                      <span className="text-nowrap"></span>
                    </p>
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
                        <span className="h2 font-weight-bold mb-0">4</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                        <i className="fas fa-arrow-down" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last week</span>
                    </p>
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
                        <span className="h2 font-weight-bold mb-0">10 min</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-warning mr-2">
                        <i className="fas fa-arrow-down" /> 1.10%
                      </span>{" "}
                      <span className="text-nowrap">Since yesterday</span>
                    </p>
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
                        <span className="h2 font-weight-bold mb-0">Active</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 12%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
            </>
        )
    }
}
