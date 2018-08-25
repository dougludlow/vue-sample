<template>
    <ul id="restaurants">
        <li>
            <strong class="text-muted">
                Showing {{filteredRestaurants.length}} restaurant{{filteredRestaurants.length !== 1 ? 's' : ''}}
            </strong>
        </li>
        <li v-for="r in filteredRestaurants" :key="r.id">{{r.name}}</li>
    </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import moment from 'moment';
import RestaurantsService from '@/restaurants/RestaurantsService';
import { Restaurant } from '@/restaurants/Restaurant';

@Component({})
export default class Restaurants extends Vue {
    @Prop() public dateFilter!: string;

    public restaurants: Restaurant[] = [];

    public mounted() {
        RestaurantsService.getRestaurants().then((x) => (this.restaurants = x));
    }

    get filteredRestaurants() {
        
        if (!this.restaurants) {
            return [];
        }

        if (!this.dateFilter) {
            return this.restaurants;
        }

        const d = moment(this.dateFilter);
        const day = d.weekday();
        const time = d.format('HH:mm');
        const restaurants = this.restaurants.filter((x) => {
            const times = x.times.filter((y) => {
                return y.start <= time && time <= y.end;
            });
            return time.length > 0 && times.some((z) => z.days.includes(day));
        });

        return restaurants;
    }
}
</script>

<style lang="scss">
#restaurants {
    height: 71vh;
    overflow: auto;
    list-style-type: none;
}
</style>

