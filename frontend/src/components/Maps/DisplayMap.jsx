import { useState, useEffect } from 'react';
import './DisplayMap.css'
import { GOOGLE_MAP_KEY } from '../../LocalKey';





const DisplayMap = (props) => {
    var map;
    var createMarker;
    var google = window.google


            //Load Map from url provided in script src
            window.initMap = function() {
                    const queryInput = props.searchResults;
                
                    var current_location = new google.maps.LatLng(props.latitude, props.longitude);

                    // var infowindow = new google.maps.InfoWindow();
                  
                    map = new google.maps.Map(
                        document.getElementById('map'), {center: current_location, zoom: 15});

                    //create search box
                    const input = document.getElementById("pac-input");

                    var request = {
                      query: {queryInput},
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
                    })

                    const searchBox = new google.maps.places.SearchBox(input);

                    map.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('pac-input'));
                    google.maps.event.addListener(searchBox, 'places_changed', ()=>{
                      searchBox.set('map', null);

                      let places = searchBox.getPlaces();

                      let bounds = new google.maps.LatLngBounds();
                      let i;
                      let place;
                      let runPlacesFunction;
                      for (i = 0; place = places[i]; i++){
                        
                         (runPlacesFunction = ()=> { 
                          let marker = new google.maps.Marker({
                            position: place.geometry.location
                          })            
                          marker.bindTo('map', searchBox, 'map');
                          google.maps.event.addListener(marker, 'map_changed', ()=>{
                            if(!this.getMap()){
                              this.unbindAll()
                            }
                          })
                          bounds.extend(place.geometry.location)
                          
                        });
                      }
                      map.fitBounds(bounds)
                      searchBox.set('map', map)
                      map.setZoom(Math.min(map.getZoom(),12))
                    })

            }
            // google.maps.event.addEventListener(window, 'load', window.initMap)
                const script = document.createElement("script");
                const API = GOOGLE_MAP_KEY;
                script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&libraries=places&callback=initMap`;
                script.async = true;
                document.body.appendChild(script);


    return (
        <div>
        <input id="pac-input" className="controls" type="text" placeholder="Search Box"></input>
        <div id="map" style={{width: 800, height: 600}}></div>
   
           {/* <script></script> */}
        </div>

    )
}
 
export default DisplayMap;