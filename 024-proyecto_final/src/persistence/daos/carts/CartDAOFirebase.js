import FirebaseContainer from  '../../cointainers/FirebaseContainer.js'

class CartDAOFirebase extends FirebaseContainer {
    constructor(serviceAccountFilePath) {
        super(serviceAccountFilePath, 'carts')
    }
}

export default CartDAOFirebase