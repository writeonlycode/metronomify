import * as Tone from "tone";

class Metronome {
  constructor(bpm, beats, emphasis, callback) {
    this.beats = beats;
    this.emphasis = emphasis;

    this.running = false;
    this.muted = false;

    this.beat = 1;
    this.callback = callback;

    const initializeTone = async () => {
      document.removeEventListener("click", initializeTone);
      document.removeEventListener("keydown", initializeTone);

      await Tone.start();
      console.log("AudioContext has been started!");

      Tone.Transport.bpm.value = bpm;

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
        this.beat = (this.beat % this.beats) + 1;

        if (this.beat === 1 && this.emphasis) {
          this.toneSynth.triggerAttackRelease(220, "8n", time);
        } else {
          this.toneSynth.triggerAttackRelease(440, "8n", time);
        }

        this.callback(this.beat);
      }, "4n").start(0);
    };

    // Create an one-off event handler that starts AudioContext
    document.addEventListener("click", initializeTone, { once: true });
    document.addEventListener("keydown", initializeTone, { once: true });

  }

  async start() {
    if (Tone.getContext().state === 'suspended') {
      await Tone.start();
    }
    this.beat = 0;
    this.running = true;
    this.callback(this.beat);
    Tone.Transport.start();
  }

  async stop() {
    if (Tone.getContext().state === 'suspended') {
      await Tone.start();
    }
    this.beat = 0;
    this.running = false;
    this.callback(this.beat);
    Tone.Transport.stop();
  }

  async mute() {
    if (Tone.getContext().state === 'suspended') {
      await Tone.start();
    }
    this.toneVolume.mute = true;
  }

  async unmute() {
    if (Tone.getContext().state === 'suspended') {
      await Tone.start();
    }
    this.toneVolume.mute = false;
  }

  async increaseBpm() {
    if (Tone.getContext().state === 'suspended') {
      await Tone.start();
    }
    Tone.Transport.bpm.value++;
  }

  async decreaseBpm() {
    if (Tone.getContext().state === 'suspended') {
      await Tone.start();
    }
    Tone.Transport.bpm.value--;
  }

  setBpm(bpm) {
    Tone.Transport.bpm.value = bpm;
  }

  setEmphasis(emphasis) {
    this.emphasis = emphasis;
  }

  increaseBeats() {
    this.beats++;
  }

  decreaseBeats() {
    this.beats--;
  }

  setBeats(value) {
    this.beats = value;
  }
}

export default Metronome;
