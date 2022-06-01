import { useState, useEffect } from 'react';
import './DisplayMap.css'
import { GOOGLE_MAP_KEY } from '../../LocalKey';





const DisplayMap = (props) => {
    var map;
    var infowindow;
    var createMarker;
    var google = window.google
    const [searchResults, setSearchResults] = useState("")

            //Load Map from url provided in script src
            window.initMap = function() {
                
                    var current_location = new google.maps.LatLng(props.latitude, props.longitude);

                    infowindow = new google.maps.InfoWindow();
                  
                    map = new google.maps.Map(
                        document.getElementById('map'), {center: current_location, zoom: 15});
                  
                    var request = {
                      query: {searchResults},
                      fields: ['name', 'geometry'],
                    };
                  
                    var service = new google.maps.places.PlacesService(map);
                  
                    service.findPlaceFromQuery(request, function(results, status) {
                      if (status === google.maps.places.PlacesServiceStatus.OK) {
                        for (var i = 0; i < results.length; i++) {
                          createMarker(results[i]);
                        }
                        map.setCenter(results[0].geometry.location);
                      }
                    });
            }
                const script = document.createElement("script");
                const API = GOOGLE_MAP_KEY;
                script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&libraries=places&callback=initMap`;
                script.async = true;
                document.body.appendChild(script);


    return (
        <div>
        <div id="map" style={{width: 800, height: 600}}></div>
           {/* <script></script> */}
        </div>

    )
}
 
export default DisplayMap;