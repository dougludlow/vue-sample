import { uniqueId } from 'lodash';
import { RestaurantDto } from '@/restaurants/RestaurantDto';
import { DayTimeRange } from '@/models/DayTimeRange';
import { parseDayTimeRange } from '@/utils/parseDayTimeRange';

export class Restaurant {

    public id!: string;
    public name!: string;
    public times!: DayTimeRange[];

    constructor(restaurant: RestaurantDto) {
        this.id = uniqueId();
        this.name = restaurant.name;
        this.times = restaurant.times
            .map((x) => parseDayTimeRange(x))
            .filter((x) => x !== null) as DayTimeRange[];
    }
}
