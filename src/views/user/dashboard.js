import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import firebase from '../../config/firebase-enquire';
import { Navbar, Container, Row, Col, } from 'reactstrap';
// import { green, pink } from '@mui/material/colors';
// import Avatar from '@mui/material/Avatar';
// import Stack from '@mui/material/Stack';
import FolderIcon from '@mui/icons-material/Folder';
import PageviewIcon from '@mui/icons-material/Pageview';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { db } from '../../config/firebase-enquire';
import * as ttapi from '@tomtom-international/web-sdk-services';

import "../../assets/css/contact.css"

// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

// import StepProgressBar from 'react-step-progress';
// import the stylesheet
// import 'react-step-progress/dist/index.css';
// import "../../assets/css/Actionbutton.css"

import {
	Button,
	Card,

	Modal,


} from "reactstrap";


export default class dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			myOptions: [],
			hospitalData: [],
			userData: {},
			pModal: false,
			dandt: [],
			destinations: [],
			userLongitude: 0,
			userLatitude: 0,
			loading:true,
		}

		this.getDataFromAPI = this.getDataFromAPI.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.getInfo = this.getInfo.bind(this);


	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				firebase.database().ref("users/" + user.uid).once('value').then((snapshot) => {
					var userData = snapshot.val();
					console.log(userData);
					this.setState({ userData: userData })

				})

			}
			else {
				window.location.href = "/";
			}


		})
	}


	getInfo =  async (destination) => {

		const callParameters = {
			key: "CE2fnCEGHeTVTeEERrtbhIeVXn7mPsnI",
			destinations: destination,
			origins: [{
				point: {
					latitude: this.state.userData.latitude,
					longitude: this.state.userData.longitude,
				}
			}]
		}

		return new Promise((resolve, reject) => {
			ttapi.services
				.matrixRouting(callParameters).then((matrixApIResults) => {
					const results = matrixApIResults.matrix[0];
					console.log(results);
					const resultsArray = results.map((result, index) => {
						console.log(result);


						return {
							// location: locations[index],
							drivingtime: result.response.routeSummary.travelTimeInSeconds,
							drivingdistance: result.response.routeSummary.lengthInMeters,

						}
					})
					console.log("hi how are you");

					this.setState({ dandt: resultsArray });
					console.log(this.state.dandt);
                    localStorage.setItem('dandt', JSON.stringify(resultsArray));



				})
		})


	}


	handleKeyPress = (e) => {
		let mytags;
		// const { myOptions, hospitalData } = this.state;
		if (e.key === 'Enter') {
			this.setState({loading:false})
			console.log("you hit enter...................");
			console.log(e.target.value);
			if (e.target.value != null) {
				mytags = e.target.value.split(" ");
				mytags.push(e.target.value);


				db.collection('Admin')
					.where('tags', 'array-contains-any', mytags).get().then((snapshot) => {
						let tempData = [];
						if (snapshot.docs.length > 0) {

							snapshot.docs.forEach((doc) => {

								tempData.push(doc.data());

							})


							this.setState({ hospitalData: tempData });
							console.log(this.state.hospitalData);
							localStorage.setItem('hospitalData', JSON.stringify(this.state.hospitalData));

							var arr = [];
							for (let i = 0; i < tempData.length; i++) {
								arr.push({
									point: {
										latitude: tempData[i].latitude,
										longitude: tempData[i].longitude,
									}
								})
							}

							this.setState({ destinations: arr });
							console.log(this.state.destinations);

							console.log(this.state.userLatitude);
							console.log(this.state.userLongitude);

							localStorage.setItem('destination', JSON.stringify(arr));

							this.getInfo(this.state.destinations).then( () => {
								this.setState({loading:true})
								
								this.setState({loading:false})
							
							});



                            







						}
					}).then(err => {
						if (err) {
							console.log(err);
						} else {
							console.log("Success");

							

						}
					})
			}
		}
	};



	// const Dashboard = () => {

	// const [myOptions, setMyOptions] = useState([])

	getDataFromAPI = () => {
		console.log("Options Fetched from API")
		let data;
		firebase
			.database()
			.ref("search_tags")
			.once("value")
			.then((snapshot) => {

				data = snapshot.val();
				// console.log(data);
				if (data.length !== 0) {
					let currentMyOptions = [];
					for (var i = 0; i < data.length; i++) {
						currentMyOptions.push(data[i])
						console.log(data[i]);
					}
					// setMyOptions( currentMyOptions);
					this.setState({ myOptions: currentMyOptions })

				}
			}).then((err) => {
				if (err) {
					console.log(err);
				}
			})
	};











	// useEffect(() => {
	//   // firebase.auth().onAuthStateChanged((user) => {
	//      // if (user) {
	//         firebase
	//           .database()
	//           .ref("users/" + 'user1')
	//           .once("value")
	//           .then((snapshot) => {
	//             var data = snapshot.val();
	//             console.log(data.username);
	//             setUserData(data);
	//           })
	//           .then(() => { 
	//             document.getElementById("userHeaderNameId").innerHTML =userData.username;
	//           });
	//       // } else {
	//       //   window.location.href = "/";
	//       // }
	//     // });
	//   }, [])

	redirect = (loc) => {
		if (loc == "profile") {
			window.location.href = "/user/Profile";
		}
		if (loc == "booking") {
			window.location.href = "/user/Booking";
		}
		if (loc == "history") {
			window.location.href = "/user/History";
		}
	}

	toggleSubmit = () => {
		if (this.state.pModal) {
			console.log("Modal Close");
			this.setState({
				pModal: false,
			});
		} else {
			console.log("Modal Open");
			this.setState({
				pModal: true,

			});
		}
	};


	step2Validator = () => {
		if (this.state.userData.contact && this.state.userData.address) {
			this.step3Validator();
			return true

		} else {
			this.setState({ pModal: true })
		}
	}
	step3Validator = () => {
		if (this.state.userData.profilepic) {
			return true
		} else {
			this.setState({ pModal: true })
		}
	}

	render() {


		return (



			// Navbar
			<>


				<div
					className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
					style={{
						minHeight: "500px",

						backgroundSize: "cover",
						backgroundPosition: "center top",
					}}
				>
					<Modal isOpen={this.state.pModal} toggle={this.toggleSubmit}>
						<Card style={{ width: '100%', height: "30vh", alignItems: "center", justifyContent: 'center', position: 'relative' }}>

							<h2>Complete Your Profile</h2>

							<a href="/user/Profile"><Button color="info">View Profile</Button></a>
						</Card>
					</Modal>
					{/* Mask */}
					<span className="mask bg-gradient-default opacity-8" />
					<img src={"https://images.unsplash.com/photo-1629909613654-28e377c37b09?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1168"} style={{ 'position': 'absolute', 'opacity': '0.3', 'height': "500px", 'width': '100%', 'backgroundSize': "100% 100%" }} ></img>
					{/* Header container */}
					<Container className="d-flex align-items-center text-center justify-content-center" fluid>
						<Row>
							<Col>


								<Navbar style={{ "width": "40vw", 'margin': 'auto', 'borderRadius': '8px', 'color': '#fff', 'backgroundColor': '#fff' }}
									color="#fff"
								>


									<Autocomplete
										style={{ "width": "100%" }}
										freeSolo

										autoComplete
										autoHighlight
										options={this.state.myOptions}
										renderInput={(params) => (
											<TextField {...params}
												onChange={this.getDataFromAPI}
												onKeyUp={this.handleKeyPress}
												variant="outlined"
												label="Search Box"
												color='primary'
												focused
											// startAdornment={
											// 	<InputAdornment position="start">
											// 	  <SearchIcon />
											// 	</InputAdornment>
											//   }
											/>


										)}
									/>

								</Navbar>

								<p className='my-2' style={{ color: '#fff' }}>Search Hospital and Clinics here...</p>
							</Col>
						</Row>
					</Container>



				</div>
                  {
					  this.state.dandt.length?

					<>
					
					{ window.location.href = "/user/searchresult"}
					<h1>
					 Search Results ....
					</h1>
					</>
					  	
							 
								 
				
							  :
	            <>			
				<Container fluid className='mt-5 p-3'>


					<div>
						{/* <h1>Complete Your Profile</h1> */}

						{/* <StepProgressBar
							startingStep={0}

							buttonWrapperClass={ulStyle}
							// onSubmit={onFormSubmit}
							steps={[
								{
									label: 'Step 1',
									subtitle: '10%',
									name: 'step 1',
									content: step1Content,

								},
								{
									label: 'Step 2',
									subtitle: '50%',
									name: 'step 2',
									content: step2Content,
									validator: this.step2Validator
								},
								{
									label: 'Step 3',
									subtitle: '100%',
									name: 'step 3',
									content: step3Content,
									validator: this.step3Validator

								}
							]}
						/> */}
					</div>


					<div className='d-flex flex-wrap' style={{ 'justifyContent': 'center', 'textAlign': 'center', 'padding': '5px' }}>
						<div className='mx-7' onClick={() => this.redirect('profile')}>

							{/* <Avatar sx={{ bgcolor: pink[500], width: 100, height: 100 , boxShadow:'0px 5px 15px 0px rgba(0, 0, 0, 0.35)'}}>
							<FolderIcon sx={{ fontSize: 40 }} />


						</Avatar> */}

							<button type="button" className="btn btn-info" style={{ 'borderRadius': '50%' }}>
								<span className="badge  p-3"><FolderIcon sx={{ height: 50, width: 35 }} />
								</span>
							</button>
							<h2 className=' my-3'>Profile</h2></div>



						<div className='mx-7' onClick={() => this.redirect('booking')}>
							{/* <Avatar sx={{ bgcolor: pink[500], width: 100, height: 100, boxShadow: '0px 5px 15px 0px rgba(0, 0, 0, 0.35)' }}>
								<PageviewIcon sx={{ fontSize: 40 }} />
								 box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; 
							</Avatar> */}
							<button type="button" class="btn btn-success" style={{ 'borderRadius': '50%' }}>
								<span class="badge  p-3">
									<PageviewIcon sx={{ height: 50, width: 35 }} />
								</span>
							</button>
							<h2 className=' my-3'>Your Bookings</h2>
						</div>

						<div className='mx-7' onClick={() => this.redirect('history')}>
							{/* <Avatar sx={{ bgcolor: green[500], width: 100, height: 100, boxShadow: '0px 5px 15px 0px rgba(0, 0, 0, 0.35)' }}>
								<AssignmentIcon sx={{ fontSize: 40 }} />


							</Avatar> */}
							<button type="button" class="btn btn-danger" style={{ 'borderRadius': '50%' }}>
								<span class="badge  p-3">
									<AssignmentIcon sx={{ height: 50, width: 35 }} />
								</span>
							</button>
							<h2 className=' my-3'>History</h2>
						</div>
					</div>
				</Container>
				<Container className='mt-1 mx-auto' >

					{/* {   this.state.hospitalData && this.state.hospitalData.map((hospital) => (
					
					<Card  sx={{ display: 'flex', flexDirection: 'row', width: "80%" , marginBottom:'5vh' }}>
						<CardMedia
							component="img"
							alt="green iguana"
							height="140"
							
							image="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80"
						/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="div">
								{hospital.name}
							</Typography>
							<div>

							</div>
							<Typography variant="body2" color="text.secondary">
						{	hospital.address}
							</Typography>
						</CardContent>
						<CardContent>
							<CardActions sx={{ display: 'flex', flexDirection: 'column',  }}>
							
							<a href={'/user/HospitalDetail?h_id='+hospital.h_id}><Button variant="contained" fullWidth color="success" >
BOOK NOW
</Button></a>	
							</CardActions>
						</CardContent>

					</Card>

        
      ))} */}




				</Container>
				</>
                
				
	}

			</>
		);
	}
}


