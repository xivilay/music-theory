import chordMapping from './chord-mapping';
import { getNoteIndex, getNoteName, notesPerOctave } from './utils';

const getIntervals = (noteNums) =>
    [...new Set(noteNums.map(getNoteIndex).sort((a, b) => a - b))].map((val, i, arr) => {
        const nextIndex = i + 1;
        const lastIndex = arr.length - 1;
        let interval;
        if (i === lastIndex) {
            interval = arr[0] + notesPerOctave - val;
        } else {
            interval = arr[nextIndex] - val;
        }
        return { note: val, interval };
    });

const isCyclicEqual = (a, b) => {
    if (a.length !== b.length) return;

    const bStartingIndexes = [];
    let i = 0;
    const getStartingIndex = (i) => b.indexOf(a[0], i);
    while (getStartingIndex(i) >= 0) {
        const index = getStartingIndex(i);
        bStartingIndexes.push(index);
        i = index + 1;
    }

    if (!bStartingIndexes.length) return;

    const isEqualForStartingIndex = (startingIndex) => {
        let bIndex = -1;
        for (let i = 0; i < a.length; i++) {
            const aVal = a[i];
            if (bIndex === -1) {
                bIndex = startingIndex;
            } else {
                if (bIndex === b.length) bIndex = 0;
                if (aVal !== b[bIndex]) return false;
            }
            bIndex++;
        }
        return true;
    };

    return bStartingIndexes.find(isEqualForStartingIndex);
};

export const detectChords = (notes) => {
    const intervals = getIntervals(notes);
    const interval = intervals.map((i) => i.interval);
    const intervalNotes = intervals.map((i) => i.note);
    const startPoints = chordMapping.map((c) => isCyclicEqual(c.intervals, interval));
    const filtered = chordMapping.filter((c, i) => startPoints[i] != undefined);
    const mapped = filtered.map((val) => {
        const index = chordMapping.indexOf(val);
        const startPoint = startPoints[index];
        const note = getNoteName(intervalNotes[startPoint]);
        const { postfix } = val;
        return note + postfix;
    });
    return mapped;
};

export default detectChords;