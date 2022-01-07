export const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
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

export const blackNotes = notes.map((note, i) => note.includes("#") && i).filter(i => i !== false);
export const whiteNotes = notes.map((note, i) => !note.includes("#") && i).filter(i => i !== false);

export const isBlackNote = (noteNum) => blackNotes.includes(getNoteIndex(noteNum));
export const isWhiteNote = (noteNum) => whiteNotes.includes(getNoteIndex(noteNum));
