import fs from 'fs'
import Container from './Container.js'

class FileContainer extends Container {
    constructor(filePath, encoding) {
        super()
        this.filePath = filePath
        this.encoding = encoding
    }

    // Contrato del contenedor:

    async getAll() {
        return await this.read()
    }

    async getById(objectId) {
        const objects = await this.read()

        for (let i = 0; i < objects.length; i++) {
            if ( objects[i].id == objectId) {
                return objects[i]
            }

        }

        return null
    }

    async save(newObject){
        const objects = await this.read()
        newObject.id = this.getLastId(objects) + 1
        objects.push(newObject)
        await this.write(objects)
        return newObject
    }

    async update(objectId, newObject){
        const objects = await this.read()

        for (let i = 0; i < objects.length; i++) {
            if ( objects[i].id == objectId) {
                const currentObject =  objects[i]
                for (const property in newObject) {
                    currentObject[property] = newObject[property]          
                }
                await this.write(objects)
                return currentObject
            }
        }

        return null
    }

    async deleteById(objectId) {
        const objects = await this.read()
        
        for (let i = 0; i < objects.length; i++) {
            if ( objects[i].id == objectId) {
                const eliminated = objects.splice(i, 1)
                await this.write(objects)
                return eliminated[0]
            }
        }
        
        return null
    }

    async deleteAll() {
        const objects = await this.read()
        await this.write([])
        return objects
    }
    //------------------------------------------------------------

    // Metodos auxiliares:

    getLastId(objects) {
        let max = 0
        objects.forEach(function(element, index, array){
            if ( element.id > max) {
                max = element.id
            }
        })
        return max
    }

    async read() {
        try {
            return JSON.parse(await fs.promises.readFile(this.filePath, this.encoding))
        } catch (error) {
            return []       //considero que no existe si falla el read
        }
        /*
        try {
            return JSON.parse(fs.readFileSync(this.filePath, this.encoding))
        } catch (error) {
            return []       //considero que no existe si falla el read
        }*/
    }

    async write(objects) {       
        try {
            const json = JSON.stringify(objects, null, 2)
            return await fs.promises.writeFile(this.filePath, json ,this.encoding)
        } catch (error) {
            throw new Error(`Error al escribir archivo ${this.filePath}:\n${error.message}`)
        }
        /*try {
            const json = JSON.stringify(objects, null, 2)
            return fs.writeFileSync(this.filePath, json ,this.encoding)
        } catch (error) {
            throw new Error(`Error al escribir archivo ${this.filePath}`)
        }*/
    }


    //------------------------------------------------------------
}

export default FileContainer