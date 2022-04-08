import MemoryContainer from  '../../cointainers/MemoryContainer.js'

class OrderDAOMemory extends MemoryContainer {
    constructor() {
        super(0, [])
    }
}

export default OrderDAOMemory