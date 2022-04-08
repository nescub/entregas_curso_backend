import MongoDBContainer from  '../../cointainers/MongoDBContainer.js'

const schemaSpecification = {
    id: {type: Number, requeri: true, unique: true},
    dateTime: {type: String},
    total: {type: Number},
    user: {
        id: {type: Number, requeri: true},
        nombre: {type: String },
        apellido: {type: String},
        email:  {type: String, requeri: true}
    },
    direccion_entrega: {type: String},
    estado: {type: String},
    items: [ {
        productId: {type: Number, requeri: true},
        quantity: {type: Number, requeri: true},
        subTotal: {type: Number},
        productDetail: {
            nombre: {type: String},
            descripcion: {type: String},
            codigo: {type: String, requeri: true},
            foto: {type: String},
            precio: {type: Number}
        }
    } ]
}

class OrderDAOMongoDB extends MongoDBContainer {
    constructor(connectionStringMongoDB) {
        super(connectionStringMongoDB, 'orders', schemaSpecification)
    }
}

export default OrderDAOMongoDB