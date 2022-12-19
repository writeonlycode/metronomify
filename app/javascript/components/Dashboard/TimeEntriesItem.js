import React, { useState } from "react";
import { Group, List, MediaQuery, Modal, Text } from "@mantine/core";

import TimeEntriesEdit from "./TimeEntriesEdit";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

const TimeEntriesItem = ({
  id,
  description,
  started_at,
  ended_at,
  lasted_for,
  bpm,
}) => {
  const [timeEntryEditOpened, setTimeEntryEditOpened] = useState(false);

  const sx = (theme) => ({
    paddingTop: "8px",
    paddingBottom: "8px",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    borderBottom: `1px solid ${theme.colors.gray[8]}`,
    width: "100%",
    cursor: "pointer",

    "&:last-child": {
      borderBottom: "none",
    },

    "&:hover": {
      backgroundColor: theme.colors.gray[9],
    },
  });

  return (
    <List.Item key={id} sx={sx} onClick={() => setTimeEntryEditOpened(true)}>
      <Group
        position="apart"
        styles={{ root: { gap: 0 } }}
      >
        <MediaQuery smallerThan="sm" styles={{ width: "100%" }}>
          <Text size="sm">{description}</Text>
        </MediaQuery>
        <Group styles={{ width: "100%", textAlign: "center" }}>
          <Text size="sm" color="gray">
            {started_at && dayjs(started_at).format("HH:mm")}
            {" - "}
            {ended_at && dayjs(ended_at).format("HH:mm")}
          </Text>
          <Text
            style={{ width: "6rem", textAlign: "right" }}
            size="sm"
            fw={700}
          >
            {lasted_for && dayjs.duration(lasted_for).hours()
              ? dayjs.duration(lasted_for).format("H:mm:ss")
              : dayjs.duration(lasted_for).format("mm:ss")}
          </Text>
        </Group>
      </Group>
      <Modal
        opened={timeEntryEditOpened}
        onClose={() => setTimeEntryEditOpened(false)}
        title="Edit"
      >
        <TimeEntriesEdit
          id={id}
          description={description}
          started_at={started_at}
          ended_at={ended_at}
        />
      </Modal>
    </List.Item>
  );
};

export default TimeEntriesItem;
