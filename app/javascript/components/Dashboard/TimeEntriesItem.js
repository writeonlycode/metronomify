import React, { useState } from "react";
import { ActionIcon, Group, List, MediaQuery, Modal, Text } from "@mantine/core";
import { IconEdit } from "@tabler/icons";

import TimeEntriesEdit from "./TimeEntriesEdit";
import TimeEntriesDestroy from "./TimeEntriesDestroy";

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

  // const styles = {
  //   paddingTop: "4px",
  //   paddingBottom: "4px",
  //   paddingLeft: "1rem",
  //   paddingRight: "1rem",
  //   borderRadius: "4px",
  // };

  const sx = (theme) => ({
    paddingTop: "8px",
    paddingBottom: "8px",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    borderBottom: `1px solid ${theme.colors.gray[8]}`,
    marginLeft: "8px",
    marginRight: "8px",

    "&:last-child": {
      borderBottom: "none",
    },

    "&:hover": {
      backgroundColor: theme.colors.gray[9],
    },
  });

  return (
    <>
      <List.Item key={id} sx={sx} onClick={() => setTimeEntryEditOpened(true)}>
        <Group position="apart" styles={{ root: {gap: 0} }}>
          <MediaQuery smallerThan="sm" styles={{ width: "100%" }}>
            <Text size="sm">{description}</Text>
          </MediaQuery>
          <Group styles={{ width: "100%", textAlign:"center" }}>
              <Text size="sm" color="gray">
                {started_at && dayjs(started_at).format("HH:mm")}
                {" - "}
                {ended_at && dayjs(ended_at).format("HH:mm")}
              </Text>
              <Text size="sm" fw={700}>
                {lasted_for && dayjs.duration(lasted_for).format("H:mm:ss")}
              </Text>
          </Group>
        </Group>
      </List.Item>
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
    </>
  );
};

export default TimeEntriesItem;
