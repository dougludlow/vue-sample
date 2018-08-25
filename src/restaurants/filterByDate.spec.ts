import { filterByDate } from '@/restaurants/filterByDate';
import moment from 'moment';

describe('restaurants', () => {
    describe('filterByDate', () => {

        (moment as any).updateLocale('en', {
            week: {
                dow: 1,
            },
        });

        const restaurant1 = {
            id: '1',
            name: 'Restaurant 1',
            times: [{
                days: [0],
                start: '10:00',
                end: '21:00',
            }],
        };
        const restaurant2 = {
            id: '2',
            name: 'Restaurant 2',
            times: [{
                days: [1],
                start: '11:00',
                end: '21:00',
            }],
        };
        const restaurants = [restaurant1, restaurant2];

        it('should return an empty array if restaurants is falsey', () => {
            expect(filterByDate(null, null)).toEqual([]);
        });

        it('should return same array if date is falsey', () => {
            expect(filterByDate(restaurants, null)).toBe(restaurants);
        });

        it('should filter restaurants', () => {
            const date = moment().weekday(0).hour(10).minute(0);
            expect(filterByDate(restaurants, date)).toEqual([restaurant1]);
        });

        it('should filter restaurants v2', () => {
            const date = moment().weekday(1).hour(11).minute(0);
            expect(filterByDate(restaurants, date)).toEqual([restaurant2]);
        });

        it('should filter restaurants v3', () => {
            const date = moment().weekday(2).hour(11).minute(0);
            expect(filterByDate(restaurants, date)).toEqual([]);
        });
    });
});
