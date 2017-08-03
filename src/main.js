//The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('./assets/sass/app.scss')

import Vue from 'vue'
import router from './router'
import store from './../storage/store'
import VueFire from 'vuefire'
import Myfirebase from 'myfirebase'
import VueMaterial from 'vue-material';

Vue.config.productionTip = false

Vue.use(VueFire)

Vue.use(VueMaterial)

Vue.use(Myfirebase, {
    store: store,
    router: router
});

const app = new Vue({
    router,
    store,
    mounted() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js')
            navigator.serviceWorker.register('/firebase-messaging-sw.js')
            this.$store.state.messaging
                .requestPermission()
                .then(function() {
                    console.log("Permission accepted")
                })
                .catch(function(error) {
                    console.log("Permission denied")
                })
        }
    },
    data() {
        return {}
    }
}).$mount('#app');