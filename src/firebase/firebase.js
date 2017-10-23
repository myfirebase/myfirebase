import * as googleFirebase from "firebase";

import config from './config';

class Firebase {
    constructor() {
        googleFirebase.initializeApp(config)
        return googleFirebase
    }
}

export let firebase = new Firebase();