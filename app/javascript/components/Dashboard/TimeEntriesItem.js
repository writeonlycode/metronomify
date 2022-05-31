import React, { useState } from "react";
import { ActionIcon, Group, List, Modal, Text } from "@mantine/core";
import { IconEdit, IconId } from "@tabler/icons";

import TimeEntriesShow from "../TimeEntries/TimeEntriesShow";
import TimeEntriesEdit from "../TimeEntries/TimeEntriesEdit";
import TimeEntriesDestroy from "../TimeEntries/TimeEntriesDestroy";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

const TimeEntriesItem = ({
  id,
  description,
  started_at,
  ended_at,
  lasted_for,
}) => {
  const [timeEntryShowOpened, setTimeEntryShowOpened] = useState(false);
  const [timeEntryEditOpened, setTimeEntryEditOpened] = useState(false);

  const style = {
    paddingTop: "4px",
    paddingBottom: "4px",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    borderRadius: "4px",
  };

  const sx = (theme) => ({
    "&:hover": {
      backgroundColor: theme.colors.gray[9],
    },
  });

  return (
    <>
      <List.Item key={id} style={style} sx={sx}>
        <Group position="apart">
          <Text size="sm">{description}</Text>
          <Group>
            <Text size="sm" style={{ marginLeft: "1rem", width: "6rem" }}>
              {started_at && dayjs(started_at).format("HH:mm")}
              {" - "}
              {ended_at && dayjs(ended_at).format("HH:mm")}
            </Text>
            <Text size="sm" style={{ marginLeft: "1rem", width: "6rem" }}>
              {lasted_for && dayjs.duration(lasted_for).format("HH:mm:ss")}
            </Text>
            <ActionIcon onClick={() => setTimeEntryShowOpened(true)}>
              <IconId size="20px" />
            </ActionIcon>
            <ActionIcon onClick={() => setTimeEntryEditOpened(true)}>
              <IconEdit size="20px" />
            </ActionIcon>
            <TimeEntriesDestroy id={id} />
          </Group>
        </Group>
      </List.Item>
      <Modal
        opened={timeEntryShowOpened}
        onClose={() => setTimeEntryShowOpened(false)}
        title="Details"
      >
        <TimeEntriesShow id={id} />
      </Modal>
      <Modal
        opened={timeEntryEditOpened}
        onClose={() => setTimeEntryEditOpened(false)}
        title="Edit"
      >
        <TimeEntriesEdit id={id} />
      </Modal>
    </>
  );
};

export default TimeEntriesItem;