import { useState, useEffect, useRef } from "react";

import Metronome from "../utilities/metronome";

function useMetronome({ bpm, beats, emphasis, muted, running }) {
  const [metronome, setMetronome] = useState(null);
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    setMetronome(new Metronome(bpm, beats, emphasis, (beat) => setBeat(beat)));
  }, []);

  useEffect(() => {
    metronome?.setBpm(bpm);
  }, [bpm]);

  useEffect(() => {
    metronome?.setBeats(beats);
  }, [beats]);

  useEffect(() => {
    metronome?.setEmphasis(emphasis);
  }, [emphasis]);

  useEffect(() => {
    if (muted) {
      metronome?.mute();
    } else {
      metronome?.unmute();
    }
  }, [muted]);

  useEffect(() => {
    if (running) {
      metronome?.start();
    } else {
      metronome?.stop();
    }
  }, [running]);

  return { beat };
}

export default useMetronome;
