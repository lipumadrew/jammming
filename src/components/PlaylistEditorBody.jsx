import Track from "./Track"
const PlaylistEditorBody = ({selectedPlaylist, tracksInEditor}) => {
    if (!selectedPlaylist) {
        return (<><p>Select a playlist or create a new one</p></>)
    } else {
        return (
            <div>
              {tracksInEditor.map((item) => {
                return (
                  <Track
                    key={item.id}
                    trackObj={item}
                    trackTitle={item.name}
                    artists={item.artists}
                    trackImg={item.album.images[1].url}
                    
                  />
                );
              })}
            </div>
          );
    }
}

export default PlaylistEditorBody