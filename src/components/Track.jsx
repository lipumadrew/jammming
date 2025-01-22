import styles from "../css/Track.module.css";
import { useState } from "react";
const Track = (props) => {
  const [artists, setArtists] = useState(props.artists);

  let artistHeaderStr = "";

  //comma list
  artists.map((artist, idx) => {
    if (idx < artists.length - 1) {
      artistHeaderStr += artist.name + ", ";
    } else {
      artistHeaderStr += artist.name;
    }
  });

  return (
    <div id="track-container" className={styles.trackContainer}>
      <div id="track-img-container" className={styles.trackImgContainer}>
        <img src="" alt="" className={styles.trackImg} />
      </div>
      <div
        id="track-details-container"
        className={styles.trackDetailsContainer}
      >
        <h2>{props.trackTitle}</h2>
        <h3>{artistHeaderStr}</h3>
      </div>
      <div id="track-btn-container" className={styles.trackBtnContainer}></div>
    </div>
  );
};

export default Track;
