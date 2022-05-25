import { useEffect, useState, useRef } from 'react';
import * as tt from '@tomtom-international/web-sdk-maps';
import * as ttapi from '@tomtom-international/web-sdk-services';
import '../assets/css/location.css'
import '@tomtom-international/web-sdk-maps/dist/maps.css'



function UserLocation() {
  const mapElement = useRef()
  const [map, setMap] = useState({})
  const [latitude, setLatitude] = useState(23.30778);
  const [longitude, setLongitude] = useState(77.33058);


  const convertToPoints = (lnglat) => {
     console.log(lnglat)
    return {
      point: {
        latitude: lnglat.lat,
        longitude: lnglat.lng,
      }
    }

  }

  const drawRoute = (geoJson, map) => {
 

    if (map.getLayer("route")) {
      map.removeLayer("route");
  }

  if (map.getSource("route")) {
      map.removeSource("route");
  }     


    map.addLayer({
      id: 'route',
      type:'line',
      source: {
        type:'geojson',
        data:geoJson
      },
      paint:{
        'line-color':'red',
        'line-width': 6
      }
    })
  }

  const addDeliveryMarker = (lnglat, map) => {
    const element = document.createElement('div')
    
    element.className = 'marker-delivery'
    new tt.Marker({
      element: element,
    })
      .setLngLat(lnglat).addTo(map)
  }

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

    const origin = {
      lng: longitude,
      lat: latitude,
    }

    const destinations = [];

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
      const popup = new tt.Popup({ offset: popupOffset }).setHTML("Dhruv Tiwari")
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

    const sortDestinations = (locations) => {
      const pointsForDestinations = locations.map((destination) => {
        return convertToPoints(destination)


      })

      const callParameters = {
        key: "CE2fnCEGHeTVTeEERrtbhIeVXn7mPsnI",
        destinations: pointsForDestinations,
        origins: [convertToPoints(origin)]
      }

      return new Promise((resolve, reject) => {
        ttapi.services
          .matrixRouting(callParameters).then((matrixApIResults) => {
            const results = matrixApIResults.matrix[0];
            console.log(results);
            const resultsArray = results.map((result, index) => {
              return {
                location: locations[index],
                drivingtime: result.response.routeSummary.travelTimeInSeconds,
              }
            })

            resultsArray.sort((a, b) => {
              return a.drivingtime - b.drivingtime;
            })

            const sortedLocations = resultsArray.map((result) => {
              return result.location

            })

            resolve(sortedLocations)
          })
      })

    }

    const recalculateRoutes = () => {
        sortDestinations(destinations).then((sorted) => {
          sorted.unshift(origin);
     

          ttapi.services.calculateRoute({
              key:"CE2fnCEGHeTVTeEERrtbhIeVXn7mPsnI",
              locations:sorted
          })
          .then((routeData) => {
            const geoJson = routeData.toGeoJson()
            drawRoute(geoJson,map)
          })
        })
    }



    map.on('click', (e) => {
      console.log(e.lngLat)
      destinations.push(e.lngLat)
      addDeliveryMarker(e.lngLat, map)
      recalculateRoutes()
    })

    return () => map.remove()

  }, [longitude, latitude])


  return (
    <>
      <div className="Map">
        <div className='map' ref={mapElement}>

        </div>
        <div className="search-bar">
          <h1>
            where to ?
          </h1>
          <input type="text" id="longitude" className='longitude'
            placeholder='put in longitude'
            onChange={(e) => { setLongitude(e.target.value) }}
          />
          <input type="text" id="latitude" className='latitude'
            placeholder='put in latitude'
            onChange={(e) => { setLatitude(e.target.value) }}
          />
        </div>
      </div>
    </>
  )
}

export default UserLocation;
