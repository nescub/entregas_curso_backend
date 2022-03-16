import FileContainer from '../../cointainers/FileContainer.js'

class ProductDAOFile extends FileContainer {
    constructor() {
         super('./data/products.txt', 'utf-8')
    }
}

export default ProductDAOFile