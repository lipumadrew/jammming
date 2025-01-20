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
      <h1>Jamming: Playlist Editor</h1>
      <SearchBar />
      <div style={{ display: "flex" }}>
        <SearchResults />
        <PlaylistEditor />
      </div>
    </div>
  );
}

export default App;
