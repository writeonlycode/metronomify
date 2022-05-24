import React from "react";

import { Affix } from "@mantine/core";

import UserButton from "../Users/UserButton";
import SettingsButton from "../SettingsButton";
import CopyButton from "../CopyButton";
import ButtonMuteMetronome from "../ButtonMuteMetronome";

const MenuMain = ({ setSettingsOpened, bpm, muted, setMuted }) => {
  return (
    <Affix
      position={{ top: 32, right: 32 }}
      style={{ display: "flex", flexDirection: "column", gap: "8px" }}
    >
      <UserButton />
      <SettingsButton onClick={() => setSettingsOpened(true)} />
      <CopyButton bpm={bpm} />
      <ButtonMuteMetronome muted={muted} setMuted={setMuted} />
    </Affix>
  );
};

export default MenuMain;
