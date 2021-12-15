const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const ContenedorBD = require('./class/contenedorBD.js')
const mysqlOptions = require("../db_options/mysql.js")
const sqliteOptions = require("../db_options/sqlite.js")

//Creo mi server io express
const app = express()
const httpServer = new HttpServer(app)
const ioServer = new IOServer(httpServer)

const contenedorProductos = new ContenedorBD(mysqlOptions.options, 'products')
const contenedorMensajes = new ContenedorBD(sqliteOptions.options, 'messages')

contenedorMensajes.deleteAll()

app.use(express.json())
app.use(express.static('public'))                   //Indicamos que queremos cargar los archivos estáticos que se encuentran en dicha carpeta
app.use(express.urlencoded({ extended: true }))     //Indicamos que vamos a recibir bodys que no solo son texto

//---------------------Configuro acciones websocket----------------------------
ioServer.on('connection', async socket => {
    console.log(`¡Nuevo cliente conectado: ${socket.id}!`)
    
    socket.emit('lista-productos', await contenedorProductos.getAll())
    socket.emit('lista-mensajes', await contenedorMensajes.getAll())

    socket.on('nuevo-mensaje', async mensaje => {        
        await contenedorMensajes.save(mensaje)
        ioServer.sockets.emit('lista-mensajes', await contenedorMensajes.getAll())
    })
})
//-----------------------------------------------------------------------------

//---------------------Configuro rutas de mi API REST-----------------------------------------
const errorProdNoEncontrado = { error : 'producto no encontrado' }

app.get('/api/productos', async (req, res) => {
    res.send(await contenedorProductos.getAll())
})

app.get('/api/productos/:id', async (req, res) => {
    const producto = await contenedorProductos.getById(req.params.id)

    if( producto == null) {
        return res.send(errorProdNoEncontrado)
    }

    res.send(producto)
})

app.post('/api/productos', async (req, res) => {
    const producto = await contenedorProductos.save(req.body)
    res.send(producto)
    ioServer.sockets.emit('lista-productos', await contenedorProductos.getAll())
});

app.delete('/api/productos/:id', async (req, res) => {
    const productoElimnido = await contenedorProductos.deleteById(req.params.id)
    
    if( productoElimnido == null) {
        return res.send(errorProdNoEncontrado)
    }
    res.send(productoElimnido)

    ioServer.sockets.emit('lista-productos', await contenedorProductos.getAll())
});

app.delete('/api/productos', async (req, res) => {
    const productosElimnidos = await contenedorProductos.deleteAll()
    res.send(productosElimnidos)
    ioServer.sockets.emit('lista-productos', await contenedorProductos.getAll())
})

//-----------------------------------------------------------------------------

//---------------------Levanto el server---------------------------------------
const PORT = process.env.PORT || 8080   //para que se configure correctamente el puerto en glitch

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })

server.on("error", error => console.log(`Error en servidor ${error}`))
//-----------------------------------------------------------------------------