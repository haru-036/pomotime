import { useEffect, useState } from "react";
import BreakTimer from "./components/breakTimer";
import FocusTimer from "./components/focusTimer";
import List from "./components/list";

function App() {
  const [focus, setFocus] = useState(true);
  const [focusTimes, setFocusTimes] = useState(0);
  const [day, setDay] = useState("");

  useEffect(() => {
    const times = sessionStorage.getItem("focusTimes");
    if (!times) return;
    const dayTimes = JSON.parse(times);
    setFocusTimes(Number(dayTimes.times));
    setDay(dayTimes.date);
  }, [focus]);

  return (
    <div className="text-black bg-white h-screen font-RedditMono">
      <div className="container py-20 max-w-[800px]">
        <h1 className="text-black text-3xl font-semibold">PomoTime</h1>
        <p>Focus or Break</p>
        <div className="my-8">
          <div className="flex justify-center items-center gap-x-8 my-2">
            <button
              className={`text-2xl py-2 px-4 ${
                focus ? "border-b-4 border-black" : "border-b-4"
              }`}
              onClick={() => setFocus(true)}
            >
              focus
            </button>
            <button
              className={`text-2xl py-2 px-4 ${
                !focus ? "border-b-4 border-black" : "border-b-4"
              }`}
              onClick={() => setFocus(false)}
            >
              break
            </button>
          </div>
          {focus ? (
            <FocusTimer focus={(focus) => setFocus(focus)} />
          ) : (
            <BreakTimer focus={(focus) => setFocus(focus)} />
          )}
        </div>
        <List times={focusTimes} date={day} />
      </div>
    </div>
  );
}

export default App;

// 背景どうしようかなー
