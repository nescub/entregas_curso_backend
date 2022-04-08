// Creo el router de carritos de compras

import { Router } from 'express'
import CartManager from '../../business/CartManager.js'

const routerCart = Router()
const cartManager = new CartManager()

await cartManager.initialize()

routerCart.get('/:id', async (req, res, next) => {
    try {
        res.json(await cartManager.getCartById(req.params.id))
    } catch (error) {
        next(error)
    }
})

routerCart.get('/:id/productos', async (req, res, next) => {
    try {
        res.json(await cartManager.getProductsCartById(req.params.id))
    } catch (error) {
        next(error)
    }
})

routerCart.post('/', async (req, res, next) => {
    try {
        res.json(await cartManager.createCart())
    } catch (error) {
        next(error)
    }
})

routerCart.delete('/:id', async (req, res, next) => {
    try {
        res.json(await cartManager.deleteCart(req.params.id))
    } catch (error) {
        next(error)
    }
})

routerCart.post('/:id/productos/:productId/:productQuantity', async (req, res, next) => {
    try {
        const quantity = parseInt(req.params.productQuantity, 10)
        res.json(await cartManager.addItem(req.params.id, req.params.productId, quantity))
    } catch (error) {
        next(error)
    }
})

routerCart.delete('/:id/productos/:productId', async (req, res, next) => {
    try {
        res.json(await cartManager.deleteItem(req.params.id, req.params.productId))
    } catch (error) {
        next(error)
    }
})

export { routerCart }