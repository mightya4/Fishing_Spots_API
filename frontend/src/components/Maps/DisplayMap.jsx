import { useRef, useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { useGoogleMap, useLoadScript } from '@react-google-maps/api';
import './DisplayMap.css'
import { GOOGLE_MAP_KEY } from '../../LocalKey';





const DisplayMap = (props) => {
    // const google = window.google
    // const { isLoaded } = useGoogleMaps();
    // let coords = []
    // let [currentState, setCurrentState] = useState({
    //     center: { lat: props.latitude, lng: props.longitude},
    //     coordsResult: []
    // })
    var map;
    var service;
    var infowindow;
    var google = window.google
    const [currentMap, setMap] = useState()


        
        
    //     var sydney = new google.maps.LatLng(-33.867, 151.195);
  
    //     infowindow = new google.maps.InfoWindow();
      
    // //    map = new window.google.maps.Map(document.getElementById('map'), {
    // //        center: {lat: -34.397, lng: 150.644},
    // //        zoom: 8
    // //    })
    
    
    //     map = new google.maps.Map(
    //         document.getElementById('map'), {center: sydney, zoom: 15});
      
    //     var request = {
    //       query: 'Museum of Contemporary Art Australia',
    //       fields: ['name', 'geometry'],
    //     };
      
    //     service = new google.maps.places.PlacesService(map);
      
    //     service.findPlaceFromQuery(request, function(results, status) {
    //       if (status === google.maps.places.PlacesServiceStatus.OK) {
    //         // for (var i = 0; i < results.length; i++) {
    //         //   createMarker(results[i]);
    //         // }
    //         map.setCenter(results[0].geometry.location);
    //       }
    //     });
 
            window.initMap = function() {
                 map = new google.maps.Map(document.getElementById('map'), {
                    center: {lat: props.latitude, lng: props.longitude},
                    zoom: 15})
            }
                const script = document.createElement("script");
                const API = GOOGLE_MAP_KEY;
                script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&libraries=places&callback=initMap`;
                script.async = true;
                document.body.appendChild(script);

                // map = new google.maps.Map(document.getElementById('map'), {
                //     center: {lat: -34.397, lng: 150.644},
                //     zoom: 8})
            


 

    return (
        <div>
        <div id="map" style={{width: 600, height: 600}}></div>
           <script></script> {/* <script type="text/javascript" async defer src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBfx1rumPSwaYzn8UMZWcjRr7INoLBwLLY&libraries=places&callback=${window.initMap}`}></script> */}
        </div>

    )

    //     isLoaded ? 
    //     (<GoogleMap
    //     center={currentState.center}
    //     zoom={13}
    //     mapContainerStyle={{ height: "600px", width: "600px"}}
    // >
    //     {/* {currentState.coordsResult !== [] &&
    //         currentState.coordsResult.map(function(results, i) {
    //             return(
    //                 <Marker key={i} position={results.geometry.location}>
    //                     <InfoWindow
    //                         options={{ maxWidth: 300}}>
    //                             <span>{results.name}</span>
    //                         </InfoWindow>
    //                 </Marker>
    //             )
    //         })} */}
        
    //     </GoogleMap>) : <div>Loading...</div>
    //     );
}
 
export default DisplayMap;