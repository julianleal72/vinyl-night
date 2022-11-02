import QueueCard from "./QueueCard"
import "../App.css";

function ChooseYourFighter({queue, setPlay, userName, token, setLoading}) {
    return(
        <div className="chooseYourFighter">
            {queue.map((elem, index) => <QueueCard cardInfo = {elem} key = {index} userName={userName} token={token} setPlay={setPlay}  setLoading={setLoading}/>)}
        </div>
    )
}

export default ChooseYourFighter