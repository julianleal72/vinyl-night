import { useEffect, useState } from "react";
import Select from "react-select";
import "../App.css";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

function TimeSelector({
  albumLengths,
  setQueue,
  userLibrary,
  neonMode
}) {
  const [time, setTime] = useState(60);
  const [loading, setLoading] = useState(false);

  const options = [
    { value: 30, label: "30 m" },
    { value: 45, label: "45 m" },
    { value: 60, label: "1 h" },
    { value: 75, label: "1 h 15 m" },
    { value: 90, label: "1 h 30 m" },
    { value: 105, label: "1 h 45 m" },
    { value: 120, label: "2 hrs" },
    { value: 135, label: "2 hrs 15 m" },
    { value: 150, label: "2 hrs 30 m" },
    { value: 165, label: "2 hrs 45 m" },
    { value: 180, label: "3 hrs" },
  ];

  useEffect(() => {
    if (loading) {
      setTimeout(() => letsStart(), 500);
    }
  }, [loading]);

  function letsStart() {
    setQueue(middleMan());
    setLoading(false);
  }

  function middleMan() {
    let theGoods = selectThree(combinationSum(albumLengths, time));
    console.log(theGoods)
    let tempA = [];
    for (const elem of theGoods) {
      let tempB = [];
      for (const e of elem) {
        tempB.push(userLibrary[e]);
      }
      tempA.push(tempB);
    }
    return tempA;
  }

  function selectThree(possibilities) {
    let select3 = [];
    console.log(possibilities)
    for (let i = 0; i < 3; i++) {
      select3.push(
        possibilities[Math.floor(Math.random() * possibilities.length)]
      );
    }
    return select3;
  }

  function combinationSum(candidates, target) {
    const result = [];
    function permute(arr = [], sum = 0, idx = Math.floor(Math.random() * (candidates.length/2))-1) {
      if (sum > target) return;
      if (Math.abs(sum - target) <= 5) result.push(arr);
      for (let i = idx + 1; i < candidates.length; i+=2) {
        if (result.length > 1000) return result
        permute([...arr, i], sum + candidates[i], i + Math.floor(Math.random()*candidates.length));
      }
    }
    permute();
    return result;
  }

  return (
    <div>
      {loading ? (
        <Spinner animation="border" variant="primary" className="loader" />
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true)
          }}
        >
          <Select
            className="timeSelect"
            options={options}
            value={options.find((obj) => obj.value === time)}
            onChange={(e) => setTime(e.value)}
            isSearchable={false}
          />
          <br />
          <Button
            type="submit"
            variant={neonMode ? "outline-success" : "outline-warning"}
          >
            Go
          </Button>
        </form>
      )}
    </div>
  );
}

export default TimeSelector;
