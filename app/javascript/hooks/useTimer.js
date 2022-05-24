import { useState, useEffect } from "react";
import { Temporal } from "@js-temporal/polyfill";
import dayjs from 'dayjs';


import useTone from "./useTone";

const useTimer = (expiryTimestamp, onExpiry) => {
  const [running, setRunning] = useState(false);

  const [initial, setInitial] = useState(
    Temporal.Duration.from(expiryTimestamp)
  );
  const [remaining, setRemaining] = useState(
    Temporal.Duration.from(expiryTimestamp)
  );

  const [startedAtDate, setStartedAtDate] = useState(null);
  const [endedAtDate, setEndedAtDate] = useState(null);

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
    setRemaining(initial);
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
    if (!running) {
      reset();
    }
  }, [initial]);

  const tone = useTone();

  useEffect(() => {
    if (running && remaining.sign <= 0) {
      const values = { started_at: startedAtDate, lasted_for: initial.toString() };
      onExpiry(values);
      tone.playAlarm();
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
