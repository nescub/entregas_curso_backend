/* Ejemplo de object:                                                                                                                                             
    {
        attr1: (valorAttr1),
        attr2: (valorAttr2),
        ...
        attrN: (valorAttrN),
        id: (id numerico asignado por contendor)
    }                                                                                                                                               
*/

const fs = require('fs')

class FileContainer {
    constructor(filePath) {
        this.filePath = filePath
        this.encoding = 'utf-8'
    }

    // Contrato del contenedor:

    getAll() {
        return this.read()
    }

    getById(objectId) {
        const objects = this.read()
        
        /*el return dentro de un forEach no hace cortocircuito a nivel metodo (reemplazo por un for tradicional)
        objects.forEach(function(element, index, array){
            if ( element.id == objectId) {
                console.log(element)
                return element
            }
        })*/

        for (let i = 0; i < objects.length; i++) {
            if ( objects[i].id == objectId) {
                return objects[i]
            }

        }

        return null
    }

    save(newObject){
        const objects = this.read()
        newObject.id = this.getLastId(objects) + 1
        objects.push(newObject)
        this.write(objects)
        return newObject
    }

    update(objectId, newObject){
        const objects = this.read()

        for (let i = 0; i < objects.length; i++) {
            if ( objects[i].id == objectId) {
                const currentObject =  objects[i]
                for (const property in newObject) {
                    currentObject[property] = newObject[property]          
                }
                this.write(objects)
                return currentObject
            }
        }

        return null
    }

    deleteById(objectId) {
        const objects = this.read()
        
        for (let i = 0; i < objects.length; i++) {
            if ( objects[i].id == objectId) {
                const eliminated = objects.splice(i, 1)
                this.write(objects)
                return eliminated[0]
            }
        }
        
        return null
    }

    deleteAll() {
        const objects = this.read()
        this.write([])
        return objects
    }
    //------------------------------------------------------------

    // Metodos auxiliares:

    read() {
        try {
            return JSON.parse(fs.readFileSync(this.filePath, this.encoding))
        } catch (error) {
            return []       //considero que no existe si falla el read
        }
    }

    write(objects) {
        const json = JSON.stringify(objects, null, 2)

        try {
            return fs.writeFileSync(this.filePath, json ,this.encoding)
        } catch (error) {
            throw new Error(`Error al escribir archivo ${this.filePath}`)
        }
    }

    getLastId(objects) {
        let max = 0
        objects.forEach(function(element, index, array){
            if ( element.id > max) {
                max = element.id
            }
        })
        return max
    }
    //------------------------------------------------------------
}

module.exports = FileContainer