import FileContainer from '../../cointainers/FileContainer.js'

class OrderDAOFile extends FileContainer {
    constructor() {
         super('./data/orders.txt', 'utf-8')
    }
}

export default OrderDAOFile