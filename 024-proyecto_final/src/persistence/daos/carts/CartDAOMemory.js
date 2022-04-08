import MemoryContainer from  '../../cointainers/MemoryContainer.js'

class CartDAOMemory extends MemoryContainer {
    constructor() {
        super(0, [])
    }
}

export default CartDAOMemory