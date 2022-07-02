import {useState, useEffect} from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
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
    FormControlLabel
} from '@mui/material'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import './DisplayParks.css'
// import DisplayParkDetail from './DisplayParkDetail'

const DisplayParks = (props) => {
    const [user, token] = useAuth();
    const [currentFavoritePark, setCurrentFavoritePark] = useState()
    console.log(props.parks)
    // const HandleCardClick = (e, placeID) => {
    //     console.log(placeID)
    //     DisplayParkDetail(placeID)
    // }
    function addNewFavoritePark(park){
        let tempPark = [...props.favoriteParks, park]
        props.setFavoriteParks(tempPark)
    }
    const HandleClick = (index, park) => {
        const newPark = {
            "name": park.name,
            "rating": park.rating,
            "is_fishing_location": park.is_fishing_location,
            "has_fished": park.has_fished,
            "types_of_fish": park.types_of_fish,
            "formatted_address": park.formatted_address,
            "lat": park.lat,
            "lng": park.lng,
            "place_id": park.place_id,
        }
        setCurrentFavoritePark(newPark)
        addNewFavoritePark(newPark)
        console.log(props.favoriteParks)
    }
    const HandleHasFishedCheck = (index, park) => {
        
        let newArray = [...props.parks]
        console.log(newArray[index].has_fished)
        newArray[index].has_fished = !park.has_fished
        console.log(newArray[index].has_fished)
        props.setParks(newArray)
    }
    const HandleLocationCheck = (index, park) => {
        let newArray = [...props.parks]
        console.log(newArray[index].is_fishing_location)
        newArray[index].is_fishing_location = !park.is_fishing_location
        console.log(newArray[index].is_fishing_location)
        props.setParks(newArray)
    }
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

    // updateFavoriteData =  {
    //     "name": park.name,
    //     "rating": park.rating,
    //     "is_fishing_location": park.is_fishing_location,
    //     "has_fished": park.has_fished,
    //     "types_of_fish": park.types_of_fish,
    //     "formatted_address": park.address,
    //     "lat": park.lat,
    //     "lng": park.lng,
    //     "place_id": park.place_id,
    // }


    useEffect(() => {
        const savedPark = async () => {
        
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}`}
            };
            // const bodyParameters = {}
            // if(currentFavoritePark.length > 0){
            //     bodyParameters =  {
            //         "name": currentFavoritePark.name,
            //         "rating": currentFavoritePark.rating,
            //         "is_fishing_location": currentFavoritePark.is_fishing_location,
            //         "has_fished": currentFavoritePark.has_fished,
            //         "types_of_fish": currentFavoritePark.types_of_fish,
            //         "formatted_address": currentFavoritePark.address,
            //         "lat": currentFavoritePark.lat,
            //         "lng": currentFavoritePark.lng,
            //         "place_id": currentFavoritePark.place_id,
            //     }
            // }
            
            let response = await axios.post("http://127.0.0.1:8000/api/map/all_saved_fishing_spots", currentFavoritePark, config);

            console.log("Post token: " + token)
          } catch (error) {
            console.log(error.response.data);
          }
        }
        savedPark()
        },[currentFavoritePark])
     return(
            <div style={{ padding: 30 }}>
                <Box sx={{ display: 'grid', columnGap:3, rowGap: 1, gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'auto' }}>
                    {props.parks &&
                        props.parks.map((park, index) => {
                            return(
                                    <Card key={index} >
                                        <CardHeader
                                            title = {capitalizeEachWord(park.name)}
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
                                                    {`Address: ${park.address}`}
                                                </Typography>
                                            </CardContent>
                                        
                                        <CardActions>
                                            {/* <CheckBox {...label} icon = {<FavoriteBorder/>} checkedIcon={<Favorite/>} onChange={handleChange} aria-label="add to favorites"/> */}
                        
                                            {/* <Button size="small" color="primary">Directions</Button> */}
                                            <FormGroup>
                                                <FormControlLabel control={<Checkbox onClick={() => HandleLocationCheck(index, park)}/>} label="Is this a fishing location"/>
                                                <FormControlLabel control={<Checkbox onClick={() => HandleHasFishedCheck(index, park)}/>} label="Fished"/>
                                            </FormGroup>
                                            {/* <TextField id="filled-basic" label="Enter Types of Fish Located Here:" variant="filled" />
                                            <Button size="small" color="primary" onClick={() => handleClick(park, "clicked")}>Add To Favorites</Button> */}
                                        </CardActions>
                                        <CardActions>
                                            <TextField id="filled-basic" label="Enter Types of Fish Located Here:" variant="filled" />
                                        </CardActions>
                                        <CardActions>
                                        <FormGroup>
                                                <FormControlLabel control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} onClick={() => HandleClick(index, park)}/>} label="Favorite"/>
                                        </FormGroup>
                                        </CardActions>
                                    </Card>
                                
                    )})}
                    </Box>
        </div>
     )
    
}
 
export default DisplayParks;