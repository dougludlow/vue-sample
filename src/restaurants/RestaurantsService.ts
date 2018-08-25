import Vue from 'vue';
import { RestaurantDto } from './RestaurantDto';
import { Restaurant } from './Restaurant';

export default {
    getRestaurants(): PromiseLike<Restaurant[]> {
        return Vue.http.get('rest_hours.json')
            .then((x) => x.data.map((y: RestaurantDto) => new Restaurant(y)));
    },
};
