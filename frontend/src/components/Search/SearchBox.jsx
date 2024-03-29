import "./SearchBox.css"

const SearchBox = (props) => {
    var currentOrigin, currentDestination;



    const handleSubmit = (event) => {
        event.preventDefault();
        currentOrigin = event.target[0].value
        currentDestination = event.target[1].value
        if(currentOrigin && currentDestination){
            props.setOrigin(currentOrigin)
            props.setDestination(currentDestination)
            
            props.geocodeAddresses(currentOrigin, currentDestination).then(function (result) {
                
                props.findDirections(result);
            }, function (error) {
                alert(error);
            })
            
        }
        
        
        // if(props.origin && props.destination){
        //     console.log(`origin: ${props.origin}`)
        //     console.log(`destination: ${props.destination}`)
        // }
        
        }


    
    return ( 

        <div>
            <form onSubmit={handleSubmit}>
                <label> Starting: 
                    <input  id="originInput" placeholder="Enter Address" type="text"/>
                </label>
                <label> Destination: 
                    <input id="destInput" placeholder="Enter Address" type="text"/>
                </label>
                <button className="display-button" id="btnSubmit" type="submit">Search</button>
            </form>
        </div>

     );
}
 
export default SearchBox;