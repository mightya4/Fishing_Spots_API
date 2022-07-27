import { axios } from 'axios';
import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { deleteAllFavoritePark } from '../../components/Maps/CrudEssentials';

import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Checkbox,
    TextField,
    Typography,
    FormGroup,
    FormControlLabel,
    Button
} from '@mui/material'
import { Favorite, FavoriteBorder } from '@mui/icons-material'

const DisplayFavoriteParks = (props) => {
    const [savedFavoriteParks, setSavedFavoriteParks] = useState([]);
    const [user, token] = useAuth();


    const lowerCaseAllLetters = (someWords) => {
        return someWords.toLowerCase()
    }
    const capitalizeFirstLetter = ([firstLetter, ...rest]) => {
        return (firstLetter.toUpperCase() + rest.join(''))
    }
    const splitWordsBySpace = (wordToSplit) => {
        return Array.from(wordToSplit.split(" "))
    }

    const capitalizeEachWord = (someWords) => {
        someWords = lowerCaseAllLetters(someWords)
        someWords = splitWordsBySpace(someWords)
        for(var i = 0; i < someWords.length; i++){
            someWords[i] = capitalizeFirstLetter(someWords[i])
        }
        someWords = someWords.join(' ')
        return(someWords)
        
    }
    
    const HandleDeleteAll = () => {
        deleteAllFavoritePark(token)
    }
    
    useEffect(() => {
        const fetchAllSavedParks = async () => {
          try {
            let response = await axios.get("http://127.0.0.1:8000/api/map/all_saved_fishing_spots", {
              headers: {
                Authorization: "Bearer " + token,
              },
            });
            setSavedFavoriteParks(response.data);
          } catch (error) {
            console.log(error.response.data);
          }
        };
        fetchAllSavedParks();
      }, [token]);


    
    return ( 

            <div style={{ padding: 30 }}>
                        { savedFavoriteParks && savedFavoriteParks.map((park) => (
                        <p key={park.id}>
                            {park.user}
                            {park.name} {park.rating} {park.is_fishing_location} {park.has_fished} {park.types_of_fish} {park.formatted_address} {park.latitude} {park.longitude} 
                        </p>
                        ))

                        }
                    </div>
        



     );
}
 
export default DisplayFavoriteParks;