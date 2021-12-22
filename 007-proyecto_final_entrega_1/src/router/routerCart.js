// Creo el router de carritos de compras

const { Router } = require('express')
const CartManager = require('../business/CartManager.js')

const routerCart = Router()
const cartManager = new CartManager()

//2.c
routerCart.get('/:id', (req, res, next) => {
    try {
        res.json(cartManager.getCartById(req.params.id))
    } catch (error) {
        next(error)
    }
})

//2.a
routerCart.post('/', (req, res, next) => {
    try {
        res.json(cartManager.createCart())
    } catch (error) {
        next(error)
    }
})

//2.b
routerCart.delete('/:id', (req, res, next) => {
    try {
        res.json(cartManager.deleteCart(req.params.id))
    } catch (error) {
        next(error)
    }
})

//2.d
routerCart.post('/:id/productos/:productId/:productQuantity', (req, res, next) => {
    try {
        const quantity = parseInt(req.params.productQuantity, 10)
        res.json(cartManager.addItem(req.params.id, req.params.productId, quantity))
    } catch (error) {
        next(error)
    }
})

//2.e
routerCart.delete('/:id/productos/:productId', (req, res, next) => {
    try {
        res.json(cartManager.deleteItem(req.params.id, req.params.productId))
    } catch (error) {
        next(error)
    }
})

exports.routerCart = routerCart