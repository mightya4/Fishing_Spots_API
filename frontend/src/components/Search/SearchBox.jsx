
const SearchBox = (props) => {
    const handleOriginSubmit = (event) => {
        event.preventDefault();
        props.setOrigin(event.target[0].value)
        console.log(event.target[0].value)
    }
    const handleDestinationSubmit = (event) => {
        event.preventDefault();
        props.setDestination(event.target[0].value)
        console.log(event.target[0].value)
    }

    
    return ( 

        <div>
            <form onSubmit={handleOriginSubmit}>
                <label> Origin: 
                    <input placeholder="Enter Address" type="text"/>
                </label>
                <button type="submit">Search</button>
            </form>
            <form onSubmit={handleDestinationSubmit}>
                <label> Destination: 
                    <input placeholder="Enter Address" type="text"/>
                </label>
                <button type="submit">Search</button>
            </form>
        </div>

     );
}
 
export default SearchBox;