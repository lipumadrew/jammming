import { useState } from "react";

const SearchBar = (props) => {

  const [searchText, setSearchText] = useState("");

  const handleSubmit = (e) => {

    
    e.preventDefault();


  

    //for testing
    //alert("The search text is:" + searchText + " and the search type is " + props.searchType)

    //Now, i need to change the type of request i make based on search type
    //and incorporate the search text in the request

    //Deciding to put the fetching login at a higher level, into the search results box,
    //since it's the one that lays out the track components
    
    props.executeSearch(searchText);

  }


  const handleChange = (e) => {
    setSearchText(e.target.value);
  }
  

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchText} onChange={handleChange}/>
        <input type="submit" name="" id=""/>
      </form>
    </>
  );
};

export default SearchBar;