
const SearchBox = (props) => {
    var currentOrigin, currentDestination;



    const handleSubmit = (event) => {
        event.preventDefault();
        currentOrigin = event.target[0].value
        currentDestination = event.target[1].value
        props.setOrigin(currentOrigin)
        props.setDestination(currentDestination)
        console.log(`origin: ${props.origin}`)
        console.log(`destination: ${props.destination}`)
        }


    
    return ( 

        <div>
            <form onSubmit={handleSubmit}>
                <label> Origin: 
                    <input  id="originInput" placeholder="Enter Address" type="text"/>
                </label>
                <label> Destination: 
                    <input id="destInput" placeholder="Enter Address" type="text"/>
                </label>
                <button id="btnSubmit" type="submit">Search</button>
            </form>
        </div>

     );
}
 
export default SearchBox;