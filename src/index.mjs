export { default as chordMapping } from './chords/chord-mapping.mjs';
export { default as detectChords } from './chords/chords.mjs';
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
} from './chords/utils.mjs';

export { default as Scale } from './scales/scale.mjs';
export {
    addScaleToDb,
    getScaleByBase,
    getScaleByIntervals,
    getScaleByName,
    getScaleInfoByName,
    getScale,
    getScalesCount,
    getModesCount,
    getNamesList,
    prebuildCache
} from './scales/scale-db.mjs';
export {
    getScaleTransform,
    getNotesMapping,
    getNotesMappingFromIntervals,
    makeGetTransformedNotes,
} from './scales/remap.mjs';
export { default as generateScales } from './scales/combinations.mjs';
