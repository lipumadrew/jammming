import styles from "../css/SearchResults.module.css";
import Track from "./Track";
import SearchBar from "./searchBar";
import SearchOptionBtn from "./SearchOptionBtn";

const SearchResults = () => {
  return (
    <div className={styles.searchResultsContainer}>
      <div id="results-header" className={styles.searchResultsHeader}><h2>Search For:</h2>
      <SearchOptionBtn searchType="myPlaylists" optionText="My Playlists"/>
      <SearchOptionBtn searchType="artists" optionText="Artists"/>
      <SearchOptionBtn searchType="tracks" optionText="Tracks"/>
      <SearchBar />
      </div>
      <div id="results-body" className={styles.searchResultsBody}>
        <Track/>
        <Track/>
        <Track/>
        <Track/>
        <Track/>
        <Track/>
        <Track/>
        <Track/>
      </div>
      <div id="results-footer" className={styles.searchResultsFooter}>Footer</div>
    </div>
  );
};

export default SearchResults;
