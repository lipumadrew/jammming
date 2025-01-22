import styles from "../css/SearchResults.module.css";
import Track from "./Track";
import SearchBar from "./searchBar";
import SearchOptionBtn from "./SearchOptionBtn";
import { useState } from "react";

const SearchResults = () => {
  const [searchType, setSearchType] = useState("");
  const [searchResults, setSearchResults] = useState([]); //Array of objects.

  const executeSearch = async (queryString) => {
    if (searchType == "") {
      alert(
        "Plese select whether you want to search for tracks, artists, or your playlists."
      );
    } else if (searchType == "myPlaylists") {
      //TODO
      //This is a different request, but we should add this functionality later
    } else if (searchType == "artists") {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${queryString}&type=artist&limit=10`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
    } else if (searchType == "tracks") {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${queryString}&type=track&limit=10`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );

      const data = await response.json();
      alert(data.tracks.items); //Array of objects
      setSearchResults(data.tracks.items);

    } else {
      alert("Something went wrong: Unrecognized search type.");
    }
  };

  return (
    <div className={styles.searchResultsContainer}>
      <div id="results-header" className={styles.searchResultsHeader}>
        <h2>Search For:</h2>
        <SearchOptionBtn
          searchType="myPlaylists"
          optionText="My Playlists"
          changeSearchType={setSearchType}
        />
        <SearchOptionBtn
          searchType="artists"
          optionText="Artists"
          changeSearchType={setSearchType}
        />
        <SearchOptionBtn
          searchType="tracks"
          optionText="Tracks"
          changeSearchType={setSearchType}
        />
        <SearchBar searchType={searchType} executeSearch={executeSearch} />
      </div>
      <div id="results-body" className={styles.searchResultsBody}>
        {searchResults.map((item) => {
          return <Track key={item.id} trackTitle={item.name} artists={item.artists}/>
        })}
      </div>
      <div id="results-footer" className={styles.searchResultsFooter}>
        Footer
      </div>
    </div>
  );
};

export default SearchResults;
