import { useState, useEffect } from 'react';
import { GOOGLE_MAP_KEY } from '../../LocalKey';



const GoogleMaps = () => {

        return <div id="map" style={{width: 600, height: 600}}></div>
        }
 


const InitMap = () => {
    var lat= 0;
    var lng = 0;

    
    
    var infowindow = new window.google.maps.InfoWindow();
    function sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const LoadMap = (()=>{
    var current_location = new window.google.maps.LatLng(parseFloat(lat), parseFloat(lng));

    infowindow = new window.google.maps.InfoWindow();

    var map;

    
    map = new window.google.maps.Map(
        document.getElementById('map'), {center: current_location, zoom: 15});
        var service = new window.google.maps.places.PlacesService(map);
    //Get current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            lat = position.coords["latitude"]
            lng = position.coords["longitude"]
            var newLatLng = new window.google.maps.LatLng(lat, lng)
            console.log(`current locale: ${lat} , ${lng}`)
            map.panTo(newLatLng)
        })
        
    //Find all parks nearby user location
    var request = {
        query: 'park',
        fields: ['name', 'geometry'],
    };
    var parkLatLngArray = []
    service.textSearch(request, function(results, status) {
        if(status === window.google.maps.places.PlacesServiceStatus.OK) {
            console.log(results)
            for(var i = 0; i < results.length; i++){
                parkLatLngArray.push({name: results[i].name, lat: results[i].geometry.location.lat(), lng: results[i].geometry.location.lng(), rating: results[i].rating, icon: results[i].icon, photos: results[i].photos, address: results[i].formatted_address})
                console.log(
                    `name: ${results[i].name} | lat: ${results[i].geometry.location.lat()} | lng: ${results[i].geometry.location.lng()}`
                )
            }
        }

    })
    console.log(parkLatLngArray)

    //Adjust map bounds to fit all markers
    function fitMarkersInMapView(currentMap, currentMarkerBounds, currentMarker){
        currentMarkerBounds.extend(currentMarker.getPosition())
        currentMap.fitBounds(currentMarkerBounds)
    }

    //Create an array of markers and a function to update the array
    var arrayOfMarkers = []
    var markerBounds = new window.google.maps.LatLngBounds();
    function createMarker (arrayOfLatLng) {
        for(var i = 0; i < arrayOfLatLng.length; i++){
            var point = new window.google.maps.LatLng(parseFloat(arrayOfLatLng[i].lat), parseFloat(arrayOfLatLng[i].lng))
            var marker = new window.google.maps.Marker({
                animation: window.google.maps.Animation.DROP,
                position: point,
                map: map,
            })

            arrayOfMarkers.push(marker)
            fitMarkersInMapView(map, markerBounds, marker)

            //Create info window and display select marker information
            window.google.maps.event.addListener(marker, 'click', (function(marker, i){
                return function(){
                    infowindow.setContent(`<p><b>${parkLatLngArray[i].name}</b></p><p>address: ${parkLatLngArray[i].address}</p><p>rating: ${parkLatLngArray[i].rating}</p>`)
                    infowindow.open(map, marker);
                }
            })(marker, i))

        }
    }
    

    //Populate the array of markers and drop the marker at each location
    sleep(500).then(() => {
    if(map!== null && parkLatLngArray!== null){
        console.log("Map is idle")
        createMarker(parkLatLngArray)
    }
    })
    }

    })
    
    //Wait before loading map
    sleep(1000).then(() => {
        LoadMap()
    })

    }

    


    window.GOOGLE_MAP_KEY = GOOGLE_MAP_KEY
    window.InitMap = InitMap

export default GoogleMaps;