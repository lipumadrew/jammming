import { useState } from "react";
import styles from "../css/SearchBar.module.css";

const SearchBar = (props) => {
  const [searchText, setSearchText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    props.executeSearch(searchText);
  };

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchText}
          onChange={handleChange}
          className={styles.searchBar}
          placeholder="Type here"
        />
        <input
          type="submit"
          name=""
          id=""
          value="Search"
          className={styles.submitButton}
        />
      </form>
    </>
  );
};

export default SearchBar;
