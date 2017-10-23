import Vue from 'vue';
import Vuex from 'vuex';
import { firebase } from './../src/firebase/firebase'
import auth from './../storage/modules/myfirebase-auth/auth'
import storage from './../storage/modules/myfirebase-storage/storage'
require('firebase/firestore')

Vue.use(Vuex);

// FCM, Firebase cloud messaging
const fcm = firebase.messaging();
// Cloud FireStore
const firestore = firebase.firestore();
// Defin database
const database = firebase.database();
// Ref to messages JSON
const messages = database.ref().child('messages');
// Error
const error = ''

export default new Vuex.Store({
    // myfirebase modules
    modules: {
        auth: auth,
        storage: storage
    },
    // states
    state: {
        database: database.ref(),
        firestore: firestore,
        error: error,
        messaging: fcm,
        firebase: firebase
    },
    // mutations
    mutations: {},
    // getters
    getters: {},
    //actions
    actions: {}
})