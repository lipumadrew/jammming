import styles from "../css/Playlist.module.css";

const Playlist = (props) => {
    return (
        <div id="playlist-container" className={styles.playlistContainer}>
          <div id="playlist-img-container" className={styles.playlistImgContainer}>
            <img src={props.playlistImg} alt="" className={styles.playlistImg} />
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
