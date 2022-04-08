// Server express aplicacion eCommerce (Backend) - Proyecto Final
import { config } from './config/config.js'
import express from 'express'
import { createServer } from 'http'
import { routerProducts } from './server_controller/router/routerProducts.js'
import { routerCart } from './server_controller/router/routerCart.js'
import { routerUsers } from './server_controller/router/routerUsers.js'
import { routerOrders } from './server_controller/router/routerOrders.js'
import { createWebSocket, getMessage } from './server_controller/chat.js'
import { systemConfig } from './server_controller/systemConfig.js'
import { accessToken, authentication } from './server_controller/authentication.js'
import { getErrorDetail } from './server_controller/getErrorDetail.js'

const app = express()
const httpServer = createServer(app)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

//Configuro acciones websocket
createWebSocket(httpServer)

// Configuro rutas API REST
app.post('/api/accessToken', accessToken)        //Obtencion de token JWT
app.get('/api/config', systemConfig)         //Obtencion de la configuracion
app.get('/api/chat/:email', getMessage)

app.use('/api/usuarios', routerUsers)
app.use('/api/productos', authentication, routerProducts)
app.use('/api/carrito', authentication, routerCart)
app.use('/api/ordenes', authentication, routerOrders)

//Rutas no validas
app.use('*', (req, res, next) => {
    const newError = new Error('Ruta no valida')
    newError.name = 'Bad Request'
    next(newError)
})

//Manejo de errores
app.use((err, req, res, next) => {
    const errorDetail = getErrorDetail(err, req, res)    
    res.status(errorDetail.error).json(errorDetail)

})

//A continuacion: Levanto el server
const PORT = process.env.PORT || config.SERVER_LISTENING_PORT   //para que se configure correctamente el puerto en glitch

const server = httpServer.listen(PORT)

server.on('listening', () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});

server.on("error", error => console.log(`Error en servidor: ${error}`))

