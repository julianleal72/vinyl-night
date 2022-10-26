import { useState } from "react";
import Select from "react-select";
import "../App.css"
import Button from "react-bootstrap/Button";

function TimeSelector({ albumLengths, setQueue, userLibrary, setLoading }) {
  const [time, setTime] = useState(60);
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

  function letsStart(e) {
    e.preventDefault();
    setLoading(true)
    let theGoods = selectThree(combinationSum(albumLengths, time));
    let tempA = [];
    for (const elem of theGoods) {
      let tempB = [];
      for (const e of elem) {
        tempB.push(userLibrary[e]);
      }
      tempA.push(tempB);
    }
    setQueue(tempA);
    setLoading(false)
  }

  function selectThree(possibilities) {
    let select3 = [];
    for (let i = 0; i < 3; i++) {
      select3.push(
        possibilities[Math.floor(Math.random() * possibilities.length)]
      );
    }
    return select3;
  }

  function combinationSum(candidates, target) {
    const result = [];
    function permute(arr = [], sum = 0, idx = -1) {
      if (sum > target) return;
      if (Math.abs(sum - target) <= 2) result.push(arr);
      for (let i = idx + 1; i < candidates.length; i++) {
        permute([...arr, i], sum + candidates[i], i);
      }
    }
    permute();
    return result;
  }

  return (
    <div>
      <form onSubmit={(e) => letsStart(e)}>
        <Select className="timeSelect"
          options={options}
          value={options.find((obj) => obj.value === time)}
          onChange={(e) => setTime(e.value)}
        />
        <Button type="submit">Go</Button>
      </form>
    </div>
  );
}

export default TimeSelector;
