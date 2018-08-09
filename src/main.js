/**
 * Require app SASS/SCSS preprocessor.
 * 
 * @see /src/assets/app.scss
 */
require('@/assets/sass/app.scss')

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from '@/router'
import store from './../storage/store'
import VueFire from 'vuefire'
import Myfirebase from 'myfirebase'
import Firestore from 'vue-firestore'

import Vuetify from 'vuetify'

Vue.use(Vuetify)

// Middlewares
import middlewares from '@/middlewares/index'

Vue.config.productionTip = false

// Init VueFire (Firebase real time database)
Vue.use(VueFire)
Vue.use(Firestore)

// Init Myfirebase
Vue.use(Myfirebase, {
    store: store,
    router: router,
    middlewares: middlewares
});

const app = new Vue({
    router,
    store,
    mounted () {
        /**
         * Register Serviceworkers, these serviceworkers are registred while the vue app is mounted.
         * service-worker.js is for app pre-cache.
         * firebase-messaging-sw.js is for firebase cloud messaging (FCM).
         * @see /public/service-worker.js
         * @see /public/firebase-messaging-sw.js
         * You are free to change them however you like.
         */
        let env = process.env.NODE_ENV;
        if ('serviceWorker' in navigator && env == 'production') {
            navigator.serviceWorker.register('/service-worker.js')
            navigator.serviceWorker.register('/firebase-messaging-sw.js')
            this.$store.state.messaging
                .requestPermission()
                .then(function () {
                    console.log("Permission accepted")
                })
                .catch(function(error) {
                    console.log("Permission denied")
                })
        }
    },
    data () {
        return {}
    }
}).$mount('#app');