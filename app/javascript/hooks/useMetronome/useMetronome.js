import { useState, useEffect } from 'react';
import Metronome from "../../components/Metronome/Metronome"

function useMetronome({ bpm, beats, emphasis }) {
  const [metronome, setMetronome] = useState(null);

  const [_bpm, setBpm] = useState(60);
  const [_beats, setBeats] = useState(4);
  const [_beat, setBeat] = useState(1);
  const [_emphasis, setEmphasis] = useState(true)

  useEffect( () => {
    setMetronome(new Metronome(bpm && 60, beats && 4, emphasis && true, (beat) => setBeat(beat)));
  }, [])

  useEffect( () => {
    metronome?.setBpm(_bpm);
  }, [_bpm] )

  useEffect( () => {
    metronome?.setBeatsPerBar(_beats);
  }, [_beats] )

  useEffect( () => {
    metronome?.setStress(_emphasis);
  }, [_emphasis] )

  const start = () => {
    metronome?.start()
  }

  const stop = () => {
    metronome?.stop()
  }

  return {start, stop, bpm: _bpm, setBpm, beat: _beat, setBeat, beats: _beats, setBeats, emphasis: _emphasis, setEmphasis};
}

export default useMetronome;
