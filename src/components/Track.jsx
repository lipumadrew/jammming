import styles from "../css/Track.module.css";

const Track = () => {
  return (
    <div id="track-container" className={styles.trackContainer}>
      <div id="track-img-container" className={styles.trackImgContainer}>
        <img src="" alt="" className={styles.trackImg}/>
      </div>
      <div
        id="track-details-container"
        className={styles.trackDetailsContainer}
      >
        <h2>Track Title</h2>
        <h3>Artist Name</h3>
      </div>
      <div id="track-btn-container" className={styles.trackBtnContainer}></div>
    </div>
  );
};

export default Track;
