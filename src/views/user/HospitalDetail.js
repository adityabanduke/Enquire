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
import { useHistory, useParams } from 'react-router-dom'


export default class HospitalDetails extends Component {

    constructor(props) {
        
        super(props)
        this.state = {
            h_id: "",
        }
    }

    componentDidMount() {
        // var currenturl = window.location.pathname;
               // this.setState({ h_id: h_id });
               var currenturl = window.location.search;
               var currenturlsearch = new URLSearchParams(currenturl);
               var h_id = currenturlsearch.get("h_id");
               console.log(h_id)

this.setState({h_id : h_id});

  db.collection('Admin').doc(h_id).get().then((snapshot)=>{
  var hData = snapshot.data();
  console.log(hData);

  this.setState({hData : hData , users: hData.patients});
  })
        

    }


    bookAppointment= ()=>{
        db.collection('Admin').doc(this.state.h_id).add().then((snapshot)=>{
           
            })
    }
    render() {
        return (
            <>
                <div
                    className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                    style={{
                        minHeight: "600px",
                        // backgroundImage:`url(${this.state.hData.profilphoto})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center top",
                    }}
                >
                    {/* Mask */}
                    <span className="mask bg-gradient-default opacity-8" />
                    {/* Header container */}
                    <Container className="d-flex align-items-center" fluid>
                        <Row>
                            <Col lg="8" md="10">
                                {this.state.hData? <h1 className="display-2 text-white">{this.state.hData.name}</h1>:null}
                                {this.state.hData?<p className="text-white mt-0 mb-5">
              {this.state.hData.about}
            </p>:null}

                            </Col>
                        </Row>
                    </Container>
                </div>
                <Container className='text-center' fluid>

                <Button className='text-center my-4' color="info" onClick={this.bookAppointment}>
                            Book Appointment
                        </Button>
                </Container>
            </>
        )
    }
}
