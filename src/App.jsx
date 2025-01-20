import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SearchBar from "./components/searchBar.jsx";
import PlaylistEditor from "./components/playlistEditor.jsx";
import SearchResults from "./components/SearchResults.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div className="upper-container">
      <h1>Jamming: Playlist Editor</h1>
      <SearchBar />
      </div>
      <div className="middle-container">
        <SearchResults />
        <PlaylistEditor />
      </div>
    </div>
  );
}

export default App;
