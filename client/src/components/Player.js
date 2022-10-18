function Player({ queue }) {
  console.log(queue);
  return (
    <div>
      {queue[0].map((element) => (
        <iframe
        id = "myFrame"
          src={`https://open.spotify.com/embed?uri=${element.album.uri}`}
          width="300"
          height="380"
          frameborder="0"
          allowtransparency="true"
          allow="encrypted-media; autoplay"
          title={element.album.name}
        >
        </iframe>
      ))}
    </div>
  );
}

export default Player
