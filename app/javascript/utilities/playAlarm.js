import * as Tone from "tone";

const playAlarm = () => {
  if (Tone.getContext().state === "suspended") {
    return;
  }

  const synth = new Tone.Synth().toDestination();
  const now = Tone.now();

  synth.triggerAttackRelease("C5", "8n", now);
  synth.triggerAttackRelease("C5", "8n", now + 0.25);
  synth.triggerAttackRelease("C5", "8n", now + 0.5);

  synth.triggerAttackRelease("C5", "8n", now + 2);
  synth.triggerAttackRelease("C5", "8n", now + 2.25);
  synth.triggerAttackRelease("C5", "8n", now + 2.5);

  synth.triggerAttackRelease("C5", "8n", now + 4);
  synth.triggerAttackRelease("C5", "8n", now + 4.25);
  synth.triggerAttackRelease("C5", "8n", now + 4.5);
};

export default playAlarm;
