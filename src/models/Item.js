import { DatabaseModel } from 'myfirebase'

class Item extends DatabaseModel {
    constructor(ref) {
        super(ref)
    }

    required() {
        return []
    }
}

export default Item;
