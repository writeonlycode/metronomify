import React, { useState } from "react";
import { ActionIcon, Group, List, Modal, Text } from "@mantine/core";
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
}) => {
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
            <ActionIcon onClick={() => setTimeEntryEditOpened(true)}>
              <IconEdit size="20px" />
            </ActionIcon>
            <TimeEntriesDestroy id={id} />
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
