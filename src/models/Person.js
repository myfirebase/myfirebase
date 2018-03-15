import { FirestoreModel } from './../../framework/dist/myfirebase'

class Person extends FirestoreModel {
    constructor(ref) {
        super(ref)
    }

    required() {
        return []
    }
}

export default Person;
