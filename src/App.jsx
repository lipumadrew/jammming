import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SearchBar from "./components/searchBar.jsx";
import PlaylistEditor from "./components/playlistEditor.jsx";
import SearchResults from "./components/SearchResults.jsx";
import { use } from "react";

/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code with PKCE oAuth2 flow to authenticate
 * against the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow
 */

const clientId = "88cf412ba66b4486b502d2c24425d4ea"; // your clientId
const redirectUrl = "http://localhost:5173/"; // your redirect URL - must be localhost URL and/or HTTPS

const authorizationEndpoint = "https://accounts.spotify.com/authorize";
const tokenEndpoint = "https://accounts.spotify.com/api/token";
const scope =
  "user-read-private user-read-email playlist-modify-public playlist-modify-private";

// Data structure that manages the current active token, caching it in localStorage
const currentToken = {
  get access_token() {
    return localStorage.getItem("access_token") || null;
  },
  get refresh_token() {
    return localStorage.getItem("refresh_token") || null;
  },
  get expires_in() {
    return localStorage.getItem("refresh_in") || null;
  },
  get expires() {
    return localStorage.getItem("expires") || null;
  },

  save: function (response) {
    const { access_token, refresh_token, expires_in } = response;
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    localStorage.setItem("expires_in", expires_in);

    const now = new Date();
    const expiry = new Date(now.getTime() + expires_in * 1000);

    localStorage.setItem("expires", expiry);
  },
};

// On page load, try to fetch auth code from current browser search URL
const args = new URLSearchParams(window.location.search);
const code = args.get("code");

// If we find a code, we're in a callback, do a token exchange
if (code) {
  const token = await getToken(code);
  currentToken.save(token);

  // Remove code from URL so we can refresh correctly.
  const url = new URL(window.location.href);
  url.searchParams.delete("code");

  const updatedUrl = url.search ? url.href : url.href.replace("?", "");
  window.history.replaceState({}, document.title, updatedUrl);
}

async function redirectToSpotifyAuthorize() {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const randomValues = crypto.getRandomValues(new Uint8Array(64));
  const randomString = randomValues.reduce(
    (acc, x) => acc + possible[x % possible.length],
    ""
  );

  const code_verifier = randomString;
  const data = new TextEncoder().encode(code_verifier);
  const hashed = await crypto.subtle.digest("SHA-256", data);

  const code_challenge_base64 = btoa(
    String.fromCharCode(...new Uint8Array(hashed))
  )
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  window.localStorage.setItem("code_verifier", code_verifier);

  const authUrl = new URL(authorizationEndpoint);
  const params = {
    response_type: "code",
    client_id: clientId,
    scope: scope,
    code_challenge_method: "S256",
    code_challenge: code_challenge_base64,
    redirect_uri: redirectUrl,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString(); // Redirect the user to the authorization server for login
}

// Soptify API Calls
async function getToken(code) {
  const code_verifier = localStorage.getItem("code_verifier");

  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUrl,
      code_verifier: code_verifier,
    }),
  });

  return await response.json();
}

async function refreshToken() {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

async function getUserData() {
  const response = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: { Authorization: "Bearer " + currentToken.access_token },
  });

  return await response.json();
}

