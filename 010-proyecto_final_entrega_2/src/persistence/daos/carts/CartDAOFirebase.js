import FirebaseContainer from  '../../cointainers/FirebaseContainer.js'
import { getSystemConfigurationParameters } from '../../../config/getSystemConfigurationParameters.js'

const parameters = getSystemConfigurationParameters()

class CartDAOFirebase extends FirebaseContainer {
    constructor() {
        super(parameters.PATH_FIREBASE_ADMIN_SDK_JSON, 'carts')
    }
}

export default CartDAOFirebase