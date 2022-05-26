import { useHotkeys } from "@mantine/hooks";

const useCustomHotkeys = (setSettingsMetronome, setSettingsPomodoro) => {
  useHotkeys([
    ['ArrowRight', () => setSettingsMetronome((prevValue) => ({...prevValue, bpm: prevValue.bpm + 1}))],
    ['ArrowLeft', () => setSettingsMetronome((prevValue) => ({...prevValue, bpm: prevValue.bpm - 1}))],
    ['PageUp', () => setSettingsMetronome((prevValue) => ({...prevValue, bpm: prevValue.bpm + 10}))],
    ['PageDown', () => setSettingsMetronome((prevValue) => ({...prevValue, bpm: prevValue.bpm - 10}))],
    ['Space', () => setSettingsMetronome((prevValue) => ({...prevValue, running: !prevValue.running}))],
    ['M', () => setSettingsMetronome((prevValue) => ({...prevValue, muted: !prevValue.muted}))],
  ]);
}

export default useCustomHotkeys;
