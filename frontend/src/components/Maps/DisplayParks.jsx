import {useState, useEffect} from 'react';
import useAuth from '../../hooks/useAuth';
import { addFavoritePark} from './CrudEssentials';
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

const DisplayParks = (props) => {
    const [user, token] = useAuth();
    const [currentFavoritePark, setCurrentFavoritePark] = useState()
    console.log(props.parks)

    function addNewFavoritePark(park){
        let tempPark = [...props.favoriteParks, park]
        props.setFavoriteParks(tempPark)
    }
    const HandleClick = (index, park) => {
        var newPark ="";
        const favoritePromise = new Promise((resolve, reject) => {
            resolve(
                newPark = {
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
            )
        })
        favoritePromise.then((newPark) => {
            if(newPark && newPark.name == ""){}
            else{
                setCurrentFavoritePark(newPark)
                addNewFavoritePark(currentFavoritePark)
                console.log(props.favoriteParks) 
            }
            
        })
        
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

    useEffect(() => {
        addFavoritePark(token, currentFavoritePark)
        
        },[token, currentFavoritePark])

    
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