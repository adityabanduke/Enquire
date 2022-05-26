import { useEffect, useState, useRef } from 'react';
import * as tt from '@tomtom-international/web-sdk-maps';
import * as ttapi from '@tomtom-international/web-sdk-services';
import '../assets/css/location.css';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import {Button} from 'reactstrap';
import TextField from '@mui/material/TextField';
import firebase from '../config/firebase-enquire';





function UserLocation() {
  const mapElement = useRef()
  const [map, setMap] = useState({})
  const [latitude, setLatitude] = useState(23.30778);
  const [longitude, setLongitude] = useState(77.33058);
  const [location, setLocation] = useState();
  const [user, setUser] = useState();
  
  useEffect(() => {
    
    if ("geolocation" in navigator) {
      console.log("Available");
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position);
        console.log("Latitude is :", position.coords.latitude);
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        console.log("Longitude is :", position.coords.longitude);
  

        
      });
    } else {
      console.log("Not Available");
    }
    
  
  
  }, [])
  

  useEffect(() => {

  
    let map = tt.map({
      key: "CE2fnCEGHeTVTeEERrtbhIeVXn7mPsnI",
      container: mapElement.current,
      stylesVisibility: {
        trafficIncidents: true,
        trafficFlow: true
      },
      center: [longitude, latitude],
      zoom: 20
    })
    setMap(map)

    const addMarker = () => {
      const popupOffset = {
        bottom: [0, -35]
      }
      const popup = new tt.Popup({ offset: popupOffset }).setHTML("Your Location")
      const element = document.createElement('div')
      element.className = 'marker'
      const marker = new tt.Marker({
        draggable: true,
        element: element
      })
        .setLngLat([longitude, latitude])
        .addTo(map)

      marker.on('dragend', () => {
        const lnglat = marker.getLngLat()
        console.log(lnglat);
        setLongitude(lnglat.lng)
        setLatitude(lnglat.lat)
      })
      marker.setPopup(popup).togglePopup()
    }

    addMarker();

  

    


    return () => map.remove()

  }, [longitude, latitude])

  const handleLocation=(()=>{
    console.log(location)
    var platform = new H.service.Platform({
      'apikey': 'zTD7YYrBYzfGoznx_4Now9IqKs9uoX6ZnFzTVkEI3k4',
      'app_id': 'hQ9QrcT5CM3F553MJvWU',
      'app_code': 'X9nmg5gBHwhvfTCqgaSNlQ'
    });
  
  
    var geocodingParams = {
      searchText:location
    };
    console.log(location)
    // Get an instance of the geocoding service:
    var geocoder = platform.getGeocodingService();
    var latitude, longitude;
    var onResult = (result) => {
      console.log(result);
      if(result.Response.View.length){
      latitude = result.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude;
      longitude = result.Response.View[0].Result[0].Location.NavigationPosition[0].Longitude;
      setLongitude(longitude);
      setLatitude(latitude);
      console.log(`geoParams: ${location}`);
      console.log(`lat: ${latitude}`);
      console.log(`lng: ${longitude}`);
    }else{
           alert("try some other address");
      }

      
      
    };
    // Call the geocode method with the geocoding parameters,
    // the callback and an error callback function (called if a
    // communication error occurs):
    geocoder.geocode(geocodingParams, onResult);
  })
  const handleSet=((e)=>{
    setLocation(e.target.value)
    console.log(location)
  })

 const handleSubmit = (e) => {
    e.preventDefault();



    firebase.auth().onAuthStateChanged((user) => {
      firebase.database().ref(`users/${user.uid}`).once("value")
        .then((snap) => {
         
          setUser(snap.val());

          const db = firebase.database();
          db.ref("users/" + user.uid)
            .update({
             
              longitude:longitude,
              latitude:latitude,


            })



        })
    })

  };


  return (
    <>
      <div className="Map">
        <div className='map' ref={mapElement}>

        </div>
        <div  style={{width:'100%'}} className="d-flex flex-direction-row mt-3">

       
        <div className="search-bar mr-3 ml-3">
         
        <TextField  label="Search Address" color="info" focused onChange={handleSet} />

          
        </div>
        <Button
                    color="info"
                    onClick={handleLocation}

                  > Get Location
                  </Button>
                  <Button
                    color="info"
                    onClick={handleSubmit}

                  > Submit
                  </Button>
      </div>
      </div>
    </>
  )
}

export default UserLocation;
