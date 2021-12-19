import React, { useRef } from "react";

const Synthesizer = () => {
  const audioContextRef = useRef(
    new (window.AudioContext || window.webkitAudioContext)()
  );
  const audioContext = audioContextRef.current;
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain(2);
  oscillator.start();
  oscillator.connect(gainNode);
  let active = false;

  const handleOscillation = (waveType, frequency) => {
    console.log(frequency);
    oscillator.frequency.value = frequency;
    oscillator.type = waveType;
    if (active === false) {
      gainNode.connect(audioContext.destination);
      active = true;
    } else {
      gainNode.disconnect(audioContext.destination);
      active = false;
    }
  };

  //   const createNoteTable = () => {
  let pitchArray = [
    "F",
    "F#/b",
    "G",
    "G#/b",
    "A",
    "A#/b",
    "B",
    "C",
    "C#/b",
    "D",
    "D#/b",
    "E",
    "F",
    "F#/b",
    "G",
    "G#/b",
    "A",
    "A#/b",
    "B",
    "C",
  ];

  let referenceFrequencyE2 = 82.41;
  let noteArray = [];
  let index = 1;
  for (let pitch of pitchArray) {
    let frequency = referenceFrequencyE2 * 2 ** (index / 12);
    index++;
    noteArray.push({ pitch, frequency });
  }
  //     return noteArray;
  //   };
  //   createNoteTable();

  return (
    <>
      {/* <label>
        Sine:
        <button onClick={() => handleOscillation("sine")}>Oscillate</button>
      </label>
      <label>
        Sawtooth:
        <button onClick={() => handleOscillation("sawtooth")}>Oscillate</button>
      </label>
      <label>
        Square:
        <button onClick={() => handleOscillation("square")}>Oscillate</button>
      </label>
      <label>
        Triangle:
        <button onClick={() => handleOscillation("triangle")}>Oscillate</button>
      </label> */}
      {noteArray.map((note, index) => (
        <button
          className={`${note.pitch.includes("#/b") ? "black" : "white"} key`}
          //   frequency={note.frequency}
          key={index}
          onClick={() => handleOscillation("sine", note.frequency)}
        >
          {note.pitch}
        </button>
      ))}
    </>
  );
};

export default Synthesizer;
