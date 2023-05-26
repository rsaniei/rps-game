import React, { useEffect, useRef, useState } from "react";
import "./Timer.scss";

type TimerPropsType = {
  seconds: number;
  handleTimeOut: () => void;
};
export default function Timer({ seconds, handleTimeOut }: TimerPropsType) {
  const [countDown, setCountDown] = useState(seconds);
  const timerId = useRef<number>();

  useEffect(() => {
    timerId.current = window.setInterval(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId.current);
  }, []);

  useEffect(() => {
    if (countDown <= 0) {
      clearInterval(timerId.current);
      handleTimeOut();
    }
  }, [countDown]);

  return (
    <div data-testid="timer-element" className="countdown">
      {countDown}
    </div>
  );
}
