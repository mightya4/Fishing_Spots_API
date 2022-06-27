import { useState } from 'react' 
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    TextField,
    Typography,
    FormGroup,
    FormControlLabel
} from '@mui/material'
import { CheckBox, Favorite, FavoriteBorder } from '@mui/icons-material'
import './DisplayParks.css'
import DisplayParkDetail from './DisplayParkDetail'

const DisplayParks = (props) => {
    console.log(props.parks)
    const [checked, setChecked] = useState(false)
    const label = { inputProps: { 'aria-label': 'add to favorites' } }
    const handleCardClick = (e, placeID) => {
        console.log(placeID)
        DisplayParkDetail(placeID)
    }
    const handleClick = (e, park, status) => {

        console.log(e.target.checked)
        e.target.checked=!checked
        console.log(park)
        console.log(e.target.checked)
        console.log(status)
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

     return(
            <div style={{ padding: 30 }}>
                <Box sx={{ display: 'grid', columnGap:3, rowGap: 1, gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'auto' }}>
                    {props.parks &&
                        props.parks.map((park, index) => {
                            return(
                                    <Card maxWidth={345} key={index} onClick={(event)=> {handleCardClick(event, park.place_id)}}>
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
                                                <FormControlLabel control={<CheckBox checked={checked} onClick={(event) => handleClick(event, park, "clicked")}/>} label="Is this a fishing location"/>
                                                <FormControlLabel control={<CheckBox checked={checked} onClick={(event) => handleClick(event, park, "clicked")}/>} label="Have you fished here?"/>
                                            </FormGroup>
                                            {/* <TextField id="filled-basic" label="Enter Types of Fish Located Here:" variant="filled" />
                                            <Button size="small" color="primary" onClick={() => handleClick(park, "clicked")}>Add To Favorites</Button> */}
                                        </CardActions>
                                        <CardActions>
                                            <TextField id="filled-basic" label="Enter Types of Fish Located Here:" variant="filled" />
                                        </CardActions>
                                        <CardActions>
                                            <Button size="small" color="primary" onClick={() => handleClick(park, "clicked")}>Add To Favorites</Button> 
                                        </CardActions>
                                    </Card>
                                
                    )})}
                    </Box>
        </div>
     )
    
}
 
export default DisplayParks;