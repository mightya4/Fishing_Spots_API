import Card from 'react-bootstrap/Card'
import './DisplayParks.css'

const DisplayParks = (props) => {
    console.log(props.parks)

     return(
            <>
               <div className='display-box'>
                    {props.parks &&
                        props.parks.map((park, index) => {
                            return(
                                <>
                                    <Card border="primary" style={{ display: 'flex', flexWrap: 'wrap'}}>
                                        <Card.Header></Card.Header>
                                        <Card.Body>
                                            <Card.Title>{park.name}</Card.Title>
                                            <Card.Text>{park.rating}</Card.Text>
                                            <Card.Text>{park.address}</Card.Text>
                                            <Card.Text></Card.Text>
                                        </Card.Body>
                                    </Card>
                                <br/>
                            </>
                                
                    )})}
            </div>
        </>
     )
    
}
 
export default DisplayParks;