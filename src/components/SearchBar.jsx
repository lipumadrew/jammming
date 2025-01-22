import { useState } from "react";

const SearchBar = (props) => {

  const [searchText, setSearchText] = useState("");

  const handleSubmit = (e) => {

    
    e.preventDefault();


  

    
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