const SearchBar = ({onSearch, showResult, setShowResult, search, setSearch, showNoResult}) => {
    const handleSearch = (event) =>{
        event.preventDefault();
        onSearch()
        if(search !== ""){
            setShowResult(true)
        }
    }
    return (
        <>
            {!showResult && (
                <>  
                <form onSubmit={(event)=>handleSearch(event)}> 
                    <input 
                        type={"text"} 
                        onChange ={(event)=>setSearch(event.target.value)} 
                        placeholder="Enter movie name" 
                        id="searchbox" 
                        value={search}
                    />
                    <button type="submit">Search</button>
                </form>
                </>
            )}
            {showResult && <>
                <div className="searchTerm" onClick={()=> setShowResult(false)}>
                    <img src="Back.png"/>
                    <h4>{showNoResult ? `No results found for ${search}` : search}</h4>
                    <img src="search.png"/>
                </div>
            </>}
        </>
    )
}

export default SearchBar;