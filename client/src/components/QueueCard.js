function QueueCard({ cardInfo, setQueue }) {
    function handleClick(e){
        e.preventDefault()
        let temp = []
        temp.push(cardInfo)
        console.log(temp)
        setQueue(temp)
    }

  return (
    <div>
      <button type="button" onClick={e => handleClick(e)}>Let's Get It Poppin'</button>
      {cardInfo.map((elem) => (
        <div>{/*turn this into a component as well, that'll solve the key prop issue*/}
          {elem.album.artists[0].name}
          <br />
          <img src={elem.album.images[2]["url"]} alt="album art" />
          <br />
          {elem.album.name}
        </div>
      ))}
    </div>
  );
}

export default QueueCard;
