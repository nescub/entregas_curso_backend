// Creo el router productos

import { Router } from 'express'
import ProductManager from '../../business/ProductManager.js'
import { midValidateAdminUser } from './midValidateAdminUser.js'

const routerProducts = Router()
const productManager = new ProductManager()

await productManager.initialize()

//1.a
routerProducts.get('/', async (req, res, next) => {
    try {
        res.json(await productManager.getAllProducts())
    } catch (error) {
        next(error)
    }
})

//1.a
routerProducts.get('/:id', async (req, res, next) => {
    try {
        res.json(await productManager.getProductById(req.params.id))
    } catch (error) {
        next(error)
    }
})

//1.b
routerProducts.post('/', midValidateAdminUser, async (req, res, next) => {
    try {
        res.json(await productManager.insertProduct(req.body))
    } catch (error) {
        next(error)
    }
})

//1.c
routerProducts.put('/:id', midValidateAdminUser, async (req, res, next) => {
    try {
        res.json(await productManager.updateProduct(req.params.id, req.body))
    } catch (error) {
        next(error)
    }
})

//1.d
routerProducts.delete('/:id', midValidateAdminUser, async (req, res, next) => {
    try {
        res.json(await productManager.deleteProduct(req.params.id))
    } catch (error) {
        next(error)
    }
})

export { routerProducts }