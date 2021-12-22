// Server express aplicacion eCommerce (Backend) - Proyecto Final - Entrega 1

const express = require('express')
const { routerProducts } = require("./router/routerProducts.js")
const { routerCart } = require("./router/routerCart.js")
const getErrorDetail = require("./getErrorDetail.js")

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/productos', routerProducts)
app.use('/api/carrito', routerCart)

app.use('*', (req, res, next) => {
    const newError = new Error('Ruta no valida')
    newError.name = 'Bad Request'
    next(newError)
})

app.use((err, req, res, next) => {
    const errorDetail = getErrorDetail(err, req, res)    
    res.status(errorDetail.error).json(errorDetail)

})

//A continuacion: Levanto el server
const PORT = process.env.PORT || 8080   //para que se configure correctamente el puerto en glitch

const server = app.listen(PORT)

server.on('listening', () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});

server.on("error", error => console.log(`Error en servidor: ${error}`))