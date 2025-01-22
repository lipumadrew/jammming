import styles from "../css/Track.module.css";
import { useState } from "react";
const Track = (props) => {
  const [artists, setArtists] = useState(props.artists);

  let artistHeaderStr = "";
  let titleHeaderStr = props.trackTitle;
  //TODO: Tweak ellips and comma list stuff when a good font size is chosen

  //comma list
  artists.map((artist, idx) => {
    if (idx < artists.length - 1) {
      artistHeaderStr += artist.name + ", ";
    } else {
      artistHeaderStr += artist.name;
    }
  });

  //Add ellipse for long artist strings
  if (artistHeaderStr.length > 30) {
    artistHeaderStr = artistHeaderStr.slice(0,10) + "..."
  }

  //Add ellips for long title strings

  if (titleHeaderStr.length > 30) {
    titleHeaderStr = titleHeaderStr.slice(0,10) + "...";
  }

  return (
    <div id="track-container" className={styles.trackContainer}>
      <div id="track-img-container" className={styles.trackImgContainer}>
        <img src={props.trackImg} alt="" className={styles.trackImg} />
      </div>
      <div
        id="track-details-container"
        className={styles.trackDetailsContainer}
      >
        <h2 className={styles.trackTitle}>{titleHeaderStr}</h2>
        <h3 className={styles.trackArtist}>{artistHeaderStr}</h3>
      </div>
      <div id="track-btn-container" className={styles.trackBtnContainer}></div>
    </div>
  );
};

export default Track;
