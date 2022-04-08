// Creo el router productos

import { Router } from 'express'
import ProductManager from '../../business/ProductManager.js'
import { validateAdminUser } from '../validateAdminUser.js'

const routerProducts = Router()
const productManager = new ProductManager()

await productManager.initialize()

routerProducts.get('/', async (req, res, next) => {
    try {
        res.json(await productManager.getAllProducts())
    } catch (error) {
        next(error)
    }
})

routerProducts.get('/:id', async (req, res, next) => {
    try {
        res.json(await productManager.getProductById(req.params.id))
    } catch (error) {
        next(error)
    }
})

routerProducts.post('/', validateAdminUser, async (req, res, next) => {
    try {
        res.json(await productManager.insertProduct(req.body))
    } catch (error) {
        next(error)
    }
})

routerProducts.put('/:id', validateAdminUser, async (req, res, next) => {
    try {
        res.json(await productManager.updateProduct(req.params.id, req.body))
    } catch (error) {
        next(error)
    }
})

routerProducts.delete('/:id', validateAdminUser, async (req, res, next) => {
    try {
        res.json(await productManager.deleteProduct(req.params.id))
    } catch (error) {
        next(error)
    }
})

export { routerProducts }