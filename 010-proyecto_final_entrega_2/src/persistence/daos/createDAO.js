import ProductDAOFirebase from './products/ProductDAOFirebase.js'
import ProductDAOMongoDB from './products/ProductDAOMongoDB.js'
import ProductDAOFile from './products/ProductDAOFile.js'
import ProductDAOMemory from './products/ProductDAOMemory.js'

import CartDAOFirebase from './carts/CartDAOFirebase.js'
import CartDAOMongoDB from './carts/CartDAOMongoDB.js'
import CartDAOFile from './carts/CartDAOFile.js'
import CartDAOMemory from './carts/CartDAOMemory.js'

import { getSystemConfigurationParameters } from '../../config/getSystemConfigurationParameters.js'

const parameters = getSystemConfigurationParameters()
const productPersistenceSupport = parameters.PRODUCT_PERSISTENCE_SUPPORT
const cartPersistenceSupport = parameters.CART_PERSISTENCE_SUPPORT

function createProductDAO () {    
    if (productPersistenceSupport == 'FIREBASE') 
        return new ProductDAOFirebase()
    else if (productPersistenceSupport == 'MONGODB')
        return new ProductDAOMongoDB()
    else if (productPersistenceSupport == 'FILE')
        return new ProductDAOFile()
    else if (productPersistenceSupport == 'MEMORY')
        return new ProductDAOMemory()
    else
        throw new Error('Soporte de persistencia de productos no valido')
}

function createCartDAO () {
    if (cartPersistenceSupport == 'FIREBASE') 
        return new CartDAOFirebase()
    else if (cartPersistenceSupport == 'MONGODB')
        return new CartDAOMongoDB()
    else if (cartPersistenceSupport == 'FILE')
        return new CartDAOFile()
    else if (cartPersistenceSupport == 'MEMORY')
        return new CartDAOMemory()
    else
        throw new Error('Soporte de persistencia de carritos no valido')
}

export  { createProductDAO, createCartDAO }