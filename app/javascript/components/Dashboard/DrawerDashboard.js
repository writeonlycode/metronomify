import React from "react";
import { Drawer, Modal, Paper, ScrollArea, Space, Title } from "@mantine/core";
import TimeEntriesIndex from "../TimeEntries/TimeEntriesIndex";
import TimeEntriesCreate from "../TimeEntries/TimeEntriesCreate";

const DrawerDashboard = ({ opened, setOpened }) => {
  return (
    <Drawer
      opened={opened}
      onClose={() => setOpened(false)}
      title={<Title>Time Entries Index</Title>}
      padding="xl"
      size="full"
      position="right"
      transitionDuration={500}
      styles={{ drawer: { overflowY: "scroll" } }}
    >
      <TimeEntriesCreate />
      <Space h="lg" />
      <TimeEntriesIndex />
    </Drawer>
  );
};

export default DrawerDashboard;
