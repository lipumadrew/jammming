import styles from "../css/Artist.module.css";

const Artist = (props) => {
  return (
    <div id="artist-container" className={styles.artistContainer}>
      <div id="artist-img-container" className={styles.artistImgContainer}>
        <img src={props.artistImg} alt="" className={styles.artistImg} />
      </div>
      <div
        id="artist-details-container"
        className={styles.artistDetailsContainer}
      >
        <h2 className={styles.artistTitle}>{props.artistName}</h2>
        <h3 className={styles.artistFollowers}>{props.artistFollowers} Followers</h3>
      </div>
    </div>
  );
};

export default Artist;
