import styles from "../css/PlaylistEditor.module.css";
import { useEffect, useState } from "react";
import PlaylistEditorBody from "./PlaylistEditorBody";
//Would like it to explain to the user what they are currently doing
//Editing playlist: "Playlist Name", Creating Playlist: "Playlist Name"
const PlaylistEditor = (props) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState({ name: null }); //not sure what data type...
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [playlistEditingName, setPlaylistEditingName] = useState("");
  //Game plan
  //Clicking "create new" causes the name field to appear
  //User can enter the name and then finalize the name
  //Then, new playlist will become the one we are currently editing.
  //Its clear we need a save button as well.
  //if selected playlist is not selected, we can create a new one, so if
  //someone selects one, that part will be moved.
  //Someone should also be able to select create new, even if they have selected one and
  //are viewing its contents

  //process of creating new
  //click create new
  //text box shows up, user types in name

  const handleNewPlaylistName = (e) => {
    setNewPlaylistName(e.target.value);
  };

  const handleSave = () => {};

  const handleFinishCreating = () => {
    if (props.tracksInEditor.length == 0) {
      alert("Please add some tracks before creating a new playlist.");
    } else if (newPlaylistName == "") {
      alert("Please enter a name for the new playlist.");
    } else {
      props.handleFinishCreating(newPlaylistName);
    }
  };

  return (
    <div className={styles.playlistEditorContainer}>
      <div id="editor-header" className={styles.playlistEditorHeader}>
        {props.isEditing && !props.isCreatingNew && (
          <h2>Editing: somehow extract name</h2>
        )}
        {props.isCreatingNew == false && props.isEditing == false && (
          <h2>Editor</h2>
        )}
        {props.isCreatingNew && <h2>Creating: {newPlaylistName}</h2>}
        {props.isCreatingNew && (
          <div>
            <label>Enter Playlist Name:</label>
            <input
              type="text"
              value={newPlaylistName}
              onChange={handleNewPlaylistName}
            />
          </div>
        )}
      </div>
      <div id="editor-body" className={styles.playlistEditorBody}>
        <PlaylistEditorBody
          selectedPlaylist={selectedPlaylist}
          tracksInEditor={props.tracksInEditor}
          handleRemoveTrack={props.handleRemoveTrack}
        />
      </div>
      <div id="editor-footer" className={styles.playlistEditorFooter}>
        {props.isEditing && !props.isCreatingNew && (
          <button onClick={handleSave}>Save Changes</button>
        )}
        {!props.isCreatingNew && (
          <button onClick={props.handleStartCreating}>Create New</button>
        )}
        {props.isCreatingNew && (
          <button onClick={handleFinishCreating}>Save New Playlist</button>
        )}
      </div>
    </div>
  );
};

export default PlaylistEditor;
