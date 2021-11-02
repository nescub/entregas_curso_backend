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

class ContenedorArchivo {
    constructor(filePath) {
        this.filePath = filePath;
        this.idCount = 0;
        this.encoding = 'utf-8';
        this.objects = [];
    }

    async read(){
        try {
            const json = await fs.promises.readFile(this.filePath,this.encoding)
            this.objects = JSON.parse(json)
        }
        catch (error) {
            this.objects = []   //considero que no existe si falla el read
        }
    }

    async write(){
        try {
            const json = JSON.stringify(this.objects, null, 2)
            await fs.promises.writeFile(this.filePath, json ,this.encoding)
        }
        catch (error) {
            throw new Error(`Error al escribir: ${error.message}`)
        }
    }

    async save(objectNew){
        await this.read()
        this.idCount = this.idCount + 1
        objectNew.id = this.idCount

        this.objects.push(objectNew)
        await this.write()

        return objectNew.id
    }

    async indexById(objectId) {
        await this.read()
        
        for (let i = 0; i < this.objects.length; i++) {
            if ( (this.objects[i]).id == objectId ) {
               return i
            }
         }
        
        return null
    }

    async getById(objectId) {
        const index = await this.indexById(objectId)
        
        if(index == null){
            return null
        }
        
        return this.objects[index]
    }

    async getAll() {
        await this.read()

        return this.objects
    }

    async deleteById(objectId) {
        const index = await this.indexById(objectId) //actualiza this.objects
       
        if(index != null) {
            this.objects.splice(index, 1)
            await this.write()
        }
    }

    async deleteAll(){
        this.objects = []
        await this.write()
    }
}

module.exports = ContenedorArchivo