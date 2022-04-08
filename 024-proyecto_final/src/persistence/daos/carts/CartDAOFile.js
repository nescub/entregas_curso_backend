import FileContainer from '../../cointainers/FileContainer.js'

class CartDAOFile extends FileContainer {
    constructor() {
         super('./data/carts.txt', 'utf-8')
    }
}

export default CartDAOFile