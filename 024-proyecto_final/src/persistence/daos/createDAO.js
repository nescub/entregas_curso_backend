import { config } from '../../config/config.js'

//Productos:

import ProductDAOFirebase from './products/ProductDAOFirebase.js'
import ProductDAOMongoDB from './products/ProductDAOMongoDB.js'
import ProductDAOFile from './products/ProductDAOFile.js'
import ProductDAOMemory from './products/ProductDAOMemory.js'

const productPersistenceSupport = config.PRODUCT_PERSISTENCE_SUPPORT

function createProductDAO() {    
    if (productPersistenceSupport == 'FIREBASE') 
        return new ProductDAOFirebase(config.PATH_FIREBASE_ADMIN_SDK_JSON)
    else if (productPersistenceSupport == 'MONGODB')
        return new ProductDAOMongoDB(config.CONNECTION_STRING_MONGODB)
    else if (productPersistenceSupport == 'FILE')
        return new ProductDAOFile()
    else if (productPersistenceSupport == 'MEMORY')
        return new ProductDAOMemory()
    else
        throw new Error('Soporte de persistencia de productos no valido')
}

//Carrito:

import CartDAOFirebase from './carts/CartDAOFirebase.js'
import CartDAOMongoDB from './carts/CartDAOMongoDB.js'
import CartDAOFile from './carts/CartDAOFile.js'
import CartDAOMemory from './carts/CartDAOMemory.js'

const cartPersistenceSupport = config.CART_PERSISTENCE_SUPPORT

function createCartDAO() {
    if (cartPersistenceSupport == 'FIREBASE') 
        return new CartDAOFirebase(config.PATH_FIREBASE_ADMIN_SDK_JSON)
    else if (cartPersistenceSupport == 'MONGODB')
        return new CartDAOMongoDB(config.CONNECTION_STRING_MONGODB)
    else if (cartPersistenceSupport == 'FILE')
        return new CartDAOFile()
    else if (cartPersistenceSupport == 'MEMORY')
        return new CartDAOMemory()
    else
        throw new Error('Soporte de persistencia de carritos no valido')
}

//Usuario:

import UserDAOFirebase from './users/UserDAOFirebase.js'
import UserDAOMongoDB from './users/UserDAOMongoDB.js'
import UserDAOFile from './users/UserDAOFile.js'
import UserDAOMemory from './users/UserDAOMemory.js'

const userPersistenceSupport = config.USER_PERSISTENCE_SUPPORT

function createUserDAO() {    
    if (userPersistenceSupport == 'FIREBASE') 
        return new UserDAOFirebase(config.PATH_FIREBASE_ADMIN_SDK_JSON)
    else if (userPersistenceSupport == 'MONGODB')
        return new UserDAOMongoDB(config.CONNECTION_STRING_MONGODB)
    else if (userPersistenceSupport == 'FILE')
        return new UserDAOFile()
    else if (userPersistenceSupport == 'MEMORY')
        return new UserDAOMemory()
    else
        throw new Error('Soporte de persistencia de usuarios no valido')
}

//Mensaje:

import MessageDAOFirebase from './messages/MessageDAOFirebase.js'
import MessageDAOMongoDB from './messages/MessageDAOMongoDB.js'
import MessageDAOFile from './messages/MessageDAOFile.js'
import MessageDAOMemory from './messages/MessageDAOMemory.js'

const messagePersistenceSupport = config.MESSAGE_PERSISTENCE_SUPPORT

function createMessageDAO() {
    if (messagePersistenceSupport == 'FIREBASE') 
        return new MessageDAOFirebase(config.PATH_FIREBASE_ADMIN_SDK_JSON)
    else if (messagePersistenceSupport == 'MONGODB')
        return new MessageDAOMongoDB(config.CONNECTION_STRING_MONGODB)
    else if (messagePersistenceSupport == 'FILE')
        return new MessageDAOFile()
    else if (messagePersistenceSupport == 'MEMORY')
        return new MessageDAOMemory()
    else
        throw new Error('Soporte de persistencia de mensajes no valido')
}

//Orden:

import OrderDAOFirebase from './orders/OrderDAOFirebase.js'
import OrderDAOMongoDB from './orders/OrderDAOMongoDB.js'
import OrderDAOFile from './orders/OrderDAOFile.js'
import OrderDAOMemory from './orders/OrderDAOMemory.js'

const orderPersistenceSupport = config.ORDER_PERSISTENCE_SUPPORT

function createOrderDAO() {
    if (orderPersistenceSupport == 'FIREBASE') 
        return new OrderDAOFirebase(config.PATH_FIREBASE_ADMIN_SDK_JSON)
    else if (orderPersistenceSupport == 'MONGODB')
        return new OrderDAOMongoDB(config.CONNECTION_STRING_MONGODB)
    else if (orderPersistenceSupport == 'FILE')
        return new OrderDAOFile()
    else if (orderPersistenceSupport == 'MEMORY')
        return new OrderDAOMemory()
    else
        throw new Error('Soporte de persistencia de ordenes de compra no valido')
}

export { createProductDAO, createCartDAO, createUserDAO, createMessageDAO, createOrderDAO }