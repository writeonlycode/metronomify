import { useState, useEffect } from "react";
import { Temporal } from "@js-temporal/polyfill";

const useTimer = (expiryTimestamp, onExpiry) => {
  const [running, setRunning] = useState(false);

  const [initial, setInitial] = useState(
    Temporal.Duration.from(expiryTimestamp)
  );
  const [remaining, setRemaining] = useState(
    Temporal.Duration.from(expiryTimestamp)
  );

  const [intervalID, setIntervalID] = useState(null);

  const start = () => {
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

  useEffect(() => {
    if (remaining.sign <= 0) {
      stop();
      onExpiry();
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
