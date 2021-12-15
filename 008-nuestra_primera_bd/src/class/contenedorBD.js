const knexLib = require("knex")

class ContenedorBD {
    constructor(config, tableName) {
        this.knex = knexLib(config)
        this.tableName = tableName
    }

    async save(objectNew){
        return await this.knex(this.tableName).insert(objectNew)
    }

    async getById(objectId) {
        const rows = await this.knex(this.tableName).select("*").where("id", "=", objectId)
        const objects = JSON.parse((JSON.stringify(rows)))
        
        if(objects.length == 0){
            return null
        }
        
        return objects[0]
    }

    async getAll() {
        const rows = await this.knex(this.tableName).select("*")
        return JSON.parse((JSON.stringify(rows)))
    }

    async deleteById(objectId) {
        const object = await this.getById(objectId)

        if( object != null) {
            await this.knex.from(this.tableName).where('id', objectId).del()
        }

        return object
    }

    async deleteAll(){
        const objects = await this.getAll()
        await this.knex.from(this.tableName).del()
        return objects
    }
}

module.exports = ContenedorBD