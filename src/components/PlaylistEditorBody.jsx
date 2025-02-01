import Track from "./Track"
const PlaylistEditorBody = ({selectedPlaylist, tracksInEditor, handleRemoveTrack}) => {
    if (!selectedPlaylist) {
        return (<><p>Select a playlist or create a new one</p></>)
    } else {
        return (
            <div>
              {tracksInEditor.map((item, index) => {
                return (
                  <Track
                    key={index}
                    index={index}
                    trackObj={item}
                    trackTitle={item.name}
                    artists={item.artists}
                    trackImg={item.album.images}
                    isInEditor={true}
                    handleRemoveTrack={handleRemoveTrack}
                  />
                );
              })}
            </div>
          );
    }
}

export default PlaylistEditorBody