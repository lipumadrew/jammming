import styles from "../css/SearchResults.module.css";
import Track from "./Track";
import SearchBar from "./searchBar";
import SearchOptionBtn from "./SearchOptionBtn";
import { useState } from "react";
import SearchResultsBody from "./SearchResultsBody";

const SearchResults = (props) => {
  const [searchType, setSearchType] = useState("");
  const [searchResults, setSearchResults] = useState([]); //Array of objects.

  const handleSetSearchType = (type) => {
    //This fixed the crash bug :)
    setSearchResults([]);
    setSearchType(type);
  };

  const executeSearch = async (queryString) => {
    if (searchType == "") {
      alert(
        "Plese select whether you want to search for tracks, artists, or your playlists."
      );
    } else if (searchType == "myPlaylists") {
      const response = await fetch(
        `https://api.spotify.com/v1/me/playlists?limit=10`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
      const data = await response.json();
      setSearchResults(data.items);
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
      const data = await response.json();
      setSearchResults(data.artists.items);
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
      setSearchResults(data.tracks.items);
      
    } else {
      alert("Something went wrong: Unrecognized search type.");
    }
  };

  const handleArtistClick = (artistName) => {
    alert("You clicked " + artistName);
  };

  return (
    <div className={styles.searchResultsContainer}>
      <div id="results-header" className={styles.searchResultsHeader}>
        <h2>Search For:</h2>
        <SearchOptionBtn
          searchType="myPlaylists"
          optionText="My Playlists"
          changeSearchType={handleSetSearchType}
        />
        <SearchOptionBtn
          searchType="artists"
          optionText="Artists"
          changeSearchType={handleSetSearchType}
        />
        <SearchOptionBtn
          searchType="tracks"
          optionText="Tracks"
          changeSearchType={handleSetSearchType}
        />
        <SearchBar searchType={searchType} executeSearch={executeSearch} />
      </div>
      <div id="results-body" className={styles.searchResultsBody}>
        <SearchResultsBody
          searchResults={searchResults}
          searchType={searchType}
          handleAddTrack={props.handleAddTrack}
          handleArtistClick={handleArtistClick}
          handlePlaylistClick={props.handlePlaylistClick}
        />
      </div>
      <div id="results-footer" className={styles.searchResultsFooter}>
        Footer
      </div>
    </div>
  );
};

export default SearchResults;
