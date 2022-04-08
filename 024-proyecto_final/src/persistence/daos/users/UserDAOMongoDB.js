import MongoDBContainer from  '../../cointainers/MongoDBContainer.js'

const schemaSpecification = {
    id: {type: Number, requeri: true, unique: true},
    usuario: {type: String, requeri: true, unique: true},
    password: {type: String, requeri: true },
    nombre: {type: String },
    apellido: {type: String},
    direccion: {type: String},
    email:  {type: String, requeri: true, unique: true},
    admin: {type: Boolean, requeri: true }
}

class UserDAOMongoDB extends MongoDBContainer {
    constructor(connectionStringMongoDB) {
        super(connectionStringMongoDB, 'users', schemaSpecification)
    }

    async getUserByEmail(email) {
        const result = await this.collectionDAO.find({ email: email }, { _id: 0, __v: 0})

        if (result.length == 0) {
            return null
        }

        return result[0]
    }

    async getUser(usuario) {
        const result = await this.collectionDAO.find({ usuario: usuario }, { _id: 0, __v: 0})

        if (result.length == 0) {
            return null
        }

        return result[0]
    }

    async deleteUser(usuario) {
        const object = await this.getUser(usuario)

        if (object != null) {
            await this.collectionDAO.deleteOne({ usuario: usuario})
        }

        return object
    }
}

export default UserDAOMongoDB