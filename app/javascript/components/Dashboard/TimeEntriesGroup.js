import React from "react";
import { List, Paper, Title } from "@mantine/core";
import TimeEntriesItem from "./TimeEntriesItem";

import dayjs from "dayjs";

const TimeEntriesGroup = ({ title, entries }) => {
  const items = entries.map((element) => (
    <TimeEntriesItem
      key={element.id}
      id={element.id}
      description={element.description}
      started_at={element.started_at}
      ended_at={element.ended_at}
      lasted_for={element.lasted_for}
    />
  ));
  return (
    <List
      listStyleType="none"
      sx={(theme) => ({
        marginBottom: "16px",
        padding: "16px",
        backgroundColor: theme.colors.dark[9],
        borderRadius: "8px",
      })}
    >
      <Title key={title} order={5}>
        {title && dayjs(title).format("dddd, MMMM DD, YYYY")}
      </Title>
      {items}
    </List>
  );
};

export default TimeEntriesGroup;
