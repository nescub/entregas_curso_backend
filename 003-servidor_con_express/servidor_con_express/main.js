/* ENUNCIADO:
1- Realizar un proyecto de servidor basado en node.js que utilice el middleware express e implemente los siguientes endpoints en el puerto 8080:
    a - Ruta get '/productos' que devuelva un array con todos los productos disponibles en el servidor
    b - Ruta get '/productoRandom' que devuelva un producto elegido al azar entre todos los productos disponibles

2- Incluir un archivo de texto 'productos.txt' y utilizar la clase Contenedor del desafío anterior para acceder a los datos persistidos del servidor.

Antes de iniciar el servidor, colocar en el archivo 'productos.txt' tres productos como en el ejemplo del desafío anterior.
*/

const express = require('express')
const crearProductos = require('./funcion_crear_productos.js')

async function main() {
    const productos = await crearProductos()
    const app = express()

    app.get('/productos', (req, res) => {
        res.send(productos)
    })
     
    app.get('/productoRandom', (req, res) => {
        const indexRandom = parseInt(Math.random() * productos.length)
        res.send(productos[indexRandom])
    })

    const PORT = process.env.PORT || 8080
    
    const server = app.listen(PORT, () => {
        console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
     })
    
    server.on("error", error => console.log(`Error en servidor ${error}`))
}

main()
