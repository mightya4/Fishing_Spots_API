import { useState, useEffect } from 'react'
import { GOOGLE_MAP_KEY } from '../../LocalKey';
import "./GoogleMaps.css"
import SearchBox from '../Search/SearchBox';

const GoogleMaps = (props) => {
    const [ origin, setOrigin ] = useState()
    const [ destination, setDestination ] = useState()
    var originMarker, destinationMarker;
    var map;
    var lat = 0;
    var lng = 0;
    var geocoder;
    var directionsRenderer
    var directionsService
    var current_location
    var infowindow
    var parkLatLngArray
    var arrayOfMarkers
    var markerBounds

    

    const InitMap = () => {
        
        geocoder = new window.google.maps.Geocoder();
        current_location = new window.google.maps.LatLng(parseFloat(lat), parseFloat(lng));
        directionsRenderer = new window.google.maps.DirectionsRenderer()
        directionsService = new window.google.maps.DirectionsService()
        infowindow = new window.google.maps.InfoWindow();
        


        function sleep(ms){
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        
        //Wait before loading map
   
        if(document.getElementById('map')){
            LoadMap()
        }
    }


    //Encapsulate Load Map Function
    const LoadMap = (()=>{
        //Find all parks and lakes to fish nearby user location
        var request = {
            query: ['lakes + parks + campground + fishing'],
            fields: ['name', 'geometry'],
        };
        parkLatLngArray = []
        
        
        var mapOptions = {center: current_location, zoom: 15}
        map = new window.google.maps.Map(
            document.getElementById('map'), mapOptions);
            var service = new window.google.maps.places.PlacesService(map);
        //Get current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
                lat = position.coords["latitude"]
                lng = position.coords["longitude"]
                var newLatLng = new window.google.maps.LatLng(lat, lng)
                map.panTo(newLatLng)
            })
            
    
        
        // parkLatLngArray.push({name: "current location", lat: lat, lng: lng})
        service.textSearch(request, function(results, status) {
            if(status === window.google.maps.places.PlacesServiceStatus.OK) {
                console.log(results)
                for(var i = 0; i < results.length; i++){
                    parkLatLngArray.push({name: results[i].name, lat: results[i].geometry.location.lat(), lng: results[i].geometry.location.lng(), rating: results[i].rating, icon: results[i].icon, photos: results[i].photos, formatted_address: results[i].formatted_address, place_id: results[i].place_id, types_of_fish: "none", is_favorite: false, has_fished: false, is_fishing_location: false})
                }
            }
    
        })
        console.log(parkLatLngArray)
    

    
        //Create an array of markers and a function to update the array
        arrayOfMarkers = []
        markerBounds = new window.google.maps.LatLngBounds();
        directionsRenderer.setMap(map);
        directionsRenderer.setPanel(document.getElementById("DisplayDirectionPanel"));

        window.google.maps.event.addListener(map, 'click', function(){
            infowindow.close()
        })
    
        // function getDirections(){
        //     var request = {};
        //     if(document.getElementById("walk").checked){
        //         request.travelMode = window.google.maps.DirectionTravelMode.WALKING;
        //     }
        //     else {
        //         request.travelMode = window.google.maps.DirectionTravelMode.DRIVING;
        //     }
        //     if (document.getElementById("highways").checked){
        //         request.avoidHighways = true;
        //     }
        //     var startingAddress = document.getElementById("startingAddress").value;
        //     var destinationAddress = document.getElementById("destinationAddress").value;
    
        //     request.origin = startingAddress;
        //     request.destination = destinationAddress;
        //     directionsService.route(request, function(response, status){
        //         if (status === window.google.maps.DirectionsStatus.OK){
        //             displayDirections.setDirections(response)
        //         } else alert("Directions was not found: " + status);
        //     })
    
        // }
    
        function markerClick (i) {
            window.google.maps.event.trigger(arrayOfMarkers[i], "click")
        }
    

        //Add Fishing Spot Based on Current Marker Information
        const AddFishingSpot = ((current_marker)=>{
            infowindow.setContent(current_marker)
            infowindow.open(map, current_marker)
        })

        //Populate the array of markers and drop the marker at each location
        // sleep(500).then(() => {
        // if(map!== null && parkLatLngArray!== null){
        //     createMarker(parkLatLngArray)
        // }
        // })
        }
    
        }) //End Of LoadMap

    //Autocomplete Origin and Destination Inputs for Google Map SearchBox
    const originInput = document.getElementById("originInput")
    const destinationInput = document.getElementById("destInput")
    const searchOptions = {
        fields: ["address_components", "geometry", "icon", "name"],
        types: ["establishment"],
    }
    if(originInput && destinationInput){
    const autocompleteOrigin = new window.google.maps.places.Autocomplete(originInput, searchOptions);
    const autocompleteDestination = new window.google.maps.places.Autocomplete(destinationInput, searchOptions);
    }

    useEffect(()=>{
        if(origin != undefined && destination != undefined){
            var currentOrigin = geocodeAddresses(origin)
            var currentDestination = geocodeAddresses(destination)
        }
        
        createMarker(parkLatLngArray)
    }, [origin, destination, parkLatLngArray])

    function findDirections(currentAddress) {
        directionsService.route({
            origin: currentAddress.origin.geometry.location,
            destination: currentAddress.destination.geometry.location,
            travelMode: 'DRIVING'
        }, function (response, status) {
            if (status === 'OK') {
                directionsRenderer.setDirections(response);
            } else {
                window.alert('Directions request failed: ' + status)
            }
        })

    }
    //Adjust map bounds to fit all markers
    function fitMarkersInMapView(currentMap, currentMarkerBounds, currentMarker){
        currentMarkerBounds.extend(currentMarker.getPosition())
        currentMap.fitBounds(currentMarkerBounds)
    }
    
    function createMarker (arrayOfLatLng) {
        if(arrayOfLatLng){
            for(var i = 0; i < arrayOfLatLng.length; i++){
                var point = new window.google.maps.LatLng(parseFloat(arrayOfLatLng[i].lat), parseFloat(arrayOfLatLng[i].lng))
                
                var image = {
                    url: parkLatLngArray[i].icon
                }
                var title = parkLatLngArray[i].name
                var marker = new window.google.maps.Marker({
                    animation: window.google.maps.Animation.DROP,
                    position: point,
                    map: map,
                    title: title
                }) 
                
                arrayOfMarkers.push(marker)
                props.setParks(parkLatLngArray)
             
                fitMarkersInMapView(map, markerBounds, marker)
    
            }
        }

    }
    
    function geocodeAddresses(currentItem) {
        geocoder = new window.google.maps.Geocoder();
        if(geocoder.geocode.arguments && currentItem){
            geocoder.geocode( { 'address ': currentItem}, function(results, status) {
                if (status == 'OK') {
                    map.setCenter(results[0].geometry.location);
                    var marker = new window.google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location
                    });
                } else {
                    alert ('Geocode was not successful for the following reason: ' + status);
                }
            });}
        }

    window.GOOGLE_MAP_KEY = GOOGLE_MAP_KEY
    window.InitMap = InitMap

        return (
            <div>
                <SearchBox findDirections = {findDirections} geocodeAddresses = {geocodeAddresses} origin = {origin} destination = {destination} setOrigin = {setOrigin} setDestination = {setDestination}/>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <div className='map-box' id="map"></div>
                            </td>
                            <td>
                                <div id="DisplayDirectionPanel"></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
        }

    

export default GoogleMaps;