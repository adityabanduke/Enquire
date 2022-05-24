import React, { useState, Component, Link } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import firebase from '../../config/firebase-enquire';
import { Navbar, NavbarBrand, Container, Row, Col, NavbarToggler, Collapse, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText } from 'reactstrap';
import { green, pink } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import FolderIcon from '@mui/icons-material/Folder';
import PageviewIcon from '@mui/icons-material/Pageview';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { db } from '../../config/firebase-enquire';
import * as ttapi from '@tomtom-international/web-sdk-services';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import "../../assets/css/card.css";
import Loader from "../../components/loader/Loader.js";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';





export default class SearchResult extends Component {
	constructor(props) {
		super(props);
		this.state = {
			myOptions: [],
			hospitalData: [],
			loading:false,
			userLongitude:23.11,
			userLatitude:77.94,
			dandt:[],
			destinations: [],

		}

		this.getDataFromAPI = this.getDataFromAPI.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.getInfo = this.getInfo.bind(this);



	}

	

	

	componentDidMount() {

		// const { myOptions, hospitalData } = this.state;
		const temp = localStorage.getItem("hospitalData");
		if (temp) {

			this.setState({ hospitalData: JSON.parse(temp) });
			this.setState({loading:true});
			localStorage.clear();
		}

		firebase.auth().onAuthStateChanged((user) => {
			console.log("HI111111");
			if (user != null) {
				firebase.database().ref("users/" + user.uid).once('value').then((snapshot) => {
					var userData = snapshot.val();
					console.log(userData);
					this.setState({userLatitude:userData.latitude});
					this.setState({userLongitude:userData.longitude});



				})

		
			}
			else {
				window.location.href = "/login";
			}
		})
	}

	    
    getInfo = (destination) => {

		const callParameters = {
								key: "CE2fnCEGHeTVTeEERrtbhIeVXn7mPsnI",
								destinations: destination,
								origins: [{
									point: {
									  latitude: this.state.userLatitude,
									  longitude: this.state.userLongitude,
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

				this.setState({dandt:resultsArray});
				console.log(this.state.dandt);

			  })
		  })
		 
	
}
	


	handleKeyPress = (e) => {

		let mytags;
		if (e.key === 'Enter') {
			this.setState({loading:false});
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

							
                            
						
                            var arr = [];
							for( let i = 0; i < tempData.length; i++){
								arr.push({
									point: {
									  latitude: tempData[i].latitude,
									  longitude: tempData[i].longitude,
									}
								  })
							}

							this.setState({destinations:arr});
							console.log(this.state.destinations);

							console.log(this.state.userLatitude);
							console.log(this.state.userLongitude);

							

							this.getInfo(this.state.destinations);
							 
						
						

							this.setState({ hospitalData: tempData });
							console.log(this.state.hospitalData);
							// localStorage.setItem('hospitalData', JSON.stringify(this.state.hospitalData));

						}
						this.setState({loading:true});
					}).then(err => {
						if (err) {
							console.log(err);
						} else {
							console.log("Success");
							// localStorage.getItem("hospitalData");
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
					{/* Mask */}
					<span className="mask bg-gradient-default opacity-8" />
					<img src={"https://images.unsplash.com/photo-1629909613654-28e377c37b09?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1168"} style={{'position':'absolute' , 'opacity':'0.3','height': "500px", 'width':'100%', 'backgroundSize':"100% 100%"}} ></img>
					{/* Header container */}
					<Container className="d-flex align-items-center text-center justify-content-center" fluid>
						<Row>
							<Col>


								<Navbar style={{ "width": "40vw", 'margin': 'auto' , 'borderRadius':'8px' , 'color':'#fff', 'backgroundColor':'#fff' }}
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

								<p style={{ color: '#fff' }}>Search Hospital and Clinics here...</p>
							</Col>
						</Row>
					</Container>



				</div>
		
				<Container className='mt-4 mx-auto' >

					 {this.state.loading  ? ( this.state.dandt.length ?  this.state.hospitalData.map((hospital, index) => (
						<>
{console.log(hospital)}
{console.log(this.state.dandt)}

		<div key={index} className="container mt-5 mb-5" >
		<div className="d-flex justify-content-center row" >
			<div className="col-md-10">
				<div className="row p-2 bg-white border rounded" style={{ 'boxShadow': '0px 0px 6px 1px rgba(0,0,0,0.47)' }}>
					<div className="col-md-3 mt-1"><img className="img-fluid img-responsive rounded product-image" src={hospital.imageAsUrl ? hospital.imageAsUrl : "https://www.blkmaxhospital.com/slider-mobile.jpg"}/></div>
					<div className="col-md-6 mt-1">
						<h3>	{hospital.name}</h3>
						<div className="d-flex flex-row">
							<div className="ratings mr-2"><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /></div>
						</div>
						<div style={{width:'100%',backgroundColor:'#f5f6fa', borderRadius:'8px'}}className="d-flex  justify-content-around align-items-center p-1 mt-1 flex-row">
				<span className='d-flex'>
				<DirectionsCarIcon></DirectionsCarIcon>
				
				<h5 className='mt-1'>
					Driving Distance : {((this.state.dandt[index].drivingdistance)/1000).toPrecision(2)} KM
				</h5>
				</span>
			   
			

				
				<span className='d-flex'>
				<AccessTimeFilledIcon></AccessTimeFilledIcon>
				<h5 className='mt-1'>
					Driving Time : {(this.state.dandt[index].drivingtime/60).toPrecision(2)} Mins
				</h5>
				</span>
			   
			

				
                  
						</div>

												<p className="text-justify text-truncate  para mb-0">	{hospital.address}<br /><br /></p>
					</div>
					<div className="align-items-center align-content-center col-md-3 border-left mt-2">
					
						{console.log(hospital.avalabilityStatus)}
						{hospital.avalabilityStatus?<h5 className="text-success">Available</h5>:<h5 className="text-danger"> Not Available</h5>}
						<div className="d-flex flex-column mt-4">

						{hospital.avalabilityStatus?<button className="btn btn-primary btn-sm mt-2" type="button">
							<a style={{'color':'white'}} href={'/user/HospitalDetail?h_id=' + hospital.h_id}>

								Book Now
								</a>
								</button>:null}
					
							
						
							<button className="btn btn-outline-primary btn-sm mt-2" type="button">Bookmark</button>
							</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</>

					)) :<Loader/> ) : <Loader/>}




				</Container>

			</>
		);
	}
}


