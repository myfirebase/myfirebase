import { FirestoreModel } from 'myfirebase'

class Person extends FirestoreModel {

    /**
     * Create new Person instance.
     * 
     * @param {*} ref
     */
    constructor (ref) {
        super(ref)
    }

    /**
     * Define required properties.
     * 
     * @return array
     */
    required () {
        return []
    }
}

export default Person;
