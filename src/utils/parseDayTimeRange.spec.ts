import { parseDay, parseDays, parseDayTimeRange, range } from './parseDayTimeRange';

describe('utils', () => {

    describe('range', () => {
        it('should create an array with values beginning at start and ending at stop', () => {
            expect(range(1, 3)).toEqual([1, 2, 3]);
        });

        it('should return an empty array if start is greater than end', () => {
            expect(range(3, 1)).toEqual([]);
        });
    });

    describe('parseDay', () => {

        it('should return 0 for Mon', () => {
            expect(parseDay('Mon')).toBe(0);
        });

        it('should return 1 for Tue', () => {
            expect(parseDay('Tue')).toBe(1);
        });

        it('should return 2 for Wed', () => {
            expect(parseDay('Wed')).toBe(2);
        });

        it('should return 3 for Thu', () => {
            expect(parseDay('Thu')).toBe(3);
        });

        it('should return 4 for Fri', () => {
            expect(parseDay('Fri')).toBe(4);
        });

        it('should return 5 for Sat', () => {
            expect(parseDay('Sat')).toBe(5);
        });

        it('should return 6 for Sun', () => {
            expect(parseDay('Sun')).toBe(6);
        });

        it('should return -1 for invalid entry', () => {
            expect(parseDay(null)).toBe(-1);
            expect(parseDay('0')).toBe(-1);
            expect(parseDay('mon')).toBe(-1);
            expect(parseDay('Monday')).toBe(-1);
        });
    });

    describe('parseDays', () => {
        it('should return correct range for days', () => {
            expect(parseDays(['Mon-Wed'])).toEqual([0, 1, 2]);
        });

        it('should return correct range for all days', () => {
            expect(parseDays(['Mon-Sun'])).toEqual([0, 1, 2, 3, 4, 5, 6]);
        });

        it('should return an array of length 1 for a single day', () => {
            expect(parseDays(['Mon'])).toEqual([0]);
        });

        it('should sort days ascending', () => {
            expect(parseDays(['Sat', 'Mon', 'Thu'])).toEqual([0, 3, 5]);
        });

        it('should return an empty array for invalid entries', () => {
            expect(parseDays(null)).toEqual([]);
            expect(parseDays([])).toEqual([]);
            expect(parseDays(['Forever'])).toEqual([]);
            expect(parseDays(['Start-Stop'])).toEqual([]);
        });
    });

    describe('parseDayTimeRange', () => {

        it('should parse days correctly', () => {
            expect(parseDayTimeRange('Mon 8 am - 5 pm').days).toEqual([0]);
            expect(parseDayTimeRange('Mon-Wed 8 am - 5 pm').days).toEqual([0, 1, 2]);
            expect(parseDayTimeRange('Mon, Wed-Fri 8 am - 5 pm').days).toEqual([0, 2, 3, 4]);
        });

        it('should parse start correctly', () => {
            expect(parseDayTimeRange('Mon 9 am - 5:30 pm').start).toBe('09:00');
            expect(parseDayTimeRange('Mon-Wed 8:30 am - 5:30 pm').start).toBe('08:30');
            expect(parseDayTimeRange('Mon, Wed-Fri 8 am - 5 pm').start).toBe('08:00');
        });

        it('should parse end correctly', () => {
            expect(parseDayTimeRange('Mon 9 am - 5:30 pm').end).toBe('17:30');
            expect(parseDayTimeRange('Mon-Wed 8:30 am - 5:30 pm').end).toBe('17:30');
            expect(parseDayTimeRange('Mon, Wed-Fri 8 am - 5 pm').end).toBe('17:00');
        });
    });

});
