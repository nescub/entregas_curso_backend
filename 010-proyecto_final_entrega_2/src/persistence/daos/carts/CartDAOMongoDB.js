import MongoDBContainer from  '../../cointainers/MongoDBContainer.js'
import { getSystemConfigurationParameters } from '../../../config/getSystemConfigurationParameters.js'

const parameters = getSystemConfigurationParameters()
const schemaSpecification = {
    id: {type: Number, requeri: true, unique: true},
    timestamp: {type: Number},
    items: [ {
        quantity: {type: Number, requeri: true},
        product: {
            id: {type: Number, requeri: true},
            nombre: {type: String},
            descripcion: {type: String},
            codigo: {type: String, requeri: true},
            foto: {type: String},
            precio: {type: Number}
        }
    } ]
}

class CartDAOMongoDB extends MongoDBContainer {
    constructor() {
        super(parameters.CONNECTION_STRING_MONGODB, 'carts', schemaSpecification)
    }
}

export default CartDAOMongoDB