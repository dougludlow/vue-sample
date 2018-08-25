<template>
  <div id="app">
    <h1>restaurantr</h1>
    <p>Choose a time to see if a restaurant is open</p>
    <datetime type="datetime" :minute-step="5" use12-hour :min-datetime="min" v-model="date"></datetime>
    <restaurants :date-filter="date"></restaurants>

    <footer class="text-muted">&copy; 2018 Douglas Ludlow</footer>
  </div>
</template>

<script lang="ts">
import 'vue-datetime/dist/vue-datetime.css';
import { Component, Vue } from 'vue-property-decorator';
import { Datetime } from 'vue-datetime';
import Restaurants from '@/restaurants/Restaurants.vue';

@Component({
    components: {
        datetime: Datetime,
        restaurants: Restaurants,
    },
})
export default class App extends Vue {
    private min = new Date().toISOString();
    private date = new Date().toISOString();
}
</script>

<style lang="scss">
$white: #efefef;

video#restaurant {
    position: fixed;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
}

#app {
    position: fixed;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: $white;
    background: rgba($color: #000000, $alpha: 0.6);

    .vdatetime-input {
        background: transparent;
        color: $white;
        border: 1px solid $white;
        padding: 10px 15px;
        font-size: 14px;
        border-radius: 5px;
        text-align: center;
    }

    .text-muted {
        color: darken($color: $white, $amount: 30%);
    }

    footer {
        position: absolute;
        bottom: 0;
        padding: 10px;
        width: 100%;
        text-align: center;
        font-size: 0.9em;
    }
}
</style>
