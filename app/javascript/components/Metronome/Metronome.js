import * as Tone from "tone";

class Metronome {
  constructor(bpm, beatsPerBar, stressFirstBeat, beatCallback) {
    this.bpm = bpm;
    this.beatsPerBar = beatsPerBar;
    this.stressFirstBeat = stressFirstBeat;

    this.isRunning = false;
    this.muted = false;

    this.currentBeat = 1;
    this.beatCallback = beatCallback;

    this.toneVolume = new Tone.Volume(20).toDestination();
    this.toneSynth = new Tone.Synth({
      oscillator: {
        type: "triangle",
      },
      envelope: {
        attack: 0,
        decay: 0.1,
        sustain: 0,
        release: 0.1,
      },
    }).connect(this.toneVolume);

    this.toneLoop = new Tone.Loop((time) => {
      if (this.currentBeat === 1 && this.stressFirstBeat) {
        this.toneSynth.triggerAttackRelease(220, "8n", time);
      } else {
        this.toneSynth.triggerAttackRelease(440, "8n", time);
      }

      this.beatCallback(this.currentBeat);

      this.currentBeat < this.beatsPerBar
        ? this.currentBeat++
        : (this.currentBeat = 1);
    }, "4n").start(0);

    Tone.Transport.bpm.value = this.bpm;

    // Create an one-off event handler that starts AudioContext
    document.addEventListener(
      "click",
      async () => {
        await Tone.start();
        await console.log("AudioContext has been started!");
      },
      { once: true }
    );
  }

  start() {
    this.currentBeat = 1;
    this.isRunning = true;
    Tone.Transport.start();
  }

  stop() {
    this.currentBeat = 1;
    this.isRunning = false;
    Tone.Transport.stop();
  }

  mute() {
    this.toneVolume.mute = true;
  }

  unmute() {
    this.toneVolume.mute = false;
  }

  increaseBpm() {
    if (this.bpm < 240) {
      this.bpm++;
      Tone.Transport.bpm.value = this.bpm;
    }
  }

  decreaseBpm() {
    if (this.bpm > 20) {
      this.bpm--;
      Tone.Transport.bpm.value = this.bpm;
    }
  }

  setBpm(bpm) {
    if (20 <= bpm && bpm <= 240) {
      this.bpm = bpm;
      Tone.Transport.bpm.value = this.bpm;
    }
  }

  setStress(stress) {
    this.stressFirstBeat = stress;
  }

  increaseBeatsPerBar() {
    if (this.beatsPerBar < 16) {
      this.beatsPerBar++;
    }
  }

  decreaseBeatsPerBar() {
    if (this.beatsPerBar > 2) {
      this.beatsPerBar--;
    }
  }

  setBeatsPerBar(num) {
    if (2 <= num && num <= 16) {
      this.beatsPerBar = num;
    }
  }
}

export default Metronome;
