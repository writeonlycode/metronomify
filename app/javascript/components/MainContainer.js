import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { MantineProvider } from "@mantine/styles";
import { Container } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

const queryClient = new QueryClient();

const MainContainer = ({ children }) => {
  return (
    <MantineProvider
      theme={{
        colorScheme: "dark",
        fontFamily: "sans-serif",
        fontSizes: { xl: 160 },
      }}
      withGlobalStyles
    >
      <NotificationsProvider position="top-center">
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
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </Container>
      </NotificationsProvider>
    </MantineProvider>
  );
};

export default MainContainer;
