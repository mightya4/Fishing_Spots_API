import { useState, useEffect } from 'react'
import axios from 'axios'
import { GOOGLE_MAP_KEY } from '../../LocalKey';

const DisplayParkDetail = (selected_place_id) => {
    const [placeDetails, setPlaceDetails] = useState([])

    useEffect(() => {
        const fetchPlaceDetails = async () => {
          try {
            let response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${selected_place_id}&key=${GOOGLE_MAP_KEY}`, {
              headers: {
              },
            });
            setPlaceDetails(response.data);
          } catch (error) {
            console.log(error.response.data);
          }
        };
        fetchPlaceDetails();
      }, [selected_place_id]);

    
    return ( 
            <div className="container">
                {placeDetails &&
                placeDetails.map((car) => (
                    <p key={placeDetails.id}>
                    {placeDetails}
                    </p>
                ))}
            </div>

  );
}
 
export default DisplayParkDetail;