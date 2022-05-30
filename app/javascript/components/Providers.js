import React, {createContext, useState} from "react";

import { QueryClient, QueryClientProvider } from "react-query";

import { Container } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider } from "@mantine/styles";
import { ModalsProvider } from "@mantine/modals";

import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration);

export const SettingsApplicationContext = createContext();
export const SettingsMetronomeContext = createContext();
export const SettingsPomodoroContext = createContext();

const queryClient = new QueryClient();

const Providers = ({ children }) => {
  const [dashboardOpened, setDashboardOpened] = useState(false);

  const [settingsMetronome, setSettingsMetronome] = useState({ bpm: 60, beats: 4, emphasis: true, muted: false, running: false });
  const [settingsPomodoro, setSettingsPomodoro] = useState({ duration: dayjs.duration(3000), enabled: true });

  const theme = {
    colorScheme: "dark",
    fontFamily: "Open Sans",
    fontSizes: { xl: 160 },
    colors: {
      // One Dark Theme: https://github.com/joshdick/onedark.vim
      // Generated With: https://omatsuri.app/color-shades-generator, 5% Darker/Lighten, -10% Saturation Shift
      dark: [ "#CDD0D6", "#B6BCC6", "#abb2bf", "#5c6370", "#36393F", "#2B2E36", "#282C34", "#272A31", "#25282E", "#24262B" ],
      red: [ "#EAD3D5", "#E4C3C6", "#E1B3B7", "#DEA2A7", "#DD9197", "#DE7F86", "#E06C75", "#D7656D", "#CD5E67", "#C45961" ],
      green: [ "#D2DDCB", "#C8D6BE", "#BDD0B0", "#B4CBA3", "#AAC795", "#A1C487", "#98C379", "#90BA72", "#89B16C", "#708C5D" ],
      yellow: [ "#F3EEE5", "#EDE4D5", "#E8DBC4", "#E5D3B3", "#E3CCA1", "#E3C68E", "#E5C07B", "#DCB772", "#D3AF6B", "#CAA664" ],
      blue: [ "#D4E2EE", "#C3D8EA", "#B1CFE7", "#9EC6E6", "#8BBEE7", "#77B6EA", "#61AFEF", "#5AA7E6", "#539EDC", "#4E97D2" ],
      grape: [ "#E9DCED", "#E1CCE7", "#D9BDE2", "#D3ACDE", "#CE9CDC", "#C98ADC", "#C678DD", "#BD70D4", "#B569CB", "#AC63C2" ],
      cyan: [ "#ABC9CC", "#9EC3C8", "#90BEC4", "#82BBC2", "#74B8C1", "#65B6C1", "#56B6C2", "#51ADB9", "#4EA4AE", "#4F98A1" ],
      // gray: [ "#F2F2F3", "#E5E6E9", "#D9DBDF", "#CDD0D6", "#C1C6CE", "#B6BCC6", "#ABB2BF", "#A2A9B6", "#99A0AD", "#9198A5" ],
    },
    primaryColor: "blue",
  };

  return (
    <SettingsApplicationContext.Provider value={{dashboardOpened, setDashboardOpened}}>
    <SettingsMetronomeContext.Provider value={[settingsMetronome, setSettingsMetronome]}>
    <SettingsPomodoroContext.Provider value={[settingsPomodoro, setSettingsPomodoro]}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme} withGlobalStyles>
          <NotificationsProvider position="top-center">
            <ModalsProvider>
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
            </ModalsProvider>
          </NotificationsProvider>
        </MantineProvider>
      </QueryClientProvider>
    </SettingsPomodoroContext.Provider>
    </SettingsMetronomeContext.Provider>
    </SettingsApplicationContext.Provider>
  );
};

export default Providers;
