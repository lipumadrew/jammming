



const SearchOptionBtn = (props) => {

    const handleClick = () => {
        alert(props.searchType);
        props.changeSearchType(props.searchType);
    }
    

    return (
        <button onClick={handleClick}>
            {props.optionText}
        </button>
    )
}

export default SearchOptionBtn;