import fs from 'fs'
import fireBaseAdmin from "firebase-admin"
import Container from './Container.js'


class FirebaseContainer extends Container {

    constructor(serviceAccountFilePath, collectionName) {
        super()

        this.serviceAccountFilePath = serviceAccountFilePath    //ejemplo: './firebase/proyecto-nescub-coderhouse-firebase-adminsdk-3tlsq-ec7b438e54.json'
        this.collectionName = collectionName                    //ejemplo: products
        this.lastId = null
    }

    static db = null

    // conexion - desconexion

    async connect() {
        try {
            if(FirebaseContainer.db == null ) {
                const serviceAccount = JSON.parse(fs.readFileSync(this.serviceAccountFilePath))
                
                fireBaseAdmin.initializeApp({
                    credential: fireBaseAdmin.credential.cert(serviceAccount)
                }) 
    
                FirebaseContainer.db = fireBaseAdmin.firestore()
            }

            this.lastId = await this.getLastId()
        } catch (error) {
            throw new Error(`Error al conectarse a Firebase:\n${error.message}`)
        }
    }

    // Contrato del contenedor:

    async getAll() {
        const snapshot =  await FirebaseContainer.db.collection(this.collectionName).get()

        if (snapshot.empty) {    
            return []
        }  

        return snapshot.docs.map(doc => { return this.getObjectFromDoc(doc) })
    }

    async getById(objectId) {
        const doc = await this.getDocById(objectId)

        if (doc == null) {
            return null
        }

        return this.getObjectFromDoc(doc)
    }

    async save(newObject) {        
        const objectId = this.lastId + 1

        const refDoc = FirebaseContainer.db.collection(this.collectionName).doc(`${objectId}`)
        await refDoc.set(newObject)
        const doc = await refDoc.get() 

        this.lastId = objectId

        return this.getObjectFromDoc(doc)
    }

    async update(objectId, newObject){
        const refDoc = this.getRefDocById(objectId)
        const doc = await refDoc.get() 
        
        if (!doc.exists) {
            return null
        }

        await refDoc.update(newObject)

        return this.getObjectFromDoc(await refDoc.get())
    }

    async deleteById(objectId) {
        const refDoc = this.getRefDocById(objectId)
        const doc = await refDoc.get() 
        
        if (!doc.exists) {
            return null
        }

        const object = this.getObjectFromDoc(doc)
        await refDoc.delete()
        
        return object
    }

    async deleteAll() {
        const objects = []

        const snapshot =  await FirebaseContainer.db.collection(this.collectionName).get()

        if (snapshot.empty) {    
            return []
        } 

        snapshot.docs.forEach( doc => {
            objects.push(this.getObjectFromDoc(doc))
            this.getRefDocById(doc.id).delete()
        })

        return objects
    }
    //------------------------------------------------------------

    // Metodos auxiliares:

    getRefDocById(objectId) {
        return FirebaseContainer.db.collection(this.collectionName).doc(`${objectId}`)
    }

    async getDocById(objectId) {
        const doc = await this.getRefDocById(objectId).get() 

        if (!doc.exists) {
            return null
        }

        return doc
    }

    getObjectFromDoc(doc) {
        return { id: doc.id, ...doc.data() }
    }


    async getLastId() {
        const objects = await this.getAll()

        let max = 0
        let id = 0
        objects.forEach(function(element, index, array){
            id = parseInt(element.id)
            if ( id > max) {
                max = id
            }
        })

        return max
    }

    //------------------------------------------------------------
}

export default FirebaseContainer