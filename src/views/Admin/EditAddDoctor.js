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
    Modal,
} from "reactstrap";
import { storage } from '../../config/firebase-enquire'
import UserHeader from "components/Headers/UserHeader";
import getCroppedImg from "utils/cropImage";
import Cropper from "react-easy-crop";
import hospital from "../../assets/img/hospital.jpg";
import EditIcon from '@mui/icons-material/Edit';


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
            imageAsUrl: this.allInputs ,
            profilepic: '',
            newprofilepic: null,
            mentorModal: false,
            submitModal: false,
            Modal: false,
            profile: '',
            croppedArea: null,
            croppedAreaPixels: null,
            // coords: [],
            // longitude:'',
            // latitude:'',
      
            crop: {
              x: 0,
              y: 0,
              width: 250,
              height: 250,
            },
            zoom: 1,
        };

        this.setCropFunction = this.setCropFunction.bind(this);
        this.setZoomFunction = this.setZoomFunction.bind(this);
        this.onCropCompleteFunction = this.onCropCompleteFunction.bind(this);
        this.getNewImg = this.getNewImg.bind(this);
        this.uploadNewProfilePic = this.uploadNewProfilePic.bind(this);
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
    getNewImg = (e) => {
        this.setState({
          newprofilepic: URL.createObjectURL(e.target.files[0]),
        });
        this.setState({ mentorModal: true });
    
      };
    
      setCropFunction = (newcrop) => {
        this.setState({
          crop: newcrop,
        });
      };
      setZoomFunction = (newzoom) => {
        this.setState({
          zoom: newzoom,
        });
      };
      onCropCompleteFunction = (croppedArea, croppedAreaPixels) => {
        this.setState({
          croppedArea: croppedArea,
          croppedAreaPixels: croppedAreaPixels,
        });
    
      };
      uploadNewProfilePic = () => {
        getCroppedImg(
          this.state.newprofilepic,
          this.state.croppedAreaPixels,
          0
        ).then((result) => {
          this.setState({
            newprofilepic: null,
            profilepic: result,
          })
        }).then(() => {
          console.log(this.state.profilepic);
        })
      };
    


    UpdateData = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                db.collection('Admin').doc(user.uid).update(this.state.userData).then((err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }

            if (this.state.profilepic !== this.state.prevprofile) {
                firebase
                  .storage()
                  .ref("Admin/" + user.uid + "/profile.jpeg")
                  .putString(this.state.profilepic, "data_url")
                  .then((snapshot) => {


      
                    firebase
                      .storage()
                      .ref("Admin")
                      .child(user.uid + "/profile.jpeg")
                      .getDownloadURL()
                      .then((urls) => {
      
                        db.collection('Admin').doc(user.uid).update({
                          doctorImg: urls,
                        })
                        console.log(urls);
      
                        
      
                        // db.ref("users/" + user.uid)
                        //   .update({
                        //     profilepic: urls,
                        //   }).then(() => {
                        //     this.setState({ createloader: false });
      
                        //     this.submitmodal();
                        //   });
      
                      }).then(()=>{
                        window.location.href="/Admin/Profile"
                      })
                  })
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
             const link =  storage.ref('doctorImages').child(this.state.imageAsFile.name).getDownloadURL();
                console.log(link);
            })
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
                         {this.state.newprofilepic ?
                    (
                      <>
                        <Modal isOpen={this.state.mentorModal} toggle={this.toggleMentor}>
                          <Card className="cropperCard" style={{ width: '800px', height: "80vh", alignItems: "center", marginRight: "100px", justifyContent: "center", position: 'relative' }}>
                            {/* <CardHeader> */}
                            <Button size="lg" onClick={this.toggleMentor} style={{ position: "absolute", top: "0", left: "0", margin: "5px" }}>
                              {/* <FontAwesomeIcon
                            icon={faWindowClose}
                            style={{
                                color: "rgb(185, 185, 185)",
                                marginLeft: "auto",
                                cursor: "pointer",
                                fontSize: "20px",
                                zIndex:'100',
                            }}
                        /> */}
                            </Button>
                            {/* </CardHeader> */}
                            <div className="imgCropperParentDiv">
                              <Cropper
                                className="cropperClass"
                                image={this.state.newprofilepic}
                                crop={this.state.crop}
                                zoom={this.state.zoom}
                                aspect={1 / 1}
                                onCropChange={this.setCropFunction}
                                onCropComplete={this.onCropCompleteFunction}
                                onZoomChange={this.setZoomFunction}
                              />

                            </div>
                            <Button color="primary" className="cancel" onClick={this.uploadNewProfilePic}>
                              Upload
                            </Button>
                            {/* </CardFooter> */}
                          </Card>
                        </Modal>
                      </>
                    ) : null}

                  {/* <Form className="py-3" onSubmit={this.handleFireBaseUpload}>

                  <h6 className="heading-small text-muted mb-4">
                      Profile Image
                    </h6>
                    <input
                      // allows you to reach into your file directory and upload image to the browser
                      type="file"
                      onChange={this.handleImageAsFile}
                    />
                    <button>Save</button>
                  </Form> */}
                 
                        <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                            <Card className="card-profile shadow">
                                <Row>
                                <div
                    style={{
                      display: "flex",
                      width: "fit-content",
                      position: "relative",
                    }}
                    className="align-items-center"
                  >
                    <img
                      alt="..."
                      className="rounded-circle"
                      style={{
                        width: "100px",
                        height: "100px",
                        margin: "0 20px",
                      }}
                      src={
                        this.state.userData
                          ? this.state.userData.profilepic
                          : hospital
                      }
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: "-10px",
                        right: "0",
                        width: "30px",
                      }}
                    >
                      <div className="image-upload">
                        <label htmlFor="file-input" style={{ display: "block" }}>
                          {/* <FontAwesomeIcon
                            icon={faPen}
                            style={{
                              fontSize: "30px",
                              color: "#5E72E4",
                              backgroundColor: "#DEE1E6",
                              borderRadius: "50%",
                              padding: "30%",
                              cursor: "pointer",
                            }}
                          /> */}
                          <EditIcon />
                        </label>
                        <input
                          id="file-input"
                          type="file"
                          style={{ display: "none" }}
                          onChange={this.getNewImg}
                        />
                      </div>
                    </div>
                  </div>
                                </Row>
                                {/* <Row className="justify-content-center">
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
                                </Row> */}

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
                                        <Col lg="12">
                                            <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-username"
                                                >
                                                    Degree
                                                </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    defaultValue={this.state.userData.degree}
                                                    id="input-username"
                                                    placeholder={this.state.userData.degree}
                                                    type="text"
                                                    onChange={e => this.setState({ userData: { ...this.state.userData, degree: e.target.value } })}
                                                    disabled
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    {/* <Row>
                                        <Col lg="6">
                                            <form>
                                                <input
                                                    // allows you to reach into your file directory and upload image to the browser
                                                    type="file"
                                                    onChange={this.handleImageAsFile}
                                                />
                                            </form></Col>
                                    </Row> */}
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
