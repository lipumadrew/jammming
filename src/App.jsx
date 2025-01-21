import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SearchBar from "./components/searchBar.jsx";
import PlaylistEditor from "./components/playlistEditor.jsx";
import SearchResults from "./components/SearchResults.jsx";

function App() {
  const [count, setCount] = useState(0);

  const userAuth = async () => {
    //Process for PKCE authorization
    //I have no idea. I'm winging it.
    //OK, it works, just update the redirect URI on the spotify api dash board, and paste it here
    //When ready to deploy, it will be the vercel domain of course

    const generateRandomString = (length) => {
      const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const values = crypto.getRandomValues(new Uint8Array(length));
      return values.reduce((acc, x) => acc + possible[x % possible.length], "");
    };

    const codeVerifier = generateRandomString(64);

    const sha256 = async (plain) => {
      const encoder = new TextEncoder();
      const data = encoder.encode(plain);
      return window.crypto.subtle.digest("SHA-256", data);
    };

    const base64encode = (input) => {
      return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
    };

    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);
    const clientId = "88cf412ba66b4486b502d2c24425d4ea";
    const redirectUri = "http://localhost:5173/";

    const scope = "user-read-private user-read-email";
    const authUrl = new URL("https://accounts.spotify.com/authorize");

    // generated in the previous step
    window.localStorage.setItem("code_verifier", codeVerifier);

    const params = {
      response_type: "code",
      client_id: clientId,
      scope,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
    };

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();

    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get("code");

    const getToken = async (code) => {
      // stored in the previous step
      let codeVerifier = localStorage.getItem("code_verifier");

      const payload = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: clientId,
          grant_type: "authorization_code",
          code,
          redirect_uri: redirectUri,
          code_verifier: codeVerifier,
        }),
      };

      const body = await fetch(url, payload);
      const response = await body.json();

      localStorage.setItem("access_token", response.access_token);
    };
    getToken(code);
  };

  return (
    <div>
      <div className="upper-container">
        <h1>Jammming: Playlist Editor</h1>
        <button onClick={userAuth}>Log in?</button>
        <h2></h2>
      </div>
      <div className="middle-container">
        <SearchResults />
        <PlaylistEditor />
      </div>
    </div>
  );
}

export default App;
