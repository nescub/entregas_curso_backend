import FirebaseContainer from  '../../cointainers/FirebaseContainer.js'

class UserDAOFirebase extends FirebaseContainer {
    constructor(serviceAccountFilePath) {
        super(serviceAccountFilePath, 'users')
    }

    async getUserByEmail(email) {
        const snapshot =  await FirebaseContainer.db.collection(this.collectionName).where('email', '==', email).get()
    
        if (snapshot.empty) {    
            return null
        }

        return this.getObjectFromDoc(snapshot.docs[0])        
    }

    async getUser(usuario) {
        const snapshot =  await FirebaseContainer.db.collection(this.collectionName).where('usuario', '==', usuario).get()
    
        if (snapshot.empty) {    
            return null
        }

        return this.getObjectFromDoc(snapshot.docs[0])    
    }

    async deleteUser(usuario) {
        const snapshot =  await FirebaseContainer.db.collection(this.collectionName).where('usuario', '==', usuario).get()
    
        if (snapshot.empty) {    
            return null
        }
        
        const doc = snapshot.docs[0]
        const refDoc = this.getRefDocById(doc.id)
        const userDeleted = this.getObjectFromDoc(doc) 

        await refDoc.delete()

        return userDeleted
    }
}

export default UserDAOFirebase
