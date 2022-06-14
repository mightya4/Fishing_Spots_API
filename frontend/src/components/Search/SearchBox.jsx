const SearchBox = (props) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`The search you entered was: ${props.searchResults}`)
    }

    return ( 


        <form onSubmit={handleSubmit}>
            <input type="text" value={props.searchResults} onChange={(el) => props.setSearchResults(el.target.value)}></input>
            <input type="submit"/>
        </form>
     );
}
 
export default SearchBox;