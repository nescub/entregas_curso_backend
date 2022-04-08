// Creo el router de ordenes de compra

import { Router } from 'express'
import OrderManager from '../../business/OrderManager.js'

const routerOrders = Router()
const orderManager = new OrderManager()

await orderManager.initialize()

routerOrders.get('/:id', async (req, res, next) => {
    try {
        res.json(await orderManager.getOrderById(req.params.id))
    } catch (error) {
        next(error)
    }
})

routerOrders.post('/', async (req, res, next) => {
    try {
        res.json(await orderManager.createOrder(req.user, req.body.cartId, req.body.direccion_entrega))
    } catch (error) {
        next(error)
    }
})

routerOrders.delete('/:id', async (req, res, next) => {
    try {
        res.json(await orderManager.deleteOrder(req.params.id))
    } catch (error) {
        next(error)
    }
})

export { routerOrders }