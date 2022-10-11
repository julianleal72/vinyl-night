import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const CLIENT_ID = "8db5dd11ef6847a7bc0184d40546bdb3";
  const REDIRECT_URI = "http://localhost:4000";
  const AUTH_ENDPOINT =
    "https://accounts.spotify.com/authorize?scope=user-library-read";
  const RESPONSE_TYPE = "token";
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");
  const [userLibrary, setUserLibrary] = useState([]);
  // const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    console.log(token);
    setToken(token);
  }, []);

  //   let urlParams = new URLSearchParams(window.location.hash.replace("#","?"));
  // let token = urlParams.get('access_token');

  async function getUser() {
    const { data } = await axios.get("https://api.spotify.com/v1/me/albums", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    setUserLibrary(data);
    console.log(data);
  }

  function handleLogOut() {
    setToken("");
    window.localStorage.removeItem("token");
  }

  async function getUserAlbums() {
    let offset = 0;
    let go = true;
    while (go) {
      let { data } = await axios.get(
        `https://api.spotify.com/v1/me/albums?offset=${offset}&limit=50`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setUserLibrary([...userLibrary, data.items])
      console.log(data)
      offset += 50;
      if (!data.next) go = false;
    }
  }

  // async function searchArtists(e) {
  //   e.preventDefault();
  //   const { data } = await axios.get("https://api.spotify.com/v1/search", {
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     },
  //     params: {
  //       q: searchKey,
  //       type: "artist",
  //     },
  //   });
  //   console.log(data);
  // }

  return (
    <div className="App">
      <h1>TurNTablE - Vinyl Night</h1>
      {!token ? (
        <a
          href={`${AUTH_ENDPOINT}&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          <button onClick={handleLogOut}>Sign In To Spotify</button>
        </a>
      ) : (
        <button>Log Out</button>
      )}

      {/* {token ? (
        <form onSubmit={(e) => searchArtists(e)}>
          <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
          <button type="submit">Search</button>
        </form>
      ) : (
        <p>Please Log In</p>
      )} */}

      {token ? (
        <button onClick={getUserAlbums}>Get User Albums</button>
      ) : (
        <p>Please Log In</p>
      )}
    </div>
  );
}

export default App;
