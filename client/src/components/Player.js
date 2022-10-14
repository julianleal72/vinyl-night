import ReactPlayer from 'react-player'

function Player({queue}){
    console.log(queue)
    return(
        <ReactPlayer url={queue[0][0].album.uri}/>
    )
}

export default Player