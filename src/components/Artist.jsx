import styles from "../css/Artist.module.css";
import { useState } from "react";

const Artist = (props) => {
    const [name, setName] = useState(props.artistName);
    const [genres, setGenres] = useState(props.artistGenres);

    let genreString = "";
    genres.map((genre, idx) => {
        genreString += genre
        if (idx < genres.length - 1) {
            genreString += ","
        }
    })

    let nameString = name;
    if (nameString.length > 14) {
        nameString = nameString.slice(0,14) + "...";
    }

    if (genreString.length > 15) {
        genreString = genreString.slice(0,15) + "...";
    }

  return (
    <div id="artist-container" className={styles.artistContainer}>
      <div id="artist-img-container" className={styles.artistImgContainer}>
        <img src={props.artistImg} alt="" className={styles.artistImg} />
      </div>
      <div
        id="artist-details-container"
        className={styles.artistDetailsContainer}
      >
        <h2 className={styles.artistTitle}>{nameString}</h2>
        <h3 className={styles.artistFollowers}>{genreString}</h3>
      </div>
    </div>
  );
};

export default Artist;
