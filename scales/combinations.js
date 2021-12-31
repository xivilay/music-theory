const Scale = require('./scale');

const getNums = (sum, next) => {
    const min = 1;
    const nums = [];
    for (let n = min; n < sum; n++) {
        nums.push(...next(n));
    }
    return nums;
};

// x > 0
// const n = 3;
// const k = 6;
/*
   [[1,1,4], [1,2,3], [1,3,2]
    [1,4,1], [2,1,3], [2,3,1]
    [3,1,2], [3,2,1], [4,1,1]]
*/
const genPermutations = (num, sum) => {
    if (num === 1) return [[sum]];
    if (num > 2) {
        return getNums(sum, (n) => genPermutations(num - 1, sum - n).map((g) => [n, ...g]));
    }
    return getNums(sum, (n) => [[n, sum - n]]);
};

const genScales = (tonics, temperament) => {
    const set = new Set();
    return genPermutations(tonics, temperament).filter(intervals => {
        const scale = new Scale({intervals});
        const uniq = Scale.toString(scale.base);
        if (set.has(uniq)) return false;
        set.add(uniq);
        return true;
    }).reverse();
}


module.exports = genScales;