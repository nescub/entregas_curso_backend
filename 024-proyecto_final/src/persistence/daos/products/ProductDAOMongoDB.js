import MongoDBContainer from  '../../cointainers/MongoDBContainer.js'

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
    constructor(connectionStringMongoDB) {
        super(connectionStringMongoDB, 'products', schemaSpecification)
    }
}

export default ProductDAOMongoDB