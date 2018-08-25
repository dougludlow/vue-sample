import moment from 'moment';
import { Restaurant } from '@/restaurants/Restaurant';

export function filterByDate(restaurants: Restaurant[], date: string): Restaurant[] {
    if (!restaurants) {
        return [];
    }

    if (!date) {
        return restaurants;
    }

    const d = moment(date);
    const day = d.weekday();
    const time = d.format('HH:mm');
    return restaurants.filter((x) => {
        const times = x.times.filter((y) => {
            return y.start <= time && time <= y.end;
        });
        return time.length > 0 && times.some((z) => z.days.includes(day));
    });
}
