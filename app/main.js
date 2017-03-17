require('./bootstrap.js')

window.Vue = require('vue');

import VueRouter from 'vue-router';

import routes from './routes';

import store from './../storage/store';

import VueFire from 'vuefire';

import Myfirebase from 'myfirebase'

Vue.use(VueRouter);

Vue.use(VueFire);

// Application router!!
const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes,
    scrollBehavior(to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
});

Vue.use(Myfirebase, {
    store: store,
    router: router 
});

const app = new Vue({
    router,
    store,
    data() {
        return {
            default: "Default"
        }
    }
}).$mount('#app');
