import Track from "./Track";
import Artist from "./Artist";

const SearchResultsBody = (props) => {
  if ((props.searchType == "tracks")) { //Since our search type was tracks, we map over the results and return track objects
    return (
      <div>
        {props.searchResults.map((item) => {
          return (
            <Track
              key={item.id}
              trackTitle={item.name}
              artists={item.artists}
              trackImg={item.album.images[1].url}
            />
          );
        })}
      </div>
    );
  } else if (props.searchType == "artists") { //Artists returned instead
    return (
        <div>
            {props.searchResults.map((item) => {
                return <Artist artistImg={item.images[2].url} artistName={item.name} key={item.id} artistFollowers={item.followers.total}/>
            })}
        </div>
    )
  }
};

export default SearchResultsBody;
