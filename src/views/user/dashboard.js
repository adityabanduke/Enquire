import React, { useState, Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import firebase from '../../config/firebase-enquire';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText } from 'reactstrap';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { db } from '../../config/firebase-enquire';

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
					console.log(user);
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




	render() {
		return (



			// Navbar
			<>
				<div>
					<Navbar style={{ "width": "100%" }}
						color="transparent"

						expand="md"

					>
						<NavbarBrand href="/">
							Enquire
						</NavbarBrand>


						<Autocomplete
							style={{ "width": "50%", "color": "white", 'margin': 'auto', 'borderRadius': '8' }}
							freeSolo
							autoComplete
							autoHighlight
							options={this.state.myOptions}
							renderInput={(params) => (
								<TextField {...params}
									onChange={this.getDataFromAPI}
									variant="outlined"
									label="Search Box"
									onKeyUp={evt => this.handleKeyPress(evt)}
								// startAdornment={
								// 	<InputAdornment position="start">
								// 	  <SearchIcon />
								// 	</InputAdornment>
								//   }
								/>

							)}
						/>


					</Navbar>
				</div>


			</>
		);
	}
}











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