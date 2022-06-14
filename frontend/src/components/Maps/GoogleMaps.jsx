import { useEffect } from 'react';
import { GOOGLE_MAP_KEY } from '../../LocalKey';

    var map;
    var infowindow;
    var latitude;
    var longitude;
    

const GoogleMaps = (props) => {
    latitude = parseFloat(props.latitude)
    longitude = parseFloat(props.longitude)
    console.log("lat: "+ latitude)
    console.log("long: "+longitude)
    return ( 
        <div id = 'map' style={{width: 800, height: 600}}>

        </div>
     );
}

const InitMap = (props) => {
    // const isValidCenter = latitude!=="" && longitude!==""
    // if(isValidCenter){}
    var current_location = new window.google.maps.LatLng(26.75779, -80.083728);

    infowindow = new window.google.maps.InfoWindow();

    map = new window.google.maps.Map(
        document.getElementById('map'), {center: current_location, zoom: 15});
   

    var service = new window.google.maps.places.PlacesService(map);

    //Find all parks nearby user location
    var request = {
        query: 'park',
        fields: ['name', 'geometry'],
    };
    service.textSearch(request, function(results, status) {
        if(status === window.google.maps.places.PlacesServiceStatus.OK) {
            for(var i = 0; i < results.length; i++){
                console.log(results[i])
            }
        }

    })

    }


    window.GOOGLE_MAP_KEY = GOOGLE_MAP_KEY
    window.InitMap = InitMap

export default GoogleMaps;