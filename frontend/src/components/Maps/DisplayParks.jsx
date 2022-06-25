import {
    Box,
    Card,
    CardActions,
    CardActionArea,
    CardContent,
    CardMedia,
    Button,
    Typography
} from '@mui/material'
import './DisplayParks.css'

const DisplayParks = (props) => {
    console.log(props.parks)

     return(
            <div style={{ padding: 30 }}>
                <Box sx={{ display: 'grid', columnGap:3, rowGap: 1, gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'auto' }}>
                    {props.parks &&
                        props.parks.map((park, index) => {
                            return(
                                    <Card maxWidth={345} key={index}>
                                        <CardActionArea>
                                            <CardMedia
                                                component = "img"
                                                alt = "default park image"
                                                height="140"
                                                image="https://st2.depositphotos.com/1186248/7003/i/450/depositphotos_70032099-stock-photo-view-in-hyde-park-london.jpg"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {park.name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {`Rating: ${park.rating}`}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {`Address: ${park.address}`}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            {/* <Button size="small" color="primary">Directions</Button> */}
                                            <Button size="small" color="primary">Add To Favorites</Button>
                                        </CardActions>
                                    </Card>
                                
                    )})}
                    </Box>
        </div>
     )
    
}
 
export default DisplayParks;