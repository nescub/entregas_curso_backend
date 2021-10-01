// Server express que escucha en 8080 y gestiona productos

const express = require('express')
const { routerProductos } = require("./router/productos")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/productos', routerProductos)

app.use(express.static('public'));

//Configuro el puerto donde escucha el server y lo prendo

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })

server.on("error", error => console.log(`Error en servidor ${error}`))