import MemoryContainer from  '../../cointainers/MemoryContainer.js'

class ProductDAOMemory extends MemoryContainer {
    constructor() {
        super(0, [])
    }
}

export default ProductDAOMemory