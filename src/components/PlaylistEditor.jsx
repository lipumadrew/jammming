import styles from "../css/PlaylistEditor.module.css";

const PlaylistEditor = () => {
  return (
    <div className={styles.playlistEditorContainer}>
      <div id="editor-header" className={styles.playlistEditorHeader}><h2>Editor</h2></div>
      <div id="editor-body" className={styles.playlistEditorBody}>Body</div>
      <div id="editor-footer" className={styles.playlistEditorFooter}>Footer</div>
    </div>
  );
};

export default PlaylistEditor;
