import Container from './Container.js'

class MemoryContainer extends Container {
    constructor(initialId, initialObjectsColl) {
        this.idCount = initialId
        this.objects = initialObjectsColl
    }
    
    // Contrato del contenedor:

    getAll() {
        return this.objects
    }
    
    getById(objectId) {
        const index = this.indexById(objectId)
        
        if(index == null) {
            return null
        }
        
        return this.objects[index]
    }

    save(newObject){
        this.idCount = this.idCount + 1
        newObject.id = this.idCount
        this.objects.push(newObject)
        return newObject
    }
    
    update(objectId, newObject){
        const currentObject = this.getById(objectId)

        if( currentObject == null) {
            return null
        }

        for (const property in newObject) {
            currentObject[property] = newObject[property]          
        }
                
        return currentObject
    }

    deleteById(objectId) {
        const index = this.indexById(objectId)

        if(index != null) {
            const eliminated = this.objects.splice(index, 1)
            return eliminated[0]
        }

        return null
    }

    deleteAll() {
        const eliminated = this.getAll()
        this.objects = []
        return eliminated
    }
    //------------------------------------------------------------

    // Metodos auxiliares:

    indexById(objectId) {
        for (let i = 0; i < this.objects.length; i++) {
            if ( (this.objects[i]).id == objectId ) {
               return i
            }
         }
        
        return null
    }
    //------------------------------------------------------------
}

export default MemoryContainer