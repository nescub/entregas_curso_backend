const { options } = require("../db_options/sqlite.js")
const knex = require("knex")(options)

knex.schema.createTable("messages", table => {
    table.string("author", 100).notNullable()
    table.string("dateTime", 100).notNullable()
    table.string("text", 1000).notNullable()
    table.increments("id",  { primaryKey: true })
})
    .then(() => console.log("tabla messages creada"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy()
        console.log("conexion destruida")
    })