import './DisplayParks.css'

const DisplayParks = (props) => {

    return ( 
        <div className='display-box'>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Rating</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                        {props.parks &&
                            props.parks.map((park, index) => {
                                return(
                                    <tr key = {index}>
                                        <td>{park.name}</td>
                                        <td>{park.rating}</td>
                                        <td>{park.formatted_address}</td>
                                    </tr>
                        
                                )
                                })}
                </tbody>
            </table>
        </div>
     );
}
 
export default DisplayParks;