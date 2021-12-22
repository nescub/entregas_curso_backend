// Creo el router productos

const { Router } = require('express')
const ProductManager = require('../business/ProductManager.js')
const midValidateAdminUser = require('./midValidateAdminUser.js')

const routerProducts = Router()
const productManager = new ProductManager()

//1.a
routerProducts.get('/', (req, res, next) => {
    try {
        res.json(productManager.getAllProducts())
    } catch (error) {
        next(error)
    }
})

//1.a
routerProducts.get('/:id', (req, res, next) => {
    try {
        res.json(productManager.getProductById(req.params.id))
    } catch (error) {
        next(error)
    }
})

//1.b
routerProducts.post('/', midValidateAdminUser, (req, res, next) => {
    try {
        res.json(productManager.insertProduct(req.body))
    } catch (error) {
        next(error)
    }
})

//1.c
routerProducts.put('/:id', midValidateAdminUser, (req, res, next) => {
    try {
        res.json(productManager.updateProduct(req.params.id, req.body))
    } catch (error) {
        next(error)
    }
})

//1.d
routerProducts.delete('/:id', midValidateAdminUser, (req, res, next) => {
    try {
        res.json(productManager.deleteProduct(req.params.id))
    } catch (error) {
        next(error)
    }
})

exports.routerProducts = routerProducts