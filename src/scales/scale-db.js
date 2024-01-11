import genScales from './combinations.js';
import Scale from './scale.js';

import { scales } from './known-scales.js';

import cache from 'cache';
import names from 'names';

const db = { names, cache };

export const prebuildCache = () => {
    const keysCount = 12;
    for (let i = 1; i <= keysCount; i++) {
        getScalesFromCache(i, keysCount);
    }

    Object.entries(scales).forEach(([k, v]) => {
        addScaleToDb(k.split(' '), v);
    });

    return db;
};

export const addScaleToDb = (intervals, name) => {
    const { shift, baseIndex, tones } = getScaleByIntervals(intervals);
    const t = db.names[tones];
    if (!t) db.names[tones] = {};
    const b = db.names[tones][baseIndex];
    if (!b) db.names[tones][baseIndex] = {};
    db.names[tones][baseIndex][shift] = name;
};

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
    if (!db.names[tones]) db.names[tones] = {};
    return db.names[tones];
};

const findNameInDB = (tones, index, shift) => {
    const namesDB = getNamesDB(tones);
    return namesDB?.[index]?.[shift];
};

export const getScalesCount = (tones, length) => getScalesFromCache(tones, length).length;

export const getModesCount = (tones, index, length) => getScale(tones, index, 0, length).generateIntervals().length;

const getScalesFromCache = (tones, length = 12) => {
    if (!db.cache[length]) db.cache[length] = {};
    if (!db.cache[length][tones]) db.cache[length][tones] = genScales(tones, length);

    return db.cache[length][tones];
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
