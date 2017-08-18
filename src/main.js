/**
 * Require app SASS/SCSS preprocessor.
 * 
 * @see /src/assets/app.scss
 */
require('./assets/sass/app.scss')

//The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './../storage/store'
import VueFire from 'vuefire'
import Myfirebase from 'myfirebase'
import VueMaterial from 'vue-material';
import Test from '@/components/auth/Login';

Vue.config.productionTip = false

// Init VueFire (Firebase real time database)
Vue.use(VueFire)

// init VueMaterial
Vue.use(VueMaterial)

// Register themes with VueMaterial

// Default
Vue.material.registerTheme('default', {
    primary: 'blue',
    accent: 'red',
    warn: 'orange',
    background: 'white'
})

// Login
Vue.material.registerTheme('login', {
    primary: 'indigo',
    accent: 'blue',
    warn: 'black',
    background: 'white'
})

// Init Myfirebase
Vue.use(Myfirebase, {
    store: store,
    router: router
});

// Init Vue app
const app = new Vue({
    router,
    store,
    mounted() {
        /**
         * Register Serviceworkers, these serviceworkers are registred while the vue app is mounted.
         * service-worker.js is for app pre-cache.
         * firebase-messaging-sw.js is for firebase cloud messaging (FCM).
         * @see /public/service-worker.js
         * @see /public/firebase-messaging-sw.js
         * You are free to change them however you like.
         */
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