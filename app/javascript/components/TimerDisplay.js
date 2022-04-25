import React from "react";
import {Text} from "@mantine/core";

const TimerDisplay = ({ timer }) => {
  return (
    <Text size="sm" align="center">
          {
            timer?.remaining?.minutes.toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            }) +
            ":" +
            timer?.remaining?.seconds.toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })
          }
    </Text>
  );
};

export default TimerDisplay;
