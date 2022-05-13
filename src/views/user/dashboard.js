import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import firebase from '../../config/firebase-enquire';
import {Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText} from 'reactstrap';




const Dashboard = () => {

const [myOptions, setMyOptions] = useState([])

const getDataFromAPI = () => {
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
	setMyOptions( currentMyOptions);}
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
		style={{"width" : "50%", "color":"white", "marginLeft":"auto"}}
		freeSolo
		autoComplete
		autoHighlight
		options={myOptions}
		renderInput={(params) => (
		<TextField {...params}
			onChange={getDataFromAPI}
			variant="outlined"
			label="Search Box"
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

export default Dashboard;
