import MongoDBContainer from  '../../cointainers/MongoDBContainer.js'
import { getSystemConfigurationParameters } from '../../../config/getSystemConfigurationParameters.js'

const parameters = getSystemConfigurationParameters()
const schemaSpecification = {
    id: {type: Number, requeri: true, unique: true},
    nombre: {type: String},
    descripcion: {type: String},
    codigo: {type: String, requeri: true, unique: true},
    foto: {type: String},
    precio: {type: Number},
    stock: {type: Number},
    timestamp: {type: Number}
}

class ProductDAOMongoDB extends MongoDBContainer {
    constructor() {
        super(parameters.CONNECTION_STRING_MONGODB, 'products', schemaSpecification)
    }
}

export default ProductDAOMongoDB