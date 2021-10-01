// Creo el router productos

const { Router } = require('express')
const Contenedor = require('../class/contenedor.js')   //clase Contenedor

const routerProductos = Router()
const contenedorProductos = new Contenedor()
const errorProdNoEncontrado = { error : 'producto no encontrado' }

routerProductos.get('/', (req, res) => {
    res.send(contenedorProductos.getAll())
})
 
routerProductos.get('/:id', (req, res) => {
    const producto = contenedorProductos.getById(req.params.id)

    if( producto == null) {
        return res.send(errorProdNoEncontrado)
    }

    res.send(producto)
})

routerProductos.post('/', (req, res) => {
    res.send(contenedorProductos.save(req.body))
})

routerProductos.put('/:id', (req, res) => {
    const productoActualizado = contenedorProductos.update(req.params.id, req.body)

    if( productoActualizado == null) {
        return res.send(errorProdNoEncontrado)
    }

    res.send(productoActualizado)
})

routerProductos.delete('/:id', (req, res) => {
    const productoElimnido = contenedorProductos.deleteById(req.params.id)
    
    if( productoElimnido == null) {
        return res.send(errorProdNoEncontrado)
    }
    res.send(productoElimnido)
})

exports.routerProductos = routerProductos