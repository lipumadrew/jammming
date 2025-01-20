import styles from "../css/PlaylistEditor.module.css";
import { useState } from "react";
//Would like it to explain to the user what they are currently doing
//Editing playlist: "Playlist Name", Creating Playlist: "Playlist Name"
const PlaylistEditor = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  return (
    <div className={styles.playlistEditorContainer}>
      <div id="editor-header" className={styles.playlistEditorHeader}>
        {selectedPlaylist === "" ? <h2>Editor</h2> : <h2>Currently editing: {selectedPlaylist}</h2>}
      </div>

      <div id="editor-body" className={styles.playlistEditorBody}>
        {selectedPlaylist === "" && <p>Select a playlist, or click "Create New" to get started</p>}
        {selectedPlaylist === "" && <button>Create New</button>}
      </div>
      <div id="editor-footer" className={styles.playlistEditorFooter}>
        Footer
      </div>
    </div>
  );
};

export default PlaylistEditor;
