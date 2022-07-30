import React, { Component } from 'react'
import firebase from '../../config/firebase-enquire'

import {
  Badge,

  Button,
  Card,
  CardHeader,
  Container,
  Row,
  
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  
  Table,
} from "reactstrap";
import UserHeader from 'components/Headers/UserProfile';
// import Loader from "../../components/loader/Loader.js";
import Lottie from "lottie-react";
import groovyWalkAnimation from "assets/lottie/9764-loader.json";

export default class Booking extends Component {

  constructor(props) {
    var today = new Date(),
      todayDate =
        today.getFullYear() +
        "-" +
        ((today.getMonth() + 1 < 10 ? "0" : "") + (today.getMonth() + 1)) +
        "-" +
        ((today.getDate() < 10 ? "0" : "") + today.getDate());
    var time = today.getHours() + ":" + today.getMinutes();
    super(props);
    this.state = {
      userData: {},
      booking: [],
      today: todayDate,
      time: time,
      loading:false,
    }


  }


  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .database()
          .ref("users/" + user.uid)
          .once("value")
          .then((snapshot) => {
            var data = snapshot.val();

            this.setState({ userData: data });
          })


        firebase.database().ref("users/" + user.uid + "/YourBookings").once("value").then((Childsnapshot) => {
          const bookingData = Childsnapshot.val();
          console.log(bookingData)

          // this.state.booking.push(bookingData);
          // Childsnapshot.forEach((item)=>{
          //     console.log(item.key)
          //     const data = item.key;
          //     this.state.booking.push({data: item.val()});

          // })

          this.setState({ booking: bookingData.bookings.reverse() })
          this.setState({loading:true});

          // this.state.booking.reverse();
          // this.setState({ booking: withNestedKeys });
          console.log(this.state.booking)                    //  Childsnapshot.forEach((item) => {
          //      console.log(item.val())
          //  })
        })

 } else {
        window.location.href = "/";
      }
    });
  }

  render() {
    return (
      <>
        <UserHeader />
        {/* Page content */}

        {this.state.loading ? (

          <Container className="mt--7" fluid>
            {/* Table */}
            <Row>
              <div className="col">
                <Card className="shadow">
                  <CardHeader className="border-0">
                    <h3 className="mb-0">Your Bookings</h3>
                  </CardHeader>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">

                      <tr>
                        <th scope="col">Hospitals</th>
                        <th scope="col">Booking Time</th>
                        <th scope="col">Booking Date</th>

                        <th scope="col">Status</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.booking && this.state.booking.map((items, index) => (
                        <>

                          {items.bookingDate == this.state.today ? <tr>

                            <th scope="row">
                              <Media className="align-items-center">

                                <Media>
                                  <span className="mb-0 text-sm">
                                    {items.hospitalName}
                                    {console.log(items)}
                                  </span>
                                </Media>
                              </Media>
                            </th>
                            <td>{items.bookingTime}</td>
                            <td>{items.bookingDate}</td>

                            <td>

                              {items.status == 0 ? <Badge color="" className="badge-dot mr-4 d-flex align-items-center">
                                <i className="bg-info" />pending </Badge> : (items.status == 1 ? <Badge color="" className="badge-dot mr-4 d-flex align-items-center">
                                  <i className="bg-success" />Inprogress </Badge> : <Badge color="" className="badge-dot mr-4 d-flex align-items-center">
                                  <i className="bg-warning" />Completed </Badge>)}

                            </td>

                            <td>
                              {/* <div className="d-flex align-items-center">
                        <span className="mr-2">60%</span>
                        <div>
                          <Progress
                            max="100"
                            value="60"
                            barClassName="bg-danger"
                          />
                        </div>
                      </div> */}
                              <a href={'/user/BookingDetail?Booking_id=' + items.bookingId}>
                                <Button color="primary" >
                                  View Details
                                </Button>
                              </a>

                            </td>
                            <td className="text-right">
                              <UncontrolledDropdown>
                                <DropdownToggle
                                  className="btn-icon-only text-light"
                                  href="#pablo"
                                  role="button"
                                  size="sm"
                                  color=""
                                  onClick={(e) => e.preventDefault()}
                                >
                                  <i className="fas fa-ellipsis-v" />
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-arrow" right>
                                  <DropdownItem
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    Action
                                  </DropdownItem>
                                  <DropdownItem
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    Another action
                                  </DropdownItem>
                                  <DropdownItem
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    Something else here
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </td>
                          </tr> : null}
                        </>


                      )
                      )}
                    </tbody>
                  </Table>
                </Card>
              </div>
            </Row>
          </Container>
        ) :
        <Lottie style={{width:'250px', marginLeft:'auto', marginRight:'auto'}}  animationData={groovyWalkAnimation} />

        //  <Loader/>
        }
      </>
    );
  }
}

