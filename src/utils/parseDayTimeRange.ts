import moment from 'moment';
import { DayTimeRange } from '@/models/DayTimeRange';

export const daysOfTheWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const rawPattern = /^(.*) ((\d{1,2})(:\d{2}){0,1} (am|pm) - (\d{1,2})(:\d{2}){0,1} (am|pm))$/;
export const daysPattern = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)(-(Mon|Tue|Wed|Thu|Fri|Sat|Sun)){0,1}$/;

export function parseDayTimeRange(value: string): DayTimeRange | null {

    const matches = rawPattern.exec(value);
    if (!matches || matches.length < 3) {
        return null;
    }

    const daysStrings = matches[1].split(', ');
    const days = parseDays(daysStrings);

    if (days.length === 0) {
        return null;
    }

    const timesStrings = matches[2].split(' - ');
    if (timesStrings.length !== 2) {
        return null;
    }

    const formats = ['h:mm a', 'h a'];
    const format = 'HH:mm';
    const start = moment(timesStrings[0], formats).format(format);
    const end = moment(timesStrings[1], formats).format(format);

    return { days, start, end };
}

export function parseDays(daysStrings: string[]): number[] {
    if (!daysStrings) {
        return [];
    }
    const result = daysStrings.reduce<number[]>((days, str) => {
        const m = daysPattern.exec(str);
        if (m) {
            const start = parseDay(m[1]);
            if (m[3]) {
                const end = parseDay(m[3]);
                if (start !== -1 && end !== -1) {
                    days.push(...range(start, end));
                }
            } else {
                if (start !== -1) {
                    days.push(start);
                }
            }
        }
        return days;
    }, []);
    return result.sort();
}

export function parseDay(value: string) {
    const index = daysOfTheWeek.indexOf(value);
    return index;
}

export function range(start: number, end: number) {
    const list = [];
    for (let i = start; i <= end; i++) {
        list.push(i);
    }
    return list;
}
