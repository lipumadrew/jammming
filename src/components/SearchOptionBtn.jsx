


//TODO: Add styling for selected/unselected buttons. Can change based on selected search type
const SearchOptionBtn = (props) => {



    const handleClick = () => {
        props.changeSearchType(props.searchType);
    }
    

    return (
        <button onClick={handleClick}>
            {props.optionText}
        </button>
    )
}

export default SearchOptionBtn;