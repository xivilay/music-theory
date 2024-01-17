import { default as Scale, getBaseInterval, generateIntervals } from '../../scales/scale.mjs';

describe('scale', () => {
    describe('getBaseInterval', () => {
        it('should get correct base from given intervals', () => {
            expect(getBaseInterval([1, 3, 2, 1, 2, 1, 2])).toEqual([1, 2, 1, 2, 1, 3, 2]);
        });
    });

    describe('generateIntervals', () => {
        describe('12 equal temperament scales', () => {
            it('should get all possible intervals (modes) from intervals (scale) for 7-tonic', () => {
                expect(generateIntervals([1, 3, 2, 1, 2, 1, 2])).toEqual([
                    ['1', '3', '2', '1', '2', '1', '2'],
                    ['3', '2', '1', '2', '1', '2', '1'],
                    ['2', '1', '2', '1', '2', '1', '3'],
                    ['1', '2', '1', '2', '1', '3', '2'],
                    ['2', '1', '2', '1', '3', '2', '1'],
                    ['1', '2', '1', '3', '2', '1', '2'],
                    ['2', '1', '3', '2', '1', '2', '1'],
                ]);
            });

            it('should work with pentatonic intervals', () => {
                expect(generateIntervals([2, 1, 4, 2, 3])).toEqual([
                    ['2', '1', '4', '2', '3'],
                    ['1', '4', '2', '3', '2'],
                    ['4', '2', '3', '2', '1'],
                    ['2', '3', '2', '1', '4'],
                    ['3', '2', '1', '4', '2'],
                ]);
            });

            describe('cutting repeating intervals', () => {
                it('should result in just 4 repeating intervals', () => {
                    expect(generateIntervals([1, 1, 1, 3, 1, 1, 1, 3])).toEqual([
                        ['1', '1', '1', '3', '1', '1', '1', '3'],
                        ['1', '1', '3', '1', '1', '1', '3', '1'],
                        ['1', '3', '1', '1', '1', '3', '1', '1'],
                        ['3', '1', '1', '1', '3', '1', '1', '1'],
                    ]);
                });

                it('should result in just 3 repeating intervals', () => {
                    expect(generateIntervals([1, 1, 2, 1, 1, 2, 1, 1, 2])).toEqual([
                        ['1', '1', '2', '1', '1', '2', '1', '1', '2'],
                        ['1', '2', '1', '1', '2', '1', '1', '2', '1'],
                        ['2', '1', '1', '2', '1', '1', '2', '1', '1'],
                    ]);
                });

                it('should result in the same interval', () => {
                    expect(generateIntervals([1, 1, 2, 1, 1, 2, 1, 1, 2])).toEqual([
                        ['1', '1', '2', '1', '1', '2', '1', '1', '2'],
                        ['1', '2', '1', '1', '2', '1', '1', '2', '1'],
                        ['2', '1', '1', '2', '1', '1', '2', '1', '1'],
                    ]);
                });

                it('should result in the same interval', () => {
                    expect(generateIntervals([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])).toEqual([
                        ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
                    ]);
                    expect(generateIntervals([2, 2, 2, 2, 2, 2])).toEqual([['2', '2', '2', '2', '2', '2']]);
                    expect(generateIntervals([3, 3, 3, 3])).toEqual([['3', '3', '3', '3']]);
                    expect(generateIntervals([4, 4, 4])).toEqual([['4', '4', '4']]);
                    expect(generateIntervals([6, 6])).toEqual([['6', '6']]);
                    expect(generateIntervals([12])).toEqual([['12']]);
                });
            });
        });
    });

    describe('Scale class', () => {
        let scale = null;
        beforeEach(() => {
            scale = new Scale({ name: 'Romanian Major', intervals: [1, 3, 2, 1, 2, 1, 2] });
        });

        afterEach(() => {
            scale = null;
        });

        describe('instance properties', () => {
            it('should set the name', () => {
                expect(scale.name).toEqual('Romanian Major');
            });

            it('should have correct base (primary mode)', () => {
                expect(scale.base).toEqual([1, 2, 1, 2, 1, 3, 2]);
            });

            it('should consistent shift (relative mode number)', () => {
                expect(scale.shift).toEqual(4);
            });

            it('should contain own interval', () => {
                expect(scale.intervals).toEqual([1, 3, 2, 1, 2, 1, 2]);
            });

            it('should contain indication of heptatonic family', () => {
                expect(scale.tones).toEqual(7);
            });
            it('should contain indication of temperament', () => {
                expect(scale.length).toEqual(12);
            });

            describe('instance creation based on known base and shift', () => {
                let scaleClone = null;

                beforeEach(() => {
                    scaleClone = new Scale({ name: 'Romanian Major', base: [1, 2, 1, 2, 1, 3, 2], shift: 4 });
                });

                afterEach(() => {
                    scaleClone = null;
                });

                it('should have exact properties as in original scale', () => {
                    expect(scale.name).toEqual(scaleClone.name);
                    expect(scale.base).toEqual(scaleClone.base);
                    expect(scale.shift).toEqual(scaleClone.shift);
                    // expect(scale.intervals).toEqual(scaleClone.intervals); // FIXME
                    expect(scale.tones).toEqual(scaleClone.tones);
                    expect(scale.length).toEqual(scaleClone.length);
                });
            });
        });

        describe('instance methods', () => {
            describe('getShift', () => {
                it('should get correct shift for itself', () => {
                    expect(scale.getShift([1, 3, 2, 1, 2, 1, 2])).toEqual(scale.shift);
                });

                it('should get correct shift for other modes', () => {
                    expect(scale.getShift(['1', '2', '1', '2', '1', '3', '2'])).toEqual(0);
                    expect(scale.getShift(['2', '1', '2', '1', '3', '2', '1'])).toEqual(1);
                    expect(scale.getShift(['1', '2', '1', '3', '2', '1', '2'])).toEqual(2);
                    expect(scale.getShift(['2', '1', '3', '2', '1', '2', '1'])).toEqual(3);
                    expect(scale.getShift(['1', '3', '2', '1', '2', '1', '2'])).toEqual(4);
                    expect(scale.getShift(['3', '2', '1', '2', '1', '2', '1'])).toEqual(5);
                    expect(scale.getShift(['2', '1', '2', '1', '2', '1', '3'])).toEqual(6);
                });

                it('should return -1 (not found) shift for mode from other group (Minor)', () => {
                    expect(scale.getShift(['2', '1', '2', '2', '1', '2', '2'])).toEqual(-1);
                });
            });

            it('should get expected outputs from getIntervalByIndex()', () => {
                expect(scale.getIntervalByIndex(0)).toEqual(['1', '2', '1', '2', '1', '3', '2']);
                expect(scale.getIntervalByIndex(1)).toEqual(['2', '1', '2', '1', '3', '2', '1']);
                expect(scale.getIntervalByIndex(2)).toEqual(['1', '2', '1', '3', '2', '1', '2']);
                expect(scale.getIntervalByIndex(3)).toEqual(['2', '1', '3', '2', '1', '2', '1']);
                expect(scale.getIntervalByIndex(4)).toEqual(['1', '3', '2', '1', '2', '1', '2']);
                expect(scale.getIntervalByIndex(5)).toEqual(['3', '2', '1', '2', '1', '2', '1']);
                expect(scale.getIntervalByIndex(6)).toEqual(['2', '1', '2', '1', '2', '1', '3']);
            });

            it('should get expected output from generateIntervals()', () => {
                expect(scale.generateIntervals()).toEqual([
                    ['1', '2', '1', '2', '1', '3', '2'],
                    ['2', '1', '2', '1', '3', '2', '1'],
                    ['1', '2', '1', '3', '2', '1', '2'],
                    ['2', '1', '3', '2', '1', '2', '1'],
                    ['1', '3', '2', '1', '2', '1', '2'],
                    ['3', '2', '1', '2', '1', '2', '1'],
                    ['2', '1', '2', '1', '2', '1', '3'],
                ]);
            });
        });

        describe('static methods', () => {
            it('toNumber should return consistent unique id', () => {
                expect(Scale.toNumber(scale.intervals)).toEqual(20058642);
            });

            it('fromNumber should restore intervals from id', () => {
                expect(Scale.fromNumber(20058642)).toEqual(scale.intervals);
            });

            it('toString should return consistent readable string id', () => {
                expect(Scale.toString(scale.intervals)).toEqual('1,3,2,1,2,1,2');
            });

            it('fromString  should restore intervals from string id', () => {
                expect(Scale.fromString('1,3,2,1,2,1,2')).toEqual(['1', '3', '2', '1', '2', '1', '2']);
            });

            it('compare same intervals regardless of type', () => {
                expect(Scale.compare(scale.intervals, [1, 3, 2, 1, 2, 1, 2])).toBe(true);
                expect(Scale.compare(scale.intervals, ['1', '3', '2', '1', '2', '1', '2'])).toBe(true);
            });

            it('getSum should return sum of intervals (12 for 12 Equal temperament)', () => {
                expect(Scale.getSum(scale.intervals)).toBe(12);
            });
        });
    });
});
