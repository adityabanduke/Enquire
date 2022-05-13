import React, { useState , Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import firebase from '../../config/firebase-enquire';
import {Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText} from 'reactstrap';

import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

export default class Dashboard extends Component {
	constructor(props){
		super(props);
		this.state={
           myOptions:[],
		}

		this.getDataFromAPI = this.getDataFromAPI.bind(this);

	}

	componentDidMount(){
		firebase.auth().onAuthStateChanged((user)=>{
			if(user)
        {  firebase.database().ref("users/"+ user.uid).once('value').then((snapshot)=>{
			  var userData = snapshot.val();
			  console.log(userData);
		  })}
		  else{
			  window.location.href("/login");
		  }
		})
	}



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
	if(data.length !== 0){
 let currentMyOptions = [];
    for (var i = 0; i < data.length; i++) {
		currentMyOptions.push(data[i])
	  console.log(data[i]);
    }
	// setMyOptions( currentMyOptions);
	this.setState({myOptions: currentMyOptions})

}
  }).then((err) => {
	  if(err){
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
	<div>
  <Navbar style={{ "width":"100%" }}
    color="transparent"
    
    expand="md"
    
  >
    <NavbarBrand href="/">
      Enquire
    </NavbarBrand>

		
	<Autocomplete
		style={{"width" : "50%", "color":"white", 'margin':'auto', 'borderRadius':'8'}}
		freeSolo
		autoComplete
		autoHighlight
		options={this.state.myOptions}
		renderInput={(params) => (
		<TextField {...params}
			onChange={this.getDataFromAPI}
			variant="outlined"
			label="Search Box"
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
<p>
	lorem1000
</p>


	</>
);
}
}


