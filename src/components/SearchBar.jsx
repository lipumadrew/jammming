import { useState } from "react";
const SearchBar = (props) => {

  const [searchText, setSearchText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.searchType == "") {
      alert("Plese select whether you want to search for tracks, artists, or your playlists.")
    }
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