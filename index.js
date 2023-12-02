export { default as chordMapping } from './chords/chord-mapping';
export { default as detectChords } from './chords/chords';
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
} from './chords/utils';

export { default as Scale } from './scales/scale';
export {
    getScaleByBase,
    getScaleByIntervals,
    getScaleByName,
    getScaleInfoByName,
    getScale,
    getScalesFromCache,
    getScalesCount,
    getModesCount,
    getNamesList,
} from './scales/scale-db';
export {
    getScaleTransform,
    getNotesMapping,
    getNotesMappingFromIntervals,
    makeGetTransformedNotes,
} from './scales/remap';
export { default as generateScales } from './scales/combinations';
