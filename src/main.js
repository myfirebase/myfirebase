//The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('./assets/sass/app.scss')

import Vue from 'vue'
import router from './router'
import store from './../storage/store'
import VueFire from 'vuefire'
import Myfirebase from 'myfirebase'

Vue.config.productionTip = false

Vue.use(VueFire)

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