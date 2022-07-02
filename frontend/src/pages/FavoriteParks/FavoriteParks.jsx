import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const FavoriteParks = (props) => {
    const [savedFavoriteParks, setSavedFavoriteParks] = useState()
    const [user, token] = useAuth();

    useEffect(()=> {
        const fetchFavoriteParks = async () => {
            try{
                let response = await axios.get("http://127.0.0.1:8000/api/map/all_saved_fishing_spots", {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                })
                setSavedFavoriteParks(response.data)
            } catch (error) {
                console.log(error.response.data);
            }
        };
        fetchFavoriteParks();
        }, [token])




    let favoriteParks = ()=>{savedFavoriteParks.map(park => park.has_fished === true).map(filteredPark => (
            <li>
                {filteredPark}
            </li>
        ))}


    
    
    return ( 
        <div className="container">
            {<h1>Favorite Parks Page for {user.username}</h1>}
            {savedFavoriteParks && savedFavoriteParks.map((filteredPark, index) => (
            <p key={index}>
                {filteredPark.name}
            </p>
        ))}
            </div>
     );
}
 
export default FavoriteParks;