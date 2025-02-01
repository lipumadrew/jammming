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
    if (!props.isLoggedIn) {
      alert("Please log in. :)");
    } else if (searchType == "") {
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
    } else if (searchType == "albums") {
      //Perform album search
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${queryString}&type=album&limit=10`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );

      const data = await response.json();
      console.log(data);
      setSearchResults(data.albums.items);
    } else {
      alert("Something went wrong: Unrecognized search type.");
    }
  };

    //I don't need to bubble this up to the app component

  const handleArtistClick = (artistName) => {
    //TODO: do an api request for several tracks when clicked, NOT a search
    alert("You clicked " + artistName);
  };


  //I don't need to bubble this up to the app component
  const handleAlbumClick = async (albumId) => {
    //TODO: do an api request for several tracks when clicked, NOT a search
    alert("You clicked " + albumId);
    const response = await fetch(
      `https://api.spotify.com/v1/albums/${albumId}/tracks`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      }
    );
    const data = await response.json();
    console.log("The following is tracks from an album that was clicked")
    console.log(data)
    //Need to get the id's from these, then do several track request
    let ids = data.items.map(track =>track.id )
    console.log("These are the track ids")
    console.log(ids);
    let idString = "";
    ids.map(id => idString += id + ",")
    const trackResponse = await fetch(
      `https://api.spotify.com/v1/tracks?ids=${idString}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      }
    );
    const trackData = await trackResponse.json();
    console.log("This is the response from using the track ids to get the tracks");
    console.log(trackData);
    handleSetSearchType("tracks");
    setSearchResults(trackData.tracks);
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
        <SearchOptionBtn
          searchType="albums"
          optionText="Albums"
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
          handleAlbumClick={handleAlbumClick}
        />
      </div>
      <div id="results-footer" className={styles.searchResultsFooter}>
        Footer
      </div>
    </div>
  );
};

export default SearchResults;
