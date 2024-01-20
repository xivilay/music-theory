import { getNotesMappingFromIntervals } from '../../scales/remap.mjs';

describe('getNotesMappingFromIntervals', function () {
    const defaultOctaveSize = 12;
    const defaultOctaveOffset = 4;
    let minorScale5Intervals;
    let minorScale6Intervals;
    let minorScale7Intervals;
    let majorScale7Intervals;

    beforeEach(() => {
        minorScale5Intervals = [3, 2, 2, 3, 2];
        minorScale6Intervals = [2, 1, 2, 2, 3, 2];
        minorScale7Intervals = [2, 1, 2, 2, 1, 2, 2];
        majorScale7Intervals = [2, 2, 1, 2, 2, 2, 1];
    });

    it('should create correct map for normal 12key kbd and standard 12elt scale (7 Minor)', function () {
        const map = getNotesMappingFromIntervals(defaultOctaveOffset, minorScale7Intervals);
        expect(map).toEqual({
            0: 0,
            2: 2,
            4: 3,
            5: 5,
            7: 7,
            9: 8,
            11: 10,
            12: 12,
            14: 14,
            16: 15,
            17: 17,
            19: 19,
            21: 20,
            23: 22,
            24: 24,
            26: 26,
            28: 27,
            29: 29,
            31: 31,
            33: 32,
            35: 34,
            36: 36,
            38: 38,
            40: 39,
            41: 41,
            43: 43,
            45: 44,
            47: 46,
            48: 48, // center
            50: 50,
            52: 51,
            53: 53,
            55: 55,
            57: 56,
            59: 58,
            60: 60,
            62: 62,
            64: 63,
            65: 65,
            67: 67,
            69: 68,
            71: 70,
            72: 72,
            74: 74,
            76: 75,
            77: 77,
            79: 79,
            81: 80,
            83: 82,
            84: 84,
            86: 86,
            88: 87,
            89: 89,
            91: 91,
            93: 92,
            95: 94,
            96: 96,
            98: 98,
            100: 99,
            101: 101,
            103: 103,
            105: 104,
            107: 106,
            108: 108,
            110: 110,
            112: 111,
            113: 113,
            115: 115,
            117: 116,
            119: 118,
            120: 120,
            122: 122,
            124: 123,
            125: 125,
            127: 127,
        });
    });

    it('should output same white keys for normal 12key kbd and standard 12elt scale (7 Major)', function () {
        const map = getNotesMappingFromIntervals(defaultOctaveOffset, majorScale7Intervals);
        Object.entries(map).forEach(([k, v]) => expect(parseInt(k)).toBe(v));
    });

    it('should create correct map for scale containing less notes than standard kbd (6 Minor)', function () {
        const map = getNotesMappingFromIntervals(defaultOctaveOffset, minorScale6Intervals);
        expect(map).toEqual({
            7: 0,
            9: 2,
            11: 3,
            12: 5,
            14: 7,
            16: 10,
            17: 12,
            19: 14,
            21: 15,
            23: 17,
            24: 19,
            26: 22,
            28: 24,
            29: 26,
            31: 27,
            33: 29,
            35: 31,
            36: 34,
            38: 36,
            40: 38,
            41: 39,
            43: 41,
            45: 43,
            47: 46,
            48: 48, // center
            50: 50,
            52: 51,
            53: 53,
            55: 55,
            57: 58,
            59: 60,
            60: 62,
            62: 63,
            64: 65,
            65: 67,
            67: 70,
            69: 72,
            71: 74,
            72: 75,
            74: 77,
            76: 79,
            77: 82,
            79: 84,
            81: 86,
            83: 87,
            84: 89,
            86: 91,
            88: 94,
            89: 96,
            91: 98,
            93: 99,
            95: 101,
            96: 103,
            98: 106,
            100: 108,
            101: 110,
            103: 111,
            105: 113,
            107: 115,
            108: 118,
            110: 120,
            112: 122,
            113: 123,
            115: 125,
            117: 127,
        });
    });

    it('should create correct map for scale containing less notes than standard kbd (5 Minor)', function () {
        const map = getNotesMappingFromIntervals(defaultOctaveOffset, minorScale5Intervals);
        expect(map).toEqual({
            14: 0,
            16: 3,
            17: 5,
            19: 7,
            21: 10,
            23: 12,
            24: 15,
            26: 17,
            28: 19,
            29: 22,
            31: 24,
            33: 27,
            35: 29,
            36: 31,
            38: 34,
            40: 36,
            41: 39,
            43: 41,
            45: 43,
            47: 46,
            48: 48, // center
            50: 51,
            52: 53,
            53: 55,
            55: 58,
            57: 60,
            59: 63,
            60: 65,
            62: 67,
            64: 70,
            65: 72,
            67: 75,
            69: 77,
            71: 79,
            72: 82,
            74: 84,
            76: 87,
            77: 89,
            79: 91,
            81: 94,
            83: 96,
            84: 99,
            86: 101,
            88: 103,
            89: 106,
            91: 108,
            93: 111,
            95: 113,
            96: 115,
            98: 118,
            100: 120,
            101: 123,
            103: 125,
            105: 127,
        });
    });

    it('should create correct map for scale containing less notes than standard kbd (4 dim7)', function () {
        const map = getNotesMappingFromIntervals(defaultOctaveOffset, [3, 3, 3, 3]);
        expect(map).toEqual({
            21: 0,
            23: 3,
            24: 6,
            26: 9,
            28: 12,
            29: 15,
            31: 18,
            33: 21,
            35: 24,
            36: 27,
            38: 30,
            40: 33,
            41: 36,
            43: 39,
            45: 42,
            47: 45,
            48: 48, // center
            50: 51,
            52: 54,
            53: 57,
            55: 60,
            57: 63,
            59: 66,
            60: 69,
            62: 72,
            64: 75,
            65: 78,
            67: 81,
            69: 84,
            71: 87,
            72: 90,
            74: 93,
            76: 96,
            77: 99,
            79: 102,
            81: 105,
            83: 108,
            84: 111,
            86: 114,
            88: 117,
            89: 120,
            91: 123,
            93: 126,
        });
    });

    it('should create correct map for scale containing less notes than standard kbd (3 aug)', function () {
        const map = getNotesMappingFromIntervals(defaultOctaveOffset, [4, 4, 4]);
        expect(map).toEqual({
            28: 0,
            29: 4,
            31: 8,
            33: 12,
            35: 16,
            36: 20,
            38: 24,
            40: 28,
            41: 32,
            43: 36,
            45: 40,
            47: 44,
            48: 48, // center
            50: 52,
            52: 56,
            53: 60,
            55: 64,
            57: 68,
            59: 72,
            60: 76,
            62: 80,
            64: 84,
            65: 88,
            67: 92,
            69: 96,
            71: 100,
            72: 104,
            74: 108,
            76: 112,
            77: 116,
            79: 120,
            81: 124,
        });
    });

    it('should create correct map for scale containing less notes than standard kbd (2 aug)', function () {
        const map = getNotesMappingFromIntervals(defaultOctaveOffset, [6, 6]);
        expect(map).toEqual({
            35: 0,
            36: 6,
            38: 12,
            40: 18,
            41: 24,
            43: 30,
            45: 36,
            47: 42,
            48: 48, // center
            50: 54,
            52: 60,
            53: 66,
            55: 72,
            57: 78,
            59: 84,
            60: 90,
            62: 96,
            64: 102,
            65: 108,
            67: 114,
            69: 120,
            71: 126,
        });
    });

    it('should create correct map for scale containing less notes than standard kbd (1 mon)', function () {
        const map = getNotesMappingFromIntervals(defaultOctaveOffset, [12]);
        expect(map).toEqual({
            41: 0,
            43: 12,
            45: 24,
            47: 36,
            48: 48, // center
            50: 60,
            52: 72,
            53: 84,
            55: 96,
            57: 108,
            59: 120,
        });
    });

    it('should create correct map for scale containing more notes than standard kbd (8 Minor)', function () {
        const map = getNotesMappingFromIntervals(defaultOctaveOffset, [2, 1, 2, 2, 1, 2, 1, 1]);
        expect(map).toEqual({
            0: 7,
            2: 8,
            4: 10,
            5: 11,
            7: 12,
            9: 14,
            11: 15,
            12: 17,
            14: 19,
            16: 20,
            17: 22,
            19: 23,
            21: 24,
            23: 26,
            24: 27,
            26: 29,
            28: 31,
            29: 32,
            31: 34,
            33: 35,
            35: 36,
            36: 38,
            38: 39,
            40: 41,
            41: 43,
            43: 44,
            45: 46,
            47: 47,
            48: 48, // center
            50: 50,
            52: 51,
            53: 53,
            55: 55,
            57: 56,
            59: 58,
            60: 59,
            62: 60,
            64: 62,
            65: 63,
            67: 65,
            69: 67,
            71: 68,
            72: 70,
            74: 71,
            76: 72,
            77: 74,
            79: 75,
            81: 77,
            83: 79,
            84: 80,
            86: 82,
            88: 83,
            89: 84,
            91: 86,
            93: 87,
            95: 89,
            96: 91,
            98: 92,
            100: 94,
            101: 95,
            103: 96,
            105: 98,
            107: 99,
            108: 101,
            110: 103,
            112: 104,
            113: 106,
            115: 107,
            117: 108,
            119: 110,
            120: 111,
            122: 113,
            124: 115,
            125: 116,
            127: 118,
        });
    });

    it('should create correct map for scale containing more notes than standard kbd (8 Minor)', function () {
        const map = getNotesMappingFromIntervals(defaultOctaveOffset, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
        expect(map).toEqual({
            0: 20,
            2: 21,
            4: 22,
            5: 23,
            7: 24,
            9: 25,
            11: 26,
            12: 27,
            14: 28,
            16: 29,
            17: 30,
            19: 31,
            21: 32,
            23: 33,
            24: 34,
            26: 35,
            28: 36,
            29: 37,
            31: 38,
            33: 39,
            35: 40,
            36: 41,
            38: 42,
            40: 43,
            41: 44,
            43: 45,
            45: 46,
            47: 47,
            48: 48, // center
            50: 49,
            52: 50,
            53: 51,
            55: 52,
            57: 53,
            59: 54,
            60: 55,
            62: 56,
            64: 57,
            65: 58,
            67: 59,
            69: 60,
            71: 61,
            72: 62,
            74: 63,
            76: 64,
            77: 65,
            79: 66,
            81: 67,
            83: 68,
            84: 69,
            86: 70,
            88: 71,
            89: 72,
            91: 73,
            93: 74,
            95: 75,
            96: 76,
            98: 77,
            100: 78,
            101: 79,
            103: 80,
            105: 81,
            107: 82,
            108: 83,
            110: 84,
            112: 85,
            113: 86,
            115: 87,
            117: 88,
            119: 89,
            120: 90,
            122: 91,
            124: 92,
            125: 93,
            127: 94,
        });
    });

    it('should not break if intervals length does not include last interval (it can be calculated from octave length)', function () {
        minorScale5Intervals = [3, 2, 2, 3, 2];
        minorScale6Intervals = [2, 1, 2, 2, 3, 2];
        minorScale7Intervals = [2, 1, 2, 2, 1, 2, 2];
        majorScale7Intervals = [2, 2, 1, 2, 2, 2, 1];

        const minorScale5IntervalsShort = [3, 2, 2, 3];
        const minorScale6IntervalsShort = [2, 1, 2, 2, 3];
        const minorScale7IntervalsShort = [2, 1, 2, 2, 1, 2];
        const majorScale7IntervalsShort = [2, 2, 1, 2, 2, 2];

        expect(getNotesMappingFromIntervals(defaultOctaveOffset, minorScale5Intervals)).toEqual(
            getNotesMappingFromIntervals(defaultOctaveOffset, minorScale5IntervalsShort)
        );

        expect(getNotesMappingFromIntervals(defaultOctaveOffset, minorScale6Intervals)).toEqual(
            getNotesMappingFromIntervals(defaultOctaveOffset, minorScale6IntervalsShort)
        );

        expect(getNotesMappingFromIntervals(defaultOctaveOffset, minorScale7Intervals)).toEqual(
            getNotesMappingFromIntervals(defaultOctaveOffset, minorScale7IntervalsShort)
        );

        expect(getNotesMappingFromIntervals(defaultOctaveOffset, majorScale7Intervals)).toEqual(
            getNotesMappingFromIntervals(defaultOctaveOffset, majorScale7IntervalsShort)
        );
    });
});
