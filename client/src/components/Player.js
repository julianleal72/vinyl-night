import { useEffect } from "react";
import axios from "axios";

function Player({ play, token }) {
  useEffect(() => {
    console.log(play)
    setTimeout(() => {
      console.log("starting")
      begin();
    }, 5000);
  }, []);

  async function begin() {
    await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri: play,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      }
    );
  }

  return (
    <div>
      <iframe
        id="myFrame"
        src={`https://open.spotify.com/embed?uri=${play}`}
        width="600"
        height="380"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media; autoplay"
        autoPlay
        title={play}
      ></iframe>
      {/* <audio autoPlay><source src={`https://open.spotify.com/embed?uri=${play}`}/></audio> */}
    </div>
  );
}

export default Player;
