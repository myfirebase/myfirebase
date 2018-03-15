import { DatabaseModel } from './../../framework/dist/myfirebase'

class Item extends DatabaseModel {
    constructor(ref) {
        super(ref)
    }

    required() {
        return []
    }
}

export default Item;
