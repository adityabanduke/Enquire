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
import { storage } from '../../config/firebase-enquire'
import UserHeader from "components/Headers/UserHeader";
export default class EditAddDoctor extends Component {
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
                db.collection("Admin").doc(user.uid).get().then((snapshot) => {
                    console.log(snapshot.data());
                    var hospitalData = snapshot.data();
                    console.log(hospitalData.name);
                    this.setState({ userData: hospitalData, adminData: hospitalData });
                    console.log(this.state.userData);
                })
            }

        }
        )
    }
    handleImageAsFile = (e) => {
        const image = e.target.files[0]
        this.setState({ imageAsFile: image })
    }


    UpdateData = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                db.collection('Admin').doc(user.uid).update(this.state.userData).then((err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        })
        console.log('start of upload')
        // async magic goes here...
        if (this.state.imageAsFile === '') {
            console.error(`not an image, the image file is a ${typeof (this.state.imageAsFile)}`)
        }
        const uploadTask = storage.ref(`/doctorImage/${this.state.imageAsFile.name}`).put(this.state.imageAsFile)
        //initiates the firebase side uploading 
        uploadTask.on('state_changed',
            (snapShot) => {
                //takes a snap shot of the process as it is happening
                console.log(snapShot)
            }, (err) => {
                //catches the errors
                console.log(err)
            }, () => {
                // gets the functions from storage refences the image storage in firebase by the children
                // gets the download url then sets the image from firebase as the value for the imgUrl key:
                // const anda = storage.ref('doctorImage').child(this.state.imageAsFile.name).getDownloadURL()
                console.log(this.state.imageAsFile.name);
                storage.ref('doctorImages').child(this.state.imageAsFile.name).getDownloadUrl()
                    .then(fireBaseUrl => {
                        //  this.setState({imageAsUrl:{...prevObject, imgUrl: fireBaseUrl})
                        //  setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
                        console.log(fireBaseUrl)
                        this.setState({ userData: { ...this.state.userData, doctorImg: fireBaseUrl } })
                        console.log(this.state.userData.doctorImg)
                    })
            })
    }
    handleFireBaseUpload = e => {
  
    }
    render() {
        return (
            <>
                <UserHeader adminData={this.state.adminData} />

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

                                                      src={`${this.state.userData.doctorImg}`}
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
                                                    defaultValue={this.state.userData.doctorName}
                                                    id="input-username"
                                                    placeholder={this.state.userData.doctorName}
                                                    type="text"
                                                    onChange={e => this.setState({ userData: { ...this.state.userData, doctorName: e.target.value } })}

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
                                                    defaultValue={this.state.userData.doctorSpec}
                                                    id="input-username"
                                                    placeholder={this.state.userData.doctorSpec}
                                                    type="text"
                                                    onChange={e => this.setState({ userData: { ...this.state.userData, doctorSpec: e.target.value } })}

                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg="6">
                                            <form>
                                                <input
                                                    // allows you to reach into your file directory and upload image to the browser
                                                    type="file"
                                                    onChange={this.handleImageAsFile}
                                                />
                                                <button>upload to firebase</button>
                                            </form></Col>
                                    </Row>
                                </CardBody>
                                <div className='d-flex justify-content-center mb-4'>
                                    <Button
                                        color="info"
                                        // href="/admin/dashboard"
                                        onClick={this.UpdateData}
                                    >
                                        Save
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
