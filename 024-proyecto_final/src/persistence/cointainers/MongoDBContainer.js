import mongoose from "mongoose"
import Container from './Container.js'

class MongoDBContainer extends Container {

    constructor(connectionStringMongoDB, collectionName, schemaDefinitionObject) {
        super()

        this.connectionStringMongoDB = connectionStringMongoDB
        
        if (Object.keys(mongoose.models).includes(collectionName)) {
            this.collectionDAO = mongoose.models[collectionName] 
        } else {
            this.collectionDAO = mongoose.model(collectionName, new mongoose.Schema(schemaDefinitionObject))
        }

        this.lastId = null
    }

    // conexion - desconexion

    async connect() {
        try {
            await mongoose.connect(this.connectionStringMongoDB, {
                serverSelectionTimeoutMS: 5000,
            })

            this.lastId = await this.getLastId()
        } catch (error) {
            throw new Error(`Error al conectarse a MongoDB:\n${error.message}`)
        }
    }

    async disconnect() {
        try {
            await mongoose.disconnect()
        } catch (error) {
            throw new Error(`Error al desconectarse a MongoDB:\n${error.message}`)
        }
    }

    // Contrato del contenedor:

    async getAll() {
        return await this.collectionDAO.find({}, { _id: 0, __v: 0})
    }

    async getById(objectId) {
        const result = await this.collectionDAO.find({ id: objectId }, { _id: 0, __v: 0})

        if (result.length == 0) {
            return null
        }

        return result[0]
    }

    async save(newObject) {        
        newObject.id = this.lastId + 1

        await this.collectionDAO.create(newObject)
        this.lastId = newObject.id

        return newObject
    }

    async update(objectId, newObject) {
        const result = await this.collectionDAO.updateOne({ id: objectId}, {$set: newObject})

        if (result.matchedCount == 0) {
            return null
        }

        return await this.getById(objectId)
    }

    async deleteById(objectId) {
        const object = await this.getById(objectId)

        if (object != null) {
            await this.collectionDAO.deleteOne({ id: objectId})
        }

        return object
    }

    async deleteAll() {
        const objects = await this.getAll()
        await this.collectionDAO.deleteMany({})

        return objects
    }
    //------------------------------------------------------------

    // Metodos auxiliares:

    async getLastId() {
        const objects = await this.getAll()

        let max = 0
        let id = 0
        objects.forEach(function(element, index, array){
            id = element.id
            if ( id > max) {
                max = id
            }
        })

        return max
    }

    //------------------------------------------------------------
}

export default MongoDBContainer