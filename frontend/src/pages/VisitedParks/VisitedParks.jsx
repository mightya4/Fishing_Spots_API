const VisitedParks = (props) => {
    
    let visitedParks = ()=>{props.parks.filter(park => park.has_fished === true).map(filteredPark => (
            <li>
                {filteredPark}
            </li>
        ))}


    
    console.log(visitedParks)
    return ( 
        <div className="container">
                
            </div>
     );
}
 
export default VisitedParks;