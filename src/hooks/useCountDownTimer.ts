import { useCallback, useRef, useState } from "react";
import { Time } from "../components/focusTimer";

type UseCountDownTimerReturn = [
  Time,
  () => void,
  () => void,
  () => void,
  { isStart: boolean; isStop: boolean; isTimeUp: boolean; isReset: boolean }
];

const useCountDownTimer = (time: Time): UseCountDownTimerReturn => {
  const [timeLimit, setTimeLimit] = useState<Time>(time);
  const [isStart, setIsStart] = useState(false);
  const [isStop, setIsStop] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const intervalID = useRef<number>();

  const zeroPaddingNum = (num: number) => {
    const zeroPadding = String(num).padStart(2, "0");
    return Number(zeroPadding);
  };

  const startTime = useCallback((): void => {
    intervalID.current = setInterval(() => tick(), 1000);
    setIsStart(true);
    setIsStop(false);
    setIsTimeUp(false);
    setIsReset(false);
  }, []);

  const stopTime = useCallback(() => {
    clearInterval(intervalID.current);
    setIsStop(true);
    setIsStart(false);
  }, []);

  const resetTime = useCallback(() => {
    clearInterval(intervalID.current);

    setTimeLimit(time);
    setIsReset(true);
    setIsStart(false);
    setIsStop(false);
    setIsTimeUp(false);
  }, []);

  const tick = useCallback(() => {
    setTimeLimit((prevTimeLimit) => {
      const newTimeLimit = Object.assign({}, prevTimeLimit);
      const { min, sec } = newTimeLimit;

      if (min <= 0 && sec <= 0) {
        stopTime();
        setIsTimeUp(true);
        return newTimeLimit;
      }

      if (newTimeLimit.min > 0 && newTimeLimit.sec <= 0) {
        newTimeLimit.min -= 1;
        newTimeLimit.sec = 60;
      }

      newTimeLimit.sec -= 1;

      return {
        min: zeroPaddingNum(newTimeLimit.min),
        sec: zeroPaddingNum(newTimeLimit.sec),
      };
    });
  }, []);

  return [
    timeLimit,
    startTime,
    stopTime,
    resetTime,
    { isStart, isStop, isTimeUp, isReset },
  ];
};

export default useCountDownTimer;
