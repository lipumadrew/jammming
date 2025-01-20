import styles from "../css/SearchResults.module.css";

const SearchResults = () => {
  return (
    <div className={styles.searchResultsContainer}>
      <div id="results-header" className={styles.searchResultsHeader}><h2>Search Results</h2></div>
      <div id="results-body" className={styles.searchResultsBody}>Body</div>
      <div id="results-footer" className={styles.searchResultsFooter}>Footer</div>
    </div>
  );
};

export default SearchResults;
