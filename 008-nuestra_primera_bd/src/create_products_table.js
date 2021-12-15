const { options } = require("../db_options/mysql.js")
const knex = require("knex")(options)

knex.schema.createTable("products", table => {
    table.string("title", 100).notNullable()
    table.float("price")
    table.string("thumbnail", 255).notNullable()
    table.increments("id",  { primaryKey: true })
})
    .then(() => console.log("tabla products creada"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy()
        console.log("conexion destruida")
    })