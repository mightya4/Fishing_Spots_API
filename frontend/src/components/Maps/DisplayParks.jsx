import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    Typography
} from '@mui/material'
import { Favorite } from '@mui/icons-material'
import './DisplayParks.css'

const DisplayParks = (props) => {
    console.log(props.parks)
    const lowerCaseAllLetters = (someWords) => {
        return someWords.toLowerCase()
    }
    const capitalizeFirstLetter = ([firstLetter, ...rest]) => {
        return (firstLetter.toUpperCase() + rest.join(''))
    }
    const splitWordsBySpace = (wordToSplit) => {
        return Array.from(wordToSplit.split(" "))
    }

    const editEachWord = (someWords) => {
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
                                    <Card maxWidth={345} key={index}>
                                        <CardHeader
                                            title = {editEachWord(park.name)}
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
                                            <IconButton aria-label="add to favorites">
                                                <Favorite />
                                            </IconButton>
                                            {/* <Button size="small" color="primary">Directions</Button> */}
                                            {/* <Button size="small" color="primary">Add To Favorites</Button> */}
                                        </CardActions>
                                    </Card>
                                
                    )})}
                    </Box>
        </div>
     )
    
}
 
export default DisplayParks;