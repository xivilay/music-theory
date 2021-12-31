const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export const notesPerOctave = notes.length;

export const getNoteIndex = (noteNum) => noteNum % notesPerOctave;

export const getNoteName = (noteNum) => {
    const noteIndex = getNoteIndex(noteNum);
    return notes[noteIndex];
};

export const getFullNoteName = (noteNum) => {
    const noteName = getNoteName(noteNum);
    const octave = Math.floor(noteNum / notesPerOctave) - 1;
    return noteName + octave;
};

export const isBlackNote = (noteNum) => [1, 3, 6, 8, 10].includes(getNoteIndex(noteNum));
