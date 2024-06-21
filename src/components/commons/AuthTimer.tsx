import { useEffect, useState } from "react";

interface AuthTimerProps {
  expire_time: number;
  start: boolean;
  setStart: React.Dispatch<boolean>;
}
const AuthTimer = ({ expire_time, start, setStart }: AuthTimerProps) => {
  const [time, setTime] = useState(expire_time);

  useEffect(() => {
    if (start) {
      const Counter = setInterval(() => {
        const temp = time - 1;
        if (temp === -1) {
          setStart(false);
          clearInterval(Counter);
        } else {
          setTime(temp);
        }
      }, 1000);
      return () => clearInterval(Counter);
    } else if (!start) {
      setTime(expire_time);
    }
  }, [start, setStart, time, expire_time]);

  const timeFormat = (time: number) => {
    const m = Math.floor(time / 60).toString();
    let s = (time % 60).toString();
    if (s.length === 1) s = `0${s}`;
    return `${m}:${s}`;
  };

  return <div className="timer">{timeFormat(time)}</div>;
};

export default AuthTimer;
