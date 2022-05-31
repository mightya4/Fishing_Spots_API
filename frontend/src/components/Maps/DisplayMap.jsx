import { useState, useEffect } from 'react';
import './DisplayMap.css'
import { GOOGLE_MAP_KEY } from '../../LocalKey';





const DisplayMap = (props) => {
    var map;
    var google = window.google

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

    return (
        <div>
        <div id="map" style={{width: 600, height: 600}}></div>
           <script></script>
        </div>

    )
}
 
export default DisplayMap;