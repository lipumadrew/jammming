
import styles from "../css/SearchOptionBtn.module.css"
import { useState } from "react";

const SearchOptionBtn = (props) => {
    


    const handleClick = () => {
        props.changeSearchType(props.searchType);
    }
    

    return (
        <button onClick={handleClick} className={props.searchType == props.currentSearchType ? styles.isSelectedButton : styles.regularButton}>
            {props.optionText}
        </button>
    )
}

export default SearchOptionBtn;