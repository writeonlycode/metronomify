import React from "react";

import {MantineProvider} from "@mantine/styles";
import {Container} from "@mantine/core";

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
    </MantineProvider>
  );
};

export default MainContainer;
