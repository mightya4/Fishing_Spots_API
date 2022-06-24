import './DisplayParks.css'

const DisplayParks = (props) => {
    console.log(props.parks)

     return(
            <>
               <div className='display-box'>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Rating</th>
                                <th>Address</th>
                                {/* <th>Has Fished</th>
                                <th>Is Fishing Location</th> */}
                            </tr>
                        </thead>
                        <tbody>
                                {props.parks &&
                                    props.parks.map((park, index) => {
                                        return(
                                            <tr key = {index}>
                                                <td>{park.name}</td>
                                                <td>{park.rating}</td>
                                                <td>{park.address}</td>
                                                {/* <td>{park.has_fished}</td>
                                                <td>{park.is_fishing_location}</td> */}
                                            </tr>
                                
                                        )
                                        })}
                        </tbody>
                    </table>
            </div>
        </>
     )
    
}
 
export default DisplayParks;