import genScales from './combinations.js';
import Scale from './scale.js';

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const heptatonic = require('./heptatonic.json');
const hexatonic = require('./hexatonic.json');
const pentatonic = require('./pentatonic.json');

const cache = {};

const currentDB = {
    5: pentatonic,
    6: hexatonic,
    7: heptatonic,
};

export const addScaleToDb = (intervals, name) => {
    const {shift, baseIndex, tones} = getScaleByIntervals(intervals);
    const t = currentDB[tones];
    if (!t) currentDB[tones] = {};
    const b = currentDB[tones][baseIndex];
    if (!b) currentDB[tones][baseIndex] = {}
    currentDB[tones][baseIndex][shift] = name;
}

export const getNamesList = (tones) => {
    const namesDB = getNamesDB(tones);
    return Object.keys(namesDB)
        .reduce((acc, val) => {
            const modes = namesDB[val];
            acc.push(...Object.values(modes));
            return acc;
        }, [])
        .sort();
};

const getNamesDB = (tones) => {
    const db = currentDB[tones];
    if (!db) currentDB[tones] = {};
    return currentDB[tones];
};

const findNameInDB = (tones, index, shift) => {
    const namesDB = getNamesDB(tones);
    return namesDB?.[index]?.[shift];
}

export const getScalesCount = (tones, length) => getScalesFromCache(tones, length).length;

export const getModesCount = (tones, index, length) => getScale(tones, index, 0, length).generateIntervals().length;

const getScalesFromCache = (tones, length = 12) => {
    if (!cache[length]) cache[length] = {};
    if (!cache[length][tones]) cache[length][tones] = genScales(tones, length);

    return cache[length][tones];
};

export const getScale = (tones, index, shift, length) => {
    const base = getScalesFromCache(tones, length)[index];
    if (!base) return;

    return getScaleByBase(base, shift);
};

export const getScaleInfoByName = (name, tones) => {
    const namesDB = getNamesDB(tones);
    for (const index in namesDB) {
        const modes = namesDB[index];
        for (const shift in modes) {
            if (modes[shift] === name) return [tones, index, shift];
        }
    }
};

export const getScaleByName = (name, tones = 7) => {
    const info = getScaleInfoByName(name, tones);
    if (!info) return;
    return getScale(...info, 12);
};

export const getScaleByIntervals = (scale) => {
    if (!(scale instanceof Scale)) scale = new Scale({ intervals: scale });
    const { base, tones, shift, length } = scale;
    const scales = getScalesFromCache(tones, length);
    const index = scales.findIndex((scale) => Scale.compare(scale, base));

    scale.baseIndex = index;
    scale.name = findNameInDB(tones, index, shift);

    return scale;
};

export const getScaleByBase = (base, shift = 0) => {
    const scale = new Scale({ base, shift });
    const { tones, length } = scale;
    const scales = getScalesFromCache(tones, length);
    const index = scales.findIndex((scale) => Scale.compare(scale, base));

    scale.baseIndex = index;
    scale.name = findNameInDB(tones, index, shift);

    return scale;
};
