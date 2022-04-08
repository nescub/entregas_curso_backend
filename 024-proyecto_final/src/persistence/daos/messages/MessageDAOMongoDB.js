import MongoDBContainer from  '../../cointainers/MongoDBContainer.js'

const schemaSpecification = {
    id: {type: Number, requeri: true, unique: true},
    author: {type: String, requeri: true},
    text: {type: String, requeri: true},
    dateTime: {type: String, requeri: true}
}

class MessageDAOMongoDB extends MongoDBContainer {
    constructor(connectionStringMongoDB) {
        super(connectionStringMongoDB, 'messages', schemaSpecification)
    }

    async getMessagesByEmail(email) {
        return await this.collectionDAO.find({ author: email }, { _id: 0, __v: 0})
    }

}

export default MessageDAOMongoDB