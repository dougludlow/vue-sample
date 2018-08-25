import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';
import moment from 'moment';
import store from './store';
import './registerServiceWorker';

(moment as any).locale('en', {
    week: {
        dow: 1,
    },
});

Vue.config.productionTip = false;

Vue.use(VueResource);

new Vue({
    store,
    render: (h) => h(App),
}).$mount('#app');
