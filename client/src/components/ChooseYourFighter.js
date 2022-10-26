import QueueCard from "./QueueCard"
import "../App.css";

function ChooseYourFighter({queue, setQueue}) {

    console.log(queue)
    return(
        <div className="chooseYourFighter">
            {queue.map((elem, index) => <QueueCard cardInfo = {elem} key = {index} setQueue={setQueue}/>)}
        </div>
    )
}

export default ChooseYourFighter