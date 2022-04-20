import React from "react";

import { MantineProvider } from "@mantine/styles";
import { Container } from "@mantine/core";
import {NotificationsProvider} from "@mantine/notifications";

const MainContainer = ({ children }) => {
  return (
    <MantineProvider
      theme={{
        colorScheme: "dark",
        fontFamily: "sans-serif",
        fontSizes: { xs: 2, sm: 16, md: 32, xl: 160 },
      }}
      withGlobalStyles
    >
      <NotificationsProvider
        position="top-center"
      >
        <Container
          size="sm"
          px="xl"
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {children}
        </Container>
      </NotificationsProvider>
    </MantineProvider>
  );
};

export default MainContainer;
