// [1, 3, 2, 1, 2, 1, 2] => [1, 2, 1, 2, 1, 3, 2]
const getBaseInterval = (intervals) =>
    Scale.fromNumber(
        intervals.reduce(
            (acc) => {
                let { cycle, min } = acc;
                const current = Scale.toNumber(cycle);
                min = Math.min(min, current);
                next(cycle);
                return { cycle, min };
            },
            { cycle: [...intervals], min: Infinity }
        ).min
    );

// generates matrix of permutations
const generateIntervals = (intervals) => {
    const set = new Set();
    return intervals
        .reduce(
            (acc) => {
                const str = Scale.toString(acc.intervals);
                if (!set.has(str)) {
                    set.add(str);
                    acc.cycle.push(str);
                }
                acc.intervals = next(acc.intervals);
                return acc;
            },
            { cycle: [], intervals }
        )
        .cycle.map(Scale.fromString);
};

const getIntervalByIndex = (intervals, index) => intervals[index];

const next = (cycle) => {
    const first = cycle.shift();
    cycle.push(first);
    return cycle;
};

// { name: "Romanian Major", intervals: [1, 3, 2, 1, 2, 1, 2] }
class Scale {
    constructor({ name, intervals, base, shift }) {
        // "Romanian Major"
        this.name = name;
        if (intervals) {
            // [1, 2, 1, 2, 1, 3, 2]
            this.base = getBaseInterval(intervals);
            // 4
            this.shift = this.getShift(intervals);
            // [1, 3, 2, 1, 2, 1, 2]
            this.intervals = [...intervals];
        } else if (base) {
            this.base = base;
            this.shift = shift;
            this.intervals = this.getIntervalByIndex(shift);
        }
    }

    get tones() {
        return this.base.length;
    }

    get length() {
        return Scale.getSum(this.base);
    }

    static toNumber = (intervals) => parseInt(intervals.join(''));
    static fromNumber = (num) => num.toString().split('');
    static fromString = (str) => str.split(',');
    static toString = (intervals) => intervals.join(',');
    static compare = (intervals1, intervals2) => Scale.toString(intervals1) == Scale.toString(intervals2);
    static getSum = (scale) => scale.reduce((acc, val) => parseInt(val) + acc, 0);
    getShift = (intervals) => this.generateIntervals().findIndex((cycle) => Scale.compare(cycle, intervals));
    generateIntervals = () => generateIntervals(this.base);
    getIntervalByIndex = (i) => getIntervalByIndex(this.generateIntervals(), i);
}

module.exports = Scale;
