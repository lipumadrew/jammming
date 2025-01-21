import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SearchBar from "./components/searchBar.jsx";
import PlaylistEditor from "./components/playlistEditor.jsx";
import SearchResults from "./components/SearchResults.jsx";
import { use } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("http://localhost:5173/");
  const [clientId, setClientId] = useState("88cf412ba66b4486b502d2c24425d4ea");
  const [authCode, setAuthCode] = useState();

  useEffect(() => {
    if (localStorage.getItem("code")) {
      getToken(localStorage.getItem("code"));
    }
  }, []);

  const authorizationEndpoint = "https://accounts.spotify.com/authorize";
  const tokenEndpoint = "https://accounts.spotify.com/api/token";
  const scope = "user-read-private user-read-email";

  const getAuthCode = async () => {
    //-------------------------------crap

    const generateRandomString = (length) => {
      const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const values = crypto.getRandomValues(new Uint8Array(length));
      return values.reduce((acc, x) => acc + possible[x % possible.length], "");
    };

    const codeVerifier = generateRandomString(64);


    async function sha256(plain) {
      const encoder = new TextEncoder()
      const data = encoder.encode(plain)
    
      return window.crypto.subtle.digest('SHA-256', data)
    }
    
    function base64urlencode(a) {
      return btoa(String.fromCharCode.apply(null, new Uint8Array(a))
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''))
    }
    
    const hashed = await sha256(verifyCode)
    const codeChallenge = base64urlencode(hashed)

    /*
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
    */

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
    window.localStorage.setItem("code", code);

    //-------------------------------crap
  };

  const getToken = async (code) => {
    // stored in the previous step
    let codeVerifier = localStorage.getItem("code_verifier");

    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: "88cf412ba66b4486b502d2c24425d4ea",
        grant_type: "authorization_code",
        code,
        redirect_uri: "http://localhost:5173/",
        code_verifier: codeVerifier,
      }),
    };

    const body = await fetch("https://accounts.spotify.com/api/token", payload);

    const response = await body.json();

    localStorage.setItem("access_token", response.access_token);
  };

  const handleLogIn = async () => {
    await getAuthCode();
  };

  return (
    <div>
      <div className="upper-container">
        <h1>Jammming: Playlist Editor</h1>
        {isLoggedIn ? (
          "Welcome 'insert name here'"
        ) : (
          <button onClick={handleLogIn}>Log in?</button>
        )}
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
