import { DatabaseModel } from 'myfirebase'

class Item extends DatabaseModel {

    /**
     * Create new Item instance.
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

export default Item;
