/* Ejemplo de object:                                                                                                                                             
    {
        attr1: (valorAttr1),
        attr2: (valorAttr2),
        ...
        attrN: (valorAttrN),
        id: (id numerico asignado por contendor)
    }                                                                                                                                               
*/

class Container {

    connect() { //por defecto no se hace nada
    }

    disconnect() { //por defecto no se hace nada
    }

    // Contrato del contenedor:

    async getAll() {
        throw new Error('Error, falta implementar el metodo getAll en el contenedor')
    }

    async getById(objectId) {
        throw new Error('Error, falta implementar el metodo getById en el contenedor')
    }

    async save(newObject){
        throw new Error('Error, falta implementar el metodo save en el contenedor')
    }

    async update(objectId, newObject){
        throw new Error('Error, falta implementar el metodo update en el contenedor')
    }

    async deleteById(objectId) {
        throw new Error('Error, falta implementar el metodo deleteById en el contenedor')
    }

    async deleteAll() {
        throw new Error('Error, falta implementar el metodo deleteAll en el contenedor')
    }
 
}

export default Container