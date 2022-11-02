import "../App.css";
import axios from "axios";

function QueueCard({ cardInfo, userName, token, setPlay, setLoading }) {

  function handleClick(e) {
    setLoading(true)
    e.preventDefault();
    newPlaylist();
    setLoading(false)
  }

  async function newPlaylist() {
    await axios
      .post(
        `https://api.spotify.com/v1/users/${userName}/playlists`,
        {
          name: `Vinyl Night - ${new Date()}`,
          description: `Your Vinyl Night from ${new Date()}`,
          public: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((resp) => {
        populatePlaylist(getURIs(), resp.data.id);
      });
  }

  async function populatePlaylist(albums, playlist_id) {
    console.log(albums);
    console.log(playlist_id);
    await axios
      .post(
        `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
        albums,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(
        await axios
          .get(`https://api.spotify.com/v1/playlists/${playlist_id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((resp) => {
            setPlay(resp.data.uri);
          })
      );
  }

  function getURIs() {
    let playlist = [];
    for (const album of cardInfo) {
      let digging = album["album"]["tracks"]["items"];
      for (const track of digging) {
        playlist.push(track.uri);
      }
    }
    return playlist;
  }

  return (
    <div className="fighter">
      <button type="button" onClick={(e) => handleClick(e)}>
        Let's Get It Poppin'
      </button>
      <div className="fightCard">
        {cardInfo.map((elem, index) => (
          <div key={index}>
            {elem.album.artists[0].name}
            <br />
            <img src={elem.album.images[2]["url"]} alt="album art" />
            <br />
            {elem.album.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default QueueCard;
