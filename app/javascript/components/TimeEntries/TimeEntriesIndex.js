import React, { useState } from "react";
import { useQuery } from "react-query";
import { Temporal } from "@js-temporal/polyfill";
import { Text, Group, List, Loader, Modal, ActionIcon } from "@mantine/core";
import { IconEdit, IconId } from "@tabler/icons";
import { indexTimeEntries } from "../../apis/timeEntries";
import TimeEntriesShow from "./TimeEntriesShow";
import TimeEntriesEdit from "./TimeEntriesEdit";
import TimeEntriesDestroy from "./TimeEntriesDestroy";

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

  return (
    <>
      <List listStyleType="none">
        {data.map((element) => (
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
                  {element.started_at &&
                    Temporal.Instant.from(element.started_at).toLocaleString()}
                </Text>
                <Text size="sm" style={{ marginLeft: "1rem", width: "6rem" }}>
                  {element.ended_at &&
                    Temporal.Instant.from(element.ended_at).toLocaleString()}
                </Text>
                <Text size="sm" style={{ marginLeft: "1rem", width: "6rem" }}>
                  {element.lasted_for &&
                    Temporal.Duration.from(element.lasted_for).toLocaleString()}
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
        ))}
      </List>

      <Modal opened={opened} onClose={() => setOpened(false)} title="Details">
        <TimeEntriesShow id={elementId} />
      </Modal>
      <Modal opened={timeEntryEditOpened} onClose={() => setTimeEntryEditOpened(false)} title="Edit">
        <TimeEntriesEdit id={elementId} />
      </Modal>
    </>
  );
};

export default TimeEntriesIndex;
