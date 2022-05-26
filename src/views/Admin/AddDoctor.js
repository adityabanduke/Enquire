import React, { Component } from 'react'
import firebase from '../../config/firebase-enquire'
import { db } from '../../config/firebase-enquire'
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
import UserHeader from "components/Headers/UserHeader";
export default class AddDoctor extends Component {
    allInputs = { imgUrl: '' }
    constructor(props) {
        super(props);
        this.state = {
            userData: {},
            adminData: {},
            tags: [],
            uniTags: [],
            DATA: [],
            selectBool: true,
            imageAsFile: '',
            imageAsUrl: this.allInputs
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
            if (user) {
                console.log(user.uid);
                db.collection("Admin").doc(user.uid).get().then((snapshot)=>{
                  console.log(snapshot.data());
                  var hospitalData = snapshot.data();
                  console.log(hospitalData.name);
                  
                   this.setState({userData:hospitalData,adminData:hospitalData});
                })
            }

        }
        )
    }

    render() {
        return (
            <>
                <UserHeader adminData={{}} />

                <Container className="mt--7" fluid >
                    <Row className='justify-content-center'>

                        {/* <Col className="order-xl-1" xl="12">
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
                                            Add Doctor
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
                                                            defaultValue={this.state.userData.name}
                                                            id="input-username"
                                                            placeholder={this.state.userData.name}
                                                            type="text"
                                                            onChange={e => this.setState({ userData: { ...this.state.userData, name: e.target.value } })}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-username"
                                                        >
                                                            Speciality
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            defaultValue={this.state.userData.name}
                                                            id="input-username"
                                                            placeholder={this.state.userData.name}
                                                            type="text"
                                                            onChange={e => this.setState({ userData: { ...this.state.userData, name: e.target.value } })}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg="6">
                                                    <form onSubmit={this.handleFireBaseUpload}>
                                                        <input
                                                            // allows you to reach into your file directory and upload image to the browser
                                                            type="file"
                                                            onChange={this.handleImageAsFile}
                                                        />
                                                        <button>upload to firebase</button>
                                                    </form></Col>
                                            </Row>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col> */}
                        <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                            <Card className="card-profile shadow">
                                <Row className="justify-content-center">
                                    <Col className="order-lg-2" lg="3">
                                        <div className="card-profile-image">
                                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                                {this.state.userData && <img
                                                    alt="..."
                                                    className="rounded-circle"

                                                      src={this.state.userData.doctorImg}
                                                    height='100'
                                                    width='100'

                                                />}
                                            </a>
                                        </div>
                                    </Col>
                                </Row>

                                <CardBody className="mt-5 pt-5 pt-md-4">

                                    <Row>
                                        <Col lg="12">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-username"
                                                >
                                                    Name
                                                </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    defaultValue={this.state.userData.name}
                                                    id="input-username"
                                                    placeholder={this.state.userData.name}
                                                    type="text"
                                                    onChange={e => this.setState({ userData: { ...this.state.userData, name: e.target.value } })}
                                                    disabled
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col lg="12">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-username"
                                                >
                                                    Speciality
                                                </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    defaultValue={this.state.userData.name}
                                                    id="input-username"
                                                    placeholder={this.state.userData.name}
                                                    type="text"
                                                    onChange={e => this.setState({ userData: { ...this.state.userData, name: e.target.value } })}
                                                    disabled
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </CardBody>
                                <div className='d-flex justify-content-center mb-4'>
                                <Button
                                    color="info"
                                    href="/admin/edit-doctor"
                                >
                                    Edit
                                </Button>
                                </div>

                            </Card>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}
