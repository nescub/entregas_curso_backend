import FirebaseContainer from  '../../cointainers/FirebaseContainer.js'

class ProductDAOFirebase extends FirebaseContainer {
    constructor(serviceAccountFilePath) {
        super(serviceAccountFilePath, 'products')
    }
}

export default ProductDAOFirebase