const SearchBar = (props) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(props.searchType);
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" />
        <input type="submit" name="" id=""/>
      </form>
    </>
  );
};

export default SearchBar;