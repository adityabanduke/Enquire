import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import firebase from '../../config/firebase-enquire'

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
	  if(data.length)
     data = snapshot.val();
    // console.log(data);
	
 let currentMyOptions = [];
    for (var i = 0; i < data.length; i++) {
		currentMyOptions.push(data[i])
	  console.log(data[i]);
    }
	setMyOptions( currentMyOptions);
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
	<div style={{ marginLeft: '40%', marginTop: '60px' }}>
	
	<Autocomplete
		style={{ width: 500 }}
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
	</div>
);
}

export default Dashboard;
