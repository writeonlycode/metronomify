import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  Text,
  Group,
  List,
  Loader,
  Modal,
  ActionIcon,
  Title,
} from "@mantine/core";
import { IconEdit, IconId } from "@tabler/icons";
import { indexTimeEntries } from "../../apis/timeEntries";
import TimeEntriesShow from "./TimeEntriesShow";
import TimeEntriesEdit from "./TimeEntriesEdit";
import TimeEntriesDestroy from "./TimeEntriesDestroy";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import groupTimeEntriesByDay from "../../utilities/groupTimeEntriesByDay";
dayjs.extend(duration);

const TimeEntriesIndex = () => {
  const [opened, setOpened] = useState(false);
  const [timeEntryEditOpened, setTimeEntryEditOpened] = useState(false);
  const [elementId, setElementId] = useState(null);

  const { isLoading, isError, data, error } = useQuery(
    "timeEntries",
    indexTimeEntries
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return error;
  }

  const groupedData = groupTimeEntriesByDay(data);
  const items = [];

  for (const group in groupedData) {
    items.push(
      <Title key={group} order={5}>
        {dayjs(group).format("dddd, MMMM DD, YYYY")}
      </Title>
    );
    const entries = groupedData[group].map((element) => (
      <List.Item
        key={element.id}
        style={{
          paddingTop: "4px",
          paddingBottom: "4px",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          borderRadius: "4px",
        }}
        sx={(theme) => ({
          "&:hover": {
            backgroundColor: theme.colors.gray[9],
          },
        })}
      >
        <Group position="apart">
          <div>
            <Text size="sm">{element.description}</Text>
          </div>
          <Group>
            <Text size="sm" style={{ marginLeft: "1rem", width: "6rem" }}>
              {element.started_at && dayjs(element.started_at).format("H:mm")} -{" "}
              {element.ended_at && dayjs(element.ended_at).format("H:mm")}
            </Text>
            <Text size="sm" style={{ marginLeft: "1rem", width: "6rem" }}>
              {element.lasted_for &&
                dayjs.duration(element.lasted_for).format("H:mm:ss")}
            </Text>
            <ActionIcon
              onClick={() => {
                setElementId(element.id);
                setOpened(true);
              }}
            >
              <IconId size="20px" />
            </ActionIcon>
            <ActionIcon
              onClick={() => {
                setElementId(element.id);
                setTimeEntryEditOpened(true);
              }}
            >
              <IconEdit size="20px" />
            </ActionIcon>
            <TimeEntriesDestroy id={element.id} />
          </Group>
        </Group>
      </List.Item>
    ));
    items.push(<List listStyleType="none">{entries}</List>);
  }

  return (
    <>
      {items}

      <Modal opened={opened} onClose={() => setOpened(false)} title="Details">
        <TimeEntriesShow id={elementId} />
      </Modal>
      <Modal
        opened={timeEntryEditOpened}
        onClose={() => setTimeEntryEditOpened(false)}
        title="Edit"
      >
        <TimeEntriesEdit id={elementId} />
      </Modal>
    </>
  );
};

export default TimeEntriesIndex;
