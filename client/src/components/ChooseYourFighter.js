import QueueCard from "./QueueCard"
import Button from "react-bootstrap/Button";
import "../App.css";

function ChooseYourFighter({queue, setPlay, userName, token, setLoading, neonMode, setQueue}) {

    function handleClickTime(e){
        e.preventDefault()
        setQueue(null)
    }
    function handleClickSpin(e){
        e.preventDefault()
        setPlay(null)
    }

    return(
        <div className="chooseYourFighter">
            {queue.map((elem, index) => <QueueCard cardInfo = {elem} key = {index} userName={userName} token={token} setPlay={setPlay}  setLoading={setLoading} neonMode={neonMode}/>)}
            <div></div>
            <div className="utilitybuttons">
            <Button
            onClick={(e)=>handleClickTime(e)}
            variant={neonMode ? "outline-success" : "outline-warning"}
          >
            Change Time
          </Button>
          <Button
           onClick={(e)=>handleClickSpin(e)}
            variant={neonMode ? "outline-success" : "outline-warning"}
          >
            Re-Spin
          </Button>
            </div>
            <div></div>
        </div>
    )
}

export default ChooseYourFighter