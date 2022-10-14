import QueueCard from "./QueueCard"

function ChooseYourFighter({queue, setQueue}) {

    console.log(queue)
    return(
        <div>
            {queue.map((elem, index) => <QueueCard cardInfo = {elem} key = {index} setQueue={setQueue}/>)}
        </div>
    )
}

export default ChooseYourFighter