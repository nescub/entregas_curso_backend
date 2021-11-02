/* Ejemplo de object:                                                                                                                                             
    {
        attr1: (valorAttr1),
        attr2: (valorAttr2),
        ...
        attrN: (valorAttrN),
        id: (id numerico asignado por contendor)
    }                                                                                                                                               
*/

class ContenedorMemoria {
    constructor() {
        this.idCount = 0;
        this.objects = [];
    }
    
    save(newObject){
        this.idCount = this.idCount + 1
        newObject.id = this.idCount

        this.objects.push(newObject)
        
        return newObject
    }

    indexById(objectId) {
        for (let i = 0; i < this.objects.length; i++) {
            if ( (this.objects[i]).id == objectId ) {
               return i
            }
         }
        
        return null
    }

    getById(objectId) {
        const index = this.indexById(objectId)
        
        if(index == null) {
            return null
        }
        
        return this.objects[index]
    }

    getAll() {
        return this.objects
    }

    deleteById(objectId) {
        const index = this.indexById(objectId)

        if(index != null) {
            const eliminated = this.objects.splice(index, 1)
            return eliminated[0]
        }

        return null
    }

    update(id, newObject){
        const currentObject = this.getById(id)

        if( currentObject == null) {
            return null
        }

        for (const property in newObject) {
            currentObject[property] = newObject[property]          
        }
                
        return currentObject
    }

}

module.exports = ContenedorMemoria