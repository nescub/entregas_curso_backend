import FirebaseContainer from  '../../cointainers/FirebaseContainer.js'

class MessageDAOFirebase extends FirebaseContainer {
    constructor(serviceAccountFilePath) {
        super(serviceAccountFilePath, 'messages')
    }

    async getMessagesByEmail(email) {
        const snapshot =  await FirebaseContainer.db.collection(this.collectionName).where('author', '==', email).get()
            
        if (snapshot.empty) {    
            return []
        }  

        return snapshot.docs.map(doc => { return this.getObjectFromDoc(doc) })
    }
}

export default MessageDAOFirebase