import styles from "../css/PlaylistEditor.module.css";
import { useEffect, useState } from "react";
import PlaylistEditorBody from "./PlaylistEditorBody";
//Would like it to explain to the user what they are currently doing
//Editing playlist: "Playlist Name", Creating Playlist: "Playlist Name"
const PlaylistEditor = (props) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState({name: null}); //not sure what data type...
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
  }

  const handleSave = () => {

  }


  const handleCreateNew = () => {

    //Should clear all the tracks out of the editor
    //Set it to an empty array
    props.handleClearTracks();
    //Should pull up the thing to let us enter in the name
    setIsCreatingNew(true);
  }
  
  //actual handling of the request
  //When the playlist is created, immediately start editing it
  const createNewPlaylist = () => {

  }

  useEffect(() => {
    if (props.tracksInEditor.length > 0 && selectedPlaylist.name == null) {
      setIsCreatingNew(true);
    } else if (props.tracksInEditor.length == 0 && selectedPlaylist.name == null) {
      setIsCreatingNew(false);
    }
    console.log(isCreatingNew);
  })
  

  return (
    <div className={styles.playlistEditorContainer}>
      <div id="editor-header" className={styles.playlistEditorHeader}>
        {isEditing && <h2>Editing: somehow extract name</h2>}
        {isCreatingNew == false && isEditing == false && <h2>Editor</h2>}
        {isCreatingNew && <h2>Creating: {newPlaylistName}</h2>}
        {isCreatingNew && <div><label>Enter Playlist Name:</label><input type="text" value={newPlaylistName} onChange={handleNewPlaylistName}/></div>}
      </div>
      <div id="editor-body" className={styles.playlistEditorBody}>
        <PlaylistEditorBody selectedPlaylist={selectedPlaylist} tracksInEditor={props.tracksInEditor} handleRemoveTrack={props.handleRemoveTrack}/>
      </div>
      <div id="editor-footer" className={styles.playlistEditorFooter}>
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCreateNew}>Create New</button>
      </div>
    </div>
  );
};

export default PlaylistEditor;
