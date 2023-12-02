export { default as chordMapping } from './chords/chord-mapping.js';
export { default as detectChords } from './chords/chords.js';
export {
    notes,
    notesPerOctave,
    blackNotes,
    whiteNotes,
    isBlackNote,
    isWhiteNote,
    getFullNoteName,
    getNoteIndex,
    getNoteName,
} from './chords/utils.js';

export { default as Scale } from './scales/scale.js';
export {
    getScaleByBase,
    getScaleByIntervals,
    getScaleByName,
    getScaleInfoByName,
    getScale,
    getScalesCount,
    getModesCount,
    getNamesList,
} from './scales/scale-db.js';
export {
    getScaleTransform,
    getNotesMapping,
    getNotesMappingFromIntervals,
    makeGetTransformedNotes,
} from './scales/remap.js';
export { default as generateScales } from './scales/combinations.js';
