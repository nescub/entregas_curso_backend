import FirebaseContainer from  '../../cointainers/FirebaseContainer.js'

class OrderDAOFirebase extends FirebaseContainer {
    constructor(serviceAccountFilePath) {
        super(serviceAccountFilePath, 'orders')
    }
}

export default OrderDAOFirebase