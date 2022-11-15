import { useEffect } from "react";
import axios from "axios";

function Player({ play, token }) {
  useEffect(() => {
    console.log(play);
    setTimeout(() => {
      begin();
    }, 3000);
  }, []);

  async function begin() {
    let dev_id = null;
    await axios.get("https://api.spotify.com/v1/me/player/devices", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        dev_id = resp.data.devices.find(elem => elem.is_active).id;
        axios.put(
            "https://api.spotify.com/v1/me/player/",
            {
              "play": true,
              "device_ids": [dev_id],
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((resp) => {
            // axios.put(
            //     "https://api.spotify.com/v1/me/player/shuffle",
            //     {
            //       "state": false,
            //       "device_id": dev_id,
            //     },
            //     {
            //       headers: {
            //         Authorization: `Bearer ${token}`,
            //         "Content-Type": "application/json",
            //       },
            //     }
            //   )
            //   .then((resp) => {
                axios.put(
                  "https://api.spotify.com/v1/me/player/play",
                  {
                    "context_uri": play,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                  });
              });
          });
      }
  // )}

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
