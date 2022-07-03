import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
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

const FavoriteParks = (props) => {
    const [savedFavoriteParks, setSavedFavoriteParks] = useState()
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

            <div style={{ padding: 30 }}>
                {<h1>Favorite Parks Page for {user.username}</h1>}
                    <Box sx={{ display: 'grid', columnGap:3, rowGap: 1, gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'auto' }}>
                        {savedFavoriteParks &&
                            savedFavoriteParks.map((park, index) => {
                                console.log(`index-${index}:  park-${park.name}`)
                                return(
                                        <Card key={index} >
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
                                                    {/* <FormControlLabel control={<Checkbox onClick={() => HandleLocationCheck(index, park)}/>} label="Is this a fishing location"/>
                                                    <FormControlLabel control={<Checkbox onClick={() => HandleHasFishedCheck(index, park)}/>} label="Fished"/> */}
                                                </FormGroup>

                                            </CardActions>
                                            <CardActions>
                                                <TextField id="filled-basic" label="Enter Types of Fish Located Here:" variant="filled" />
                                            </CardActions>
                                            <CardActions>
                                            <FormGroup>
                                                    {/* <FormControlLabel control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} onClick={() => HandleClick(index, park)}/>} label="Favorite"/> */}
                                            </FormGroup>
                                            </CardActions>
                                        </Card>
                                    
                        )})}
                        </Box>
                    </div>
        



     );
}
 
export default FavoriteParks;