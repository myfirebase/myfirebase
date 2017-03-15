import * as firebase from "firebase";

import config from './config';

class Firebase{
	constructor(){
		firebase.initializeApp(config)
		return firebase
	}
}

export let firebase = new Firebase();