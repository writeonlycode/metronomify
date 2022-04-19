import React from "react";
import { Pagination } from "@mantine/core";

const BeatsDisplay = ({ total, current }) => {
  return (
    <Pagination
      total={total}
      page={current}
      size="sm"
      radius="xl"
      withControls={false}
      position="apart"
      siblings={10}
      style={{ paddingLeft: "1em", paddingRight: "1em" }}
    />
  );
};

export default BeatsDisplay;
