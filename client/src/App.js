import { useState, useEffect } from "react";
import axios from "axios";
import TimeSelector from "./components/TimeSelector";
import Player from "./components/Player";
import ChooseYourFighter from "./components/ChooseYourFighter";
import "./App.css";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const CLIENT_ID = "8db5dd11ef6847a7bc0184d40546bdb3";
  const REDIRECT_URI = "http://localhost:4000";
  const AUTH_ENDPOINT =
    "https://accounts.spotify.com/authorize?scope=user-library-read";
  const RESPONSE_TYPE = "token";
  const [token, setToken] = useState(false);
  const [userLibrary, setUserLibrary] = useState([]);
  const [albumLengths, setAlbumLengths] = useState([]);
  const [queue, setQueue] = useState(false);
  const imageFlipArr = [
    "./img/Vinyl/1.jpg",
    "./img/Vinyl/2.jpg",
    "./img/Vinyl/3.jpg",
    "./img/Vinyl/4.jpg",
    "./img/Vinyl/5.jpg",
    "./img/Vinyl/6.jpg",
    "./img/Vinyl/8.jpg"
  ];
  const [currentImg, setCurrentImg] = useState(imageFlipArr[0]);
  const [loading, setLoading] = useState(false);

  //userLibrary[x].album.uri

  useEffect(() => {
    const hash = window.location.hash;
    let tempToken = window.localStorage.getItem("token");

    if (!tempToken && hash) {
      tempToken = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", tempToken);
    }
    console.log(tempToken);
    setToken(tempToken);
  }, []);

  // let urlParams = new URLSearchParams(window.location.hash.replace("#","?"));
  // let token = urlParams.get('access_token');

  useEffect(() => {
    async function getUserAlbums() {
      let offset = 0;
      let go = true;
      let temp = [];
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
        temp = temp.concat(data.items);
        // console.log(data);
        offset += 50;
        if (!data.next) go = false;
      }
      console.log(temp);
      setUserLibrary(temp);
      setLoading(false);
    }
    if (token) {
      setLoading(true);
      getUserAlbums();
    }
  }, [token]);

  useEffect(() => {
    function getAlbumLengths() {
      let temp = [];
      for (const albumObj of userLibrary) {
        let length = 0;
        for (const track of albumObj.album.tracks.items) {
          length += Math.round(track.duration_ms / 1000);
        }
        temp.push(Math.round(length / 60));
      }
      console.log(temp);
      setAlbumLengths(temp);
    }
    if (userLibrary.length > 0) getAlbumLengths();
  }, [userLibrary]);

  function handleLogOut() {
    window.localStorage.removeItem("token");
    setToken(null);
  }

  useEffect(() => {
    setTimeout(() => {
      let newIndex = 0;
      if (
        imageFlipArr.findIndex((element) => element === `${currentImg}`) <
        imageFlipArr.length - 1
      )
        newIndex =
          imageFlipArr.findIndex((element) => element === `${currentImg}`) + 1;
      setCurrentImg(imageFlipArr[newIndex]);
    }, 400);
  }, [currentImg]);

  return (
    <div className="App">
      <img src={require(`${currentImg}`)} alt="logo" />
      {/*PUT RECORD PLAYER GIF HERE*/}
      {loading ? (
        <Spinner animation="border" variant="primary" className="loader"/>
      ) : (
        <div className="Goods">
          {token ? (
            queue ? (
              queue.length > 1 ? (
                <ChooseYourFighter queue={queue} setQueue={setQueue} />
              ) : (
                <Player queue={queue} />
              )
            ) : (
              <TimeSelector
                albumLengths={albumLengths}
                setQueue={setQueue}
                userLibrary={userLibrary}
                setLoading={setLoading}
              />
            )
          ) : null}

          {!token ? (
            <div>Login with <br/>
            <Button variant="success">
              <a
                href={`${AUTH_ENDPOINT}&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
              >
                <img
                  className="loginButton"
                  alt="SpotifyLogo"
                  src={require("./img/spotify-icons-logos/logos/01_RGB/02_PNG/Spotify_Logo_RGB_White.png")}
                />
              </a>
            </Button></div>
          ) : null}
        </div>)}
         {token ? <div className="logoutbutton">
          <Button
            variant="outline-warning"
            onClick={handleLogOut}
          >
            Log Out
          </Button></div> : null}
    </div>
  );
}

export default App;
