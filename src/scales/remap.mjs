import { isWhiteNote, notesPerOctave } from '../chords/utils.mjs';

export const getNotesMappingFromIntervals = (octave, intervals, isTargetNoteIncluded = isWhiteNote, octaveSize = notesPerOctave) => {
    const baseNote = octave * octaveSize;
    const minNote = 0;
    const maxNote = 127;
    const map = {};
    const intervalSum = intervals.reduce((sum, val) => sum + val, 0);
    if (intervalSum < octaveSize) {
        intervals.push(octaveSize - intervalSum);
    }
    const tones = intervals.length;
    map[baseNote] = baseNote;

    const fillMapDown = () => {
        let intervalIndex = tones - 1;
        let prevNote = baseNote;
        for (let i = baseNote - 1; i >= minNote; i--) {
            if (isTargetNoteIncluded(i)) {
                const shift = intervals[intervalIndex];
                const mappedValue = prevNote - shift;
                if (mappedValue < minNote) {
                    break;
                }
                map[i] = mappedValue;
                prevNote = mappedValue;
                intervalIndex = intervalIndex - 1 < 0 ? tones - 1 : intervalIndex - 1;
            }
        }
    };
    const fillMapUp = () => {
        let intervalIndex = 0;
        let nextNote = baseNote;
        for (let i = baseNote + 1; i <= maxNote; i++) {
            if (isTargetNoteIncluded(i)) {
                const shift = intervals[intervalIndex];
                const mappedValue = nextNote + shift;
                if (mappedValue > maxNote) {
                    break;
                }
                map[i] = mappedValue;
                nextNote = mappedValue;
                intervalIndex = intervalIndex + 1 > tones - 1 ? 0 : intervalIndex + 1;
            }
        }
    };
    fillMapDown();
    fillMapUp();
    return map;
};