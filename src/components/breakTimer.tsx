import { useEffect } from "react";
import useCountDownTimer from "../hooks/useCountDownTimer";
import { Time } from "./focusTimer";
import TimeDisplay from "./timeDisplay";
import { RotateCw, Timer, TimerOff } from "lucide-react";
import StartStopButton from "./startStopButton";

const BreakTimer = ({ focus }: { focus: (e: boolean) => void }) => {
  const breakTime: Time = { min: 5, sec: 0 };

  const [
    time,
    startTime,
    stopTime,
    resetTime,
    { isStart, isStop, isTimeUp, isReset },
  ] = useCountDownTimer(breakTime);

  useEffect(() => {
    if (isTimeUp) {
      focus(true);
      handlePushNotif();
    }
  }, [isTimeUp]);

  useEffect(() => {
    if ("Notification" in window) {
      // 通知が許可されていたら早期リターン
      const permission = Notification.permission;
      if (permission === "denied" || permission === "granted") {
        return;
      }
      // 通知の許可を求める
      Notification.requestPermission();
    }
  }, []);

  const handlePushNotif = () => {
    if ("Notification" in window) {
      const notif = new Notification("タイマー終了！");
      // プッシュ通知が表示された時に起きるイベント
      // notif.addEventListener("show", () => {
      //   // 状態によって音の有無を変える
      //   if (hasSound) {
      //     // 音再生
      //     new Audio("./push.wav").play();
      //   }
      // });
    }
  };

  return (
    <div className="">
      <TimeDisplay time={time} delimiter={":"} />
      <div className="flex gap-4 justify-center my-4">
        {!isStart ? (
          <StartStopButton onClick={startTime} disabled={isStart} start={true}>
            <Timer size={20} />
            start
          </StartStopButton>
        ) : (
          <StartStopButton onClick={stopTime} disabled={!isStart} start={false}>
            <TimerOff size={20} /> stop
          </StartStopButton>
        )}
        <button
          onClick={resetTime}
          disabled={isStart || (isStop && !isTimeUp && !isReset) ? false : true}
          className="h-16 w-16 bg-slate-200 rounded disabled:opacity-40 flex items-center justify-center gap-1"
        >
          <RotateCw size={20} />
          {/* reset */}
        </button>
        {/* <button className="h-16 w-16 bg-slate-200 rounded disabled:opacity-40 flex items-center justify-center gap-1">
          <Settings size={20} />
        </button> */}
      </div>
    </div>
  );
};

export default BreakTimer;
