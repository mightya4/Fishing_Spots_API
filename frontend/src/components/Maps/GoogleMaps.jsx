import { GOOGLE_MAP_KEY } from '../../LocalKey';
import "./GoogleMaps.css"


const GoogleMaps = (props) => {
    const InitMap = () => {
        var lat= 0;
        var lng = 0;
    
        
        
        var infowindow = new window.google.maps.InfoWindow();
        function sleep(ms){
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    
        const LoadMap = (()=>{
        var current_location = new window.google.maps.LatLng(parseFloat(lat), parseFloat(lng));
        var map;
        var displayDirections = new window.google.maps.DirectionsRenderer()
        var directionsService = new window.google.maps.DirectionsService()
        var from_location = []
        var to_location = []
        var specifiedDestinationAddress = []
    
        
        map = new window.google.maps.Map(
            document.getElementById('map'), {center: current_location, zoom: 15});
            var service = new window.google.maps.places.PlacesService(map);
        //Get current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
                lat = position.coords["latitude"]
                lng = position.coords["longitude"]
                var newLatLng = new window.google.maps.LatLng(lat, lng)
                map.panTo(newLatLng)
            })
            
        //Find all parks and lakes to fish nearby user location
        var request = {
            query: ['lakes, parks and campground for fishing'],
            fields: ['name', 'geometry'],
        };
        var parkLatLngArray = []
    
        
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
                var setLocationContent = marker.getTitle() + '<br>Directions: <a href="javascript:toLocation(' + i + ')">To Location</a> - <a href="javascript:fromLocation(' + i + ')">From Location</a> <br>Add Fishing Spot: <a href="javascript:AddFishingSpot(' + marker + ')">';
    
                to_location[i] = setLocationContent + '<br>Directions: <b>To Location</b> - <a href="javascript:fromLocation(' + i + ')">From Location</a>' +
                    '<br>Start address:<form action="javascript:getDirections()">' +
                    '<input type="text" SIZE=40 MAXLENGTH=40 name="startingAddress" id="startingAddress" value="" /><br>' +
                    '<INPUT value="Get Directions" TYPE="button" onclick="getDirections()"><br>' +
                    'Walk <input type="checkbox" name="walk" id="walk" /> &nbsp; Avoid Highways <input type="checkbox" name="highways" id="highways" />' +
                    '<input type="hidden" id="destinationAddress" value="' + point.lat() + ',' + point.lng() +
                    '"/>';
                // The info window version with the "From Location" form open
                from_location[i] = setLocationContent + '<br>Directions: <a href="javascript:fromLocation(' + i + ')">To Location</a> - <b>From Location</b>' +
                    '<br>End address:<form action="javascript:getDirections()">' +
                    '<input type="text" SIZE=40 MAXLENGTH=40 name="destinationAddress" id="destinationAddress" value="" /><br>' +
                    '<INPUT value="Get Directions" TYPE="SUBMIT"><br>' +
                    'Walk <input type="checkbox" name="walk" id="walk" /> &nbsp; Avoid Highways <input type="checkbox" name="highways" id="highways" />' +
                    '<input type="hidden" id="startingAddress" value="' + point.lat() + ',' + point.lng() +
                    '"/>';
    
                var contentString = setLocationContent;
                specifiedDestinationAddress[i] = setLocationContent
                //Create info window and display select marker information
                window.google.maps.event.addListener(marker, 'click', (function(marker, i){
                    return function(){
                        infowindow.setContent(contentString)
                        infowindow.open(map, marker);
                    }
                })(marker, i))
    
            }
        }
    
        displayDirections.setMap(map)
        displayDirections.setPanel(document.getElementById("DisplayDirectionPanel"))
        window.google.maps.event.addListener(map, 'click', function(){
            infowindow.close()
        })
    
        function getDirections(){
            var request = {};
            if(document.getElementById("walk").checked){
                request.travelMode = window.google.maps.DirectionTravelMode.WALKING;
            }
            else {
                request.travelMode = window.google.maps.DirectionTravelMode.DRIVING;
            }
            if (document.getElementById("highways").checked){
                request.avoidHighways = true;
            }
            var startingAddress = document.getElementById("startingAddress").value;
            var destinationAddress = document.getElementById("destinationAddress").value;
    
            request.origin = startingAddress;
            request.destination = destinationAddress;
            directionsService.route(request, function(response, status){
                if (status === window.google.maps.DirectionsStatus.OK){
                    displayDirections.setDirections(response)
                } else alert("Directions was not found: " + status);
            })
    
        }
    
        function markerClick (i) {
            window.google.maps.event.trigger(arrayOfMarkers[i], "click")
        }
    
        function toLocation (i) {
            infowindow.setContent(to_location[i])
            infowindow.open(map, arrayOfMarkers[i])
        }
        
        function fromLocation (i) {
            infowindow.setContent(from_location[i])
            infowindow.open(map, arrayOfMarkers[i])
        }
    
        //Add Fishing Spot Based on Current Marker Information
        const AddFishingSpot = ((current_marker)=>{
            infowindow.setContent(current_marker)
            infowindow.open(map, current_marker)
        })

        //Populate the array of markers and drop the marker at each location
        sleep(500).then(() => {
        if(map!== null && parkLatLngArray!== null){
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

        // return <div id="map" style={{width: 600, height: 600}}></div>
        return (
            <div>
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