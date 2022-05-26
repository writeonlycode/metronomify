import { useState, useEffect } from "react";
import playAlarm from "../utilities/playAlarm";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

const useTimer = (expiryTimestamp, onExpiry) => {
  const [running, setRunning] = useState(false);

  const [initial, setInitial] = useState(dayjs.duration(expiryTimestamp));
  const [remaining, setRemaining] = useState(dayjs.duration(expiryTimestamp));

  const [startedAtDate, setStartedAtDate] = useState(null);
  const [intervalID, setIntervalID] = useState(null);

  const start = () => {
    setStartedAtDate(new Date().toISOString());
    setRunning(true);
  };

  const stop = () => {
    clearInterval(intervalID);
    setRunning(false);
  };

  const reset = () => {
    setRemaining(initial.clone());
  };

  useEffect(() => {
    if (running) {
      const currentIntervalID = setInterval(() => {
        setRemaining((current) => current.subtract({ seconds: 1 }));
      }, 1000);

      setIntervalID(currentIntervalID);
    }
  }, [running]);

  useEffect(() => {
    setInitial(dayjs.duration(expiryTimestamp));

    if (!running) {
      setRemaining(dayjs.duration(expiryTimestamp));
    }
  }, [expiryTimestamp]);

  useEffect(() => {
    if (running && remaining.asSeconds() <= 0) {
      const values = {
        started_at: startedAtDate,
        lasted_for: initial,
      };
      onExpiry(values);
      playAlarm();
      stop();
    }
  }, [remaining]);

  return {
    initial,
    setInitial,
    remaining,
    setRemaining,
    start,
    stop,
    reset,
    running,
  };
};

export default useTimer;
