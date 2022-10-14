import { useState } from "react";
import Select from "react-select";

function TimeSelector({ albumLengths, setQueue, userLibrary }) {
  const [time, setTime] = useState(60);
  const options = [
    { value: 30, label: "30m" },
    { value: 45, label: "45m" },
    { value: 60, label: "1h" },
    { value: 75, label: "1h 15m" },
    { value: 90, label: "1h 30m" },
    { value: 105, label: "1h 45m" },
    { value: 120, label: "2hrs" },
    { value: 135, label: "2hrs 15m" },
    { value: 150, label: "2hrs 30m" },
    { value: 165, label: "2hrs 45m" },
    { value: 180, label: "3hrs" },
  ];

  function letsStart(e) {
    e.preventDefault();
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
        <Select
          options={options}
          value={options.find((obj) => obj.value === time)}
          onChange={(e) => setTime(e.value)}
        />
        <button type="submit">Go</button>
      </form>
    </div>
  );
}

export default TimeSelector;