// Click handlers
async function loginWithSpotifyClick() {
  await redirectToSpotifyAuthorize();
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("http://localhost:5173/");
  const [clientId, setClientId] = useState("88cf412ba66b4486b502d2c24425d4ea");
  const [authCode, setAuthCode] = useState();
  const [tracksInEditor, setTracksInEditor] = useState([]);
  const [userData, setUserData] = useState({});
  const [playlistInEditor, setPlaylistInEditor] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [originalTracks, setOriginalTracks] = useState([]);

  const authorizationEndpoint = "https://accounts.spotify.com/authorize";
  const tokenEndpoint = "https://accounts.spotify.com/api/token";
  const scope = "user-read-private user-read-email";

  const redirectUri = "http://localhost:5173/";

  const authUrl = new URL("https://accounts.spotify.com/authorize");

  //Checks if token is expired. Will log us out if it is, sort of....
  const checkIfLoggedIn = async () => {
    if (localStorage.getItem("access_token")) {
      let rightNow = new Date();
      //console.log("below is the current date");
      //console.log(rightNow);
      //console.log(typeof rightNow)
      let expiryDate = new Date(localStorage.getItem("expires"));
      //console.log("Below is the expiry")
      //console.log(expiryDate)
      //console.log(typeof expiryDate)
      if (expiryDate <= rightNow) {
        console.log("token expired");
        setIsLoggedIn(false);
      } else {
        console.log("Token is not expired");
        const data = await getUserData();
        setUserData(data);
        setIsLoggedIn(true);
      }
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  async function logoutClick() {
    localStorage.clear();
    setUserData({});
    window.location.href = redirectUrl;
  }

  const addTrack = (trackToAdd) => {
    if (isEditing == false) {
      setIsCreatingNew(true);
    }
    setTracksInEditor((prev) => [...prev, trackToAdd]);
  };

  //May have to remove by index, filter
  const removeTrack = (removalIndex) => {
    setTracksInEditor((prev) =>
      prev.filter((ele, idx) => idx !== removalIndex)
    );
  };

  const clearTracks = () => {
    setTracksInEditor([]);
  };

  const handleFinishCreating = async (playListName) => {
    alert("Looks good, request will be sent");
    const trackUris = tracksInEditor.map((track) => track.uri); //I think this is good
    const response = await fetch(
      `https://api.spotify.com/v1/users/${userData.id}/playlists`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        body: JSON.stringify({
          name: playListName,
          description:
            "This playlist was made with Andrew's awesome playlist editor.",
        }),
      }
    );
    let data = await response.json();
    const addResponse = await fetch(
      `https://api.spotify.com/v1/playlists/${data.id}/tracks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        body: JSON.stringify({
          uris: trackUris,
        }),
      }
    );
  };

  const handlePlaylistClick = async (playlistId, playlistName) => {
    setPlaylistInEditor({ playlistName: playlistName, playlistId: playlistId });
    let response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      }
    );
    let data = await response.json();

    if (data.items.length > 0) {
      let ids = data.items.map((item) => item.track.id);
      let idString = "";
      ids.map((id) => (idString += id + ","));
      response = await fetch(`https://api.spotify.com/v1/tracks?ids=${ids}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      data = await response.json();
      setTracksInEditor(data.tracks);
      setOriginalTracks(data.tracks);
    } else {
      setTracksInEditor([]);
    }

    setIsEditing(true);
    setIsCreatingNew(false);
  };

  const handleStartCreating = () => {
    clearTracks();
    setIsCreatingNew(true);
  };

  const handleSave = async (playlistName, playlistId) => {
    let uris = { tracks: [] };
    console.log(tracksInEditor);
    console.log(originalTracks);
    
    //Make into little objects
    tracksInEditor.map((track) => uris.tracks.push({ uri: track.uri }));
    console.log(uris);
    originalTracks.map((track) => uris.tracks.push({ uri: track.uri }))
    //make delete request, IT WORKS!
    let response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        body: JSON.stringify(uris),
      }
    );
    //I think it workssss
    let uriArr = [];
    tracksInEditor.map((track) => uriArr.push(track.uri));
    response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        body: JSON.stringify(uriArr),
      }
    );

    //Make post request
  };

  return (
    <div className="main-container">
      <div className="upper-container">
        <div className="upper-container-content">
        <h1>Jammming: Playlist Editor</h1>
        {isLoggedIn ? (
          `Welcome ${userData.display_name}`
        ) : (
          <button onClick={loginWithSpotifyClick} className="login-button">Log in?</button>
        )}
        {isLoggedIn && <button onClick={logoutClick} className="logout-button">Log out</button>}
        
        </div>
      </div>
      <div className="middle-container">
        <SearchResults
          handleAddTrack={addTrack}
          handlePlaylistClick={handlePlaylistClick}
          isLoggedIn={isLoggedIn}
        />
        <PlaylistEditor
          tracksInEditor={tracksInEditor}
          handleRemoveTrack={removeTrack}
          handleClearTracks={clearTracks}
          handleFinishCreating={handleFinishCreating}
          playlistInEditor={playlistInEditor}
          isEditing={isEditing}
          isCreatingNew={isCreatingNew}
          handleStartCreating={handleStartCreating}
          handleSave={handleSave}
        />
      </div>
    </div>
  );
}

export default App;
