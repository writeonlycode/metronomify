import React from "react";
import { Drawer, Space, Title } from "@mantine/core";

import TimeEntries from "./TimeEntries";
import TimeEntriesCreate from "./TimeEntriesCreate";

const DrawerDashboard = ({ opened, setOpened }) => {
  return (
    <Drawer
      opened={opened}
      onClose={() => setOpened(false)}
      title={<Title>Dashboard</Title>}
      padding="xl"
      size="full"
      position="right"
      transitionDuration={500}
      styles={{ drawer: { overflowY: "scroll" } }}
    >
      <TimeEntriesCreate />
      <Space h="lg" />
      <TimeEntries />
    </Drawer>
  );
};

export default DrawerDashboard;
