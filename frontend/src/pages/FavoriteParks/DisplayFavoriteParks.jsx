import { axios } from 'axios';
import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { getAllFavoriteParks, deleteAllFavoritePark, deleteFavoriteParkByID } from '../../components/Maps/CrudEssentials';

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
    const HandleHasFishedCheck = (index, park) => {
        
      let newArray = [...props.parks]
      console.log(newArray[index].has_fished)
      newArray[index].has_fished = !park.has_fished
      console.log(newArray[index].has_fished)
      props.setParks(newArray)
  }
//   const HandleUpdate = (index, park) => {
//     const favoritePromise = new Promise((resolve, reject) => {
//         resolve(
//             {
//                 "name": park.name,
//                 "rating": park.rating,
//                 "is_fishing_location": park.is_fishing_location,
//                 "has_fished": park.has_fished,
//                 "types_of_fish": park.types_of_fish,
//                 "formatted_address": park.formatted_address,
//                 "lat": park.lat,
//                 "lng": park.lng,
//                 "place_id": park.place_id,
//             }
//         )
//     })
//     favoritePromise.then((result) => {
//         if(result && result.name == ""){return}
//         else{
//             setCurrentFavoritePark(result)
//             if(currentFavoritePark){
//                 addFavoritePark(token, currentFavoritePark)
//                 addNewFavoritePark(currentFavoritePark)
//                 console.log(currentFavoritePark) 
//             }
            
//         }
        
//     })
    
// }
  const HandleFavoriteClick = (index) => {
    console.log(index)
    deleteFavoriteParkByID(token, index)
    
}
const HandleDeleteAll = () => {
  deleteAllFavoritePark(token)
  
}
  const HandleLocationCheck = (index, park) => {
      let newArray = [...props.parks]
      console.log(newArray[index].is_fishing_location)
      newArray[index].is_fishing_location = !park.is_fishing_location
      console.log(newArray[index].is_fishing_location)
      props.setParks(newArray)
  }
    
    useEffect(() => {
        const fetchAllSavedParks = async () => {
          var tmpParks = getAllFavoriteParks(token);
          tmpParks.then((result) => {
            setSavedFavoriteParks(result)
          }).catch((reason) => {
            console.log(reason)
          })
        };
        fetchAllSavedParks();
      }, [token]);


    
    return ( 

            <div style={{ padding: 30 }}>
                        <h1>Favorite Parks</h1>
                        <Button variant='text' onClick={()=>{HandleDeleteAll(); window.location.reload(false)}}>Delete All Favorite</Button>
                        <Box sx={{ display: 'grid', columnGap:3, rowGap: 1, gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'auto' }}>
                        {savedFavoriteParks.map((park, index) => (
                          <Card key = {index}>
                            <CardHeader
                                title = {park.name}
                                subheader = {`Rating: ${park.rating}`}
                              />
                              <CardMedia
                                                component = "img"
                                                alt = "default park image"
                                                height="140"
                                                image="https://st2.depositphotos.com/1186248/7003/i/450/depositphotos_70032099-stock-photo-view-in-hyde-park-london.jpg"
                                            />
                              <CardContent>
                                  <Typography variant="body2" color="text.secondary">
                                      
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                      {`Address: ${park.formatted_address}`}
                                  </Typography>
                              </CardContent>
                              <CardActions>
                                  <FormGroup>
                                      <FormControlLabel control={<Checkbox onClick={() => HandleLocationCheck(index, park)}/>} label="Is this a fishing location"/>
                                      <FormControlLabel control={<Checkbox onClick={() => HandleHasFishedCheck(index, park)}/>} label="Fished"/>
                                  </FormGroup>
                              </CardActions>
                              <CardActions>
                                  <TextField id="filled-basic" label="Enter Types of Fish Located Here:" variant="filled" />
                              </CardActions>
                              <CardActions>
                                <FormGroup>
                                    <Button variant="outlined" onClick={() => {HandleFavoriteClick(park.id); window.location.reload(false)}}>Remove Favorite</Button>
                                </FormGroup>
                              </CardActions>
                          </Card>
                        ))

                        }
                        </Box>
                    </div>
        



     );
}
 
export default DisplayFavoriteParks;