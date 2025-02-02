import styles from "../css/Playlist.module.css";


const Playlist = (props) => {
  let imgSrc = "";
  if (props.playlistImg != null) {
    imgSrc = props.playlistImg[0].url;
  }
    return (
        <div id="playlist-container" className={styles.playlistContainer} onClick={() => props.handlePlaylistClick(props.id, props.playlistName)}>
          <div id="playlist-img-container" className={styles.playlistImgContainer}>
            <img src={imgSrc} alt="No image" className={styles.playlistImg} />
          </div>
          <div
            id="playlist-details-container"
            className={styles.playlistDetailsContainer}
          >
            <h2 className={styles.playlistTitle}>{props.playlistName}</h2>
          </div>
        </div>
      );
}

export default Playlist;
