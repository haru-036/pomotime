import TimeDisplay from "./timeDisplay";
import useCountDownTimer from "../hooks/useCountDownTimer";
import { RotateCw, Timer, TimerOff } from "lucide-react";
import { useEffect } from "react";
import StartStopButton from "./startStopButton";

export type Time = {
  min: number;
  sec: number;
};

const FocusTimer = ({ focus }: { focus: (e: boolean) => void }) => {
  const focusTime: Time = { min: 25, sec: 0 };

  const [
    time,
    startTime,
    stopTime,
    resetTime,
    { isStart, isStop, isTimeUp, isReset },
  ] = useCountDownTimer(focusTime);

  useEffect(() => {
    const date = new Date();

    if (isTimeUp) {
      focus(false);
      handlePushNotif();
      const times = sessionStorage.getItem("focusTimes");
      if (times) {
        const dayTimes = JSON.parse(times);
        if (dayTimes.date === date.getMonth() + 1 + "/" + date.getDate()) {
          sessionStorage.setItem(
            "focusTimes",
            JSON.stringify({
              date: date.getMonth() + 1 + "/" + date.getDate(),
              times: String(Number(dayTimes.times) + 1),
            })
          );
        } else {
          sessionStorage.setItem(
            "focusTimes",
            JSON.stringify({
              date: date.getMonth() + 1 + "/" + date.getDate(),
              times: String(1),
            })
          );
        }
      } else {
        sessionStorage.setItem(
          "focusTimes",
          JSON.stringify({
            date: date.getMonth() + 1 + "/" + date.getDate(),
            times: String(1),
          })
        );
      }
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
      {isTimeUp && (
        <div className="text-center pb-6">タイムアップだよ！休憩！</div>
      )}
      <div className="my-4 flex gap-x-4 justify-center">
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
        {/* Focus・Breakの時間を変更できる機能を作る↓ */}
        {/* <button className="h-16 w-16 bg-slate-200 rounded disabled:opacity-40 flex items-center justify-center gap-1">
          <Settings size={20} />
        </button> */}
      </div>
    </div>
  );
};

export default FocusTimer;
