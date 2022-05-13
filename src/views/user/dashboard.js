import React, { useState, Component } from 'react'
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
import {db} from '../../config/firebase-enquire';



export default class dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			myOptions: [],
			hospitalData: [],
		}

		this.getDataFromAPI = this.getDataFromAPI.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);


	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				firebase.database().ref("users/" + user.uid).once('value').then((snapshot) => {
					var userData = snapshot.val();
					console.log(userData);
				
				})
			}
			else {
				window.location.href = "/login";
			}
		})
	}

	handleKeyPress = (e) => {
		let mytags;
		if (e.key === 'Enter') {
			console.log("you hit enter...................");
			console.log(e.target.value);
			if(e.target.value != null)
			{mytags = e.target.value.split(" ");
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
						minHeight: "400px",

						backgroundSize: "cover",
						backgroundPosition: "center top",
					}}
				>
					{/* Mask */}
					<span className="mask bg-gradient-default opacity-8" />
					{/* Header container */}
					<Container className="d-flex align-items-center text-center justify-content-center" fluid>
						<Row>
							<Col>


								<Navbar style={{ "width": "40vw", 'margin': 'auto' }}
									color="transparent"



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
				<Container fluid className='mt-5 p-3'>
				<Stack direction="row" spacing={30} style={{'justifyContent':'center', 'textAlign':'center', 'padding':'5px'}}>
						<div ><Avatar  sx={{ bgcolor: pink[500] , width: 120, height: 120 }}>
							<FolderIcon sx={{ fontSize: 40 }}/>
							
							
						</Avatar><h2>Profile</h2></div>
						<div>
						<Avatar sx={{ bgcolor: pink[500] , width: 120, height: 120 }}>
							<PageviewIcon sx={{ fontSize: 40 }}/>
							

						</Avatar>
						<h2>Your Bookings</h2>
						</div>

						<div>
						<Avatar sx={{ bgcolor: green[500] , width: 120, height: 120}}>
							<AssignmentIcon sx={{ fontSize: 40 }}/>
							

						</Avatar>
						<h2>History</h2>
						</div>
					</Stack>
					</Container>

			</>
		);
	}
}


