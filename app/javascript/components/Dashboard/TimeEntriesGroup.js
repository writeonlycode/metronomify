import React from "react";
import { createStyles, List, Title } from "@mantine/core";
import TimeEntriesItem from "./TimeEntriesItem";

import dayjs from "dayjs";

const useStyles = createStyles((theme) => ({
  root: {
    marginBottom: "16px",
    paddingTop: "16px",
    paddingbottom: "16px",
    backgroundColor: theme.colors.dark[9],
    borderRadius: "8px",
  },
  itemWrapper: {
    width: "100%",
  },
}));

const TimeEntriesGroup = ({ title, entries }) => {
  const { classes } = useStyles();

  const items = entries.map((element) => (
    <TimeEntriesItem
      key={element.id}
      id={element.id}
      description={element.description}
      started_at={element.started_at}
      ended_at={element.ended_at}
      lasted_for={element.lasted_for}
      bpm={element.bpm}
    />
  ));
  return (
    <List
      listStyleType="none"
      classNames={{
        root: classes.root,
        itemWrapper: classes.itemWrapper,
      }}
    >
      <Title
        key={title}
        order={5}
        style={{
          paddingLeft: "1rem",
          paddingRight: "1rem",
          marginBottom: "0.4rem",
        }}
      >
        {title && dayjs(title).format("dddd, MMMM DD, YYYY")}
      </Title>
      {items}
    </List>
  );
};

export default TimeEntriesGroup;
