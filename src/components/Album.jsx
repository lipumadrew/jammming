import React from "react";
import styles from "../css/Album.module.css";
import { useState } from "react";
const Album = (props) => {
  const [artists, setArtists] = useState(props.artists);

  let artistHeaderStr = "";
  let titleHeaderStr = props.albumTitle;
  //TODO: Tweak ellipse and comma list stuff when a good font size is chosen

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
    artistHeaderStr = artistHeaderStr.slice(0, 10) + "...";
  }

  //Add ellips for long title strings

  if (titleHeaderStr.length > 25) {
    titleHeaderStr = titleHeaderStr.slice(0, 10) + "...";
  }
  return (
    <div
      id="album-container"
      className={styles.albumContainer}
      onClick={() => props.handleAlbumClick(props.id)}
    >
      <div id="album-img-container" className={styles.albumImgContainer}>
        <img src={props.albumImg} alt="" className={styles.albumImg} />
      </div>
      <div
        id="album-details-container"
        className={styles.albumDetailsContainer}
      >
        <h2 className={styles.albumTitle}>{titleHeaderStr}</h2>
        <h3 className={styles.albumFollowers}>{artistHeaderStr}</h3>
      </div>
    </div>
  );
};

export default Album;
