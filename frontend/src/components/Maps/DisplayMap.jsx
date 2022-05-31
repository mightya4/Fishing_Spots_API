import { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";

let coords = []
const DisplayMap = (props) => {
    const google = window.google
    
    let [state, setState] = useState({
        center: { lat: props.latitude, lng: props.longitude},
        coordsResult: []
    })
    
    const parkMapLoad = async map => {
        let request = {
            query: "Plantation Heritage Park",
            fields: ["name", "geometry"]
        };
        
        let service = new google.maps.places.PlacesService(map);
        debugger
        service.nearbySearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    coords.push(results[i]);
                }
                setState({
                    center: results[0].geometry.location,
                    coordsResult: coords
                });
            }
        });
        
    }

    useEffect(() => {
        parkMapLoad()
      }, [])

    return ( 
        <div>
            <GoogleMap
                center={state.center}
                zoom={13}
                onLoad={map => parkMapLoad(map)}
                mapContainerStyle={{ height: "600px", width: "600px"}}
            >
                {this.state.coordsResult !== [] &&
                    this.state.coordsResult.map(function(results, i) {
                        return(
                            <Marker key={i} position={results.geometry.location}>
                                <InfoWindow
                                    options={{ maxWidth: 300}}>
                                        <span>{results.name}</span>
                                    </InfoWindow>
                            </Marker>
                        )
                    })}
                
            </GoogleMap>
        </div>
     );
}
 
export default DisplayMap;