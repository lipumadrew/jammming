import Track from "./Track";
import Artist from "./Artist";
import Playlist from "./Playlist";



const SearchResultsBody = (props) => {
  if ((props.searchType == "tracks")) { //Since our search type was tracks, we map over the results and return track objects
    return (
      <div>
        {props.searchResults.map((item) => {
          return (
            <Track
              key={item.id}
              trackObj={item}
              trackTitle={item.name}
              artists={item.artists}
              trackImg={item.album.images[1].url}
              handleAddTrack={props.handleAddTrack}
              isInEditor={false}
            />
          );
        })}
      </div>
    );
  } else if (props.searchType == "artists") { //Artists returned instead
    return (
        <div>
            {props.searchResults.map((item) => {
                return <Artist artistImg={item.images[2].url} artistName={item.name} key={item.id} artistGenres={item.genres} handleArtistClick={props.handleArtistClick}/>
            })}
        </div>
    )
  } else if (props.searchType == "myPlaylists") {
    return (
        <div>
            {props.searchResults.map((item) =>  {
                return <Playlist playlistImg={item.images.url} key={item.id} playlistName={item.name}/>
            })}
        </div>
    )
  }
};

export default SearchResultsBody;
