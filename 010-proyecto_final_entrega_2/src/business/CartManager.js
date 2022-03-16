/* Formato del objeto cart:
    {
        id: number,              -> atributo agregado por el container
        timestamp: number,  
        items: [
            {
                quantity: number,
                product: {
                    id: number,
                    nombre: string,
                    descripcion: string,
                    codigo: string,
                    foto: string,
                    precio: number
                }    
            }
        ],
        
    }
*/

import { createCartDAO } from '../persistence/daos/createDAO.js'
import ProductManager from './ProductManager.js'

class CartManager {
    constructor() {
        this.cartDAO = createCartDAO()
        this.productManager = new ProductManager()
    }

    async initialize() {
        await this.cartDAO.connect()
    }

    async getCartById(id) {
        const cartGetted = await this.cartDAO.getById(id)
        this.validateCartGetted(id, cartGetted)
        return cartGetted
    }

    async getProductsCartById(id) {
        const cart = await this.getCartById(id)
        return cart.items
    }

    async createCart() {
        const newCart = { timestamp: Date.now(), items: [] }
        return await this.cartDAO.save(newCart)   
    }

    async deleteCart(id){
        const cartDeleted = await this.cartDAO.deleteById(id)
        this.validateCartGetted(id, cartDeleted) 
        return cartDeleted
    }

    async getItems(id) {
        return await this.getCartById(id).items
    }

    async addItem(cartId, productId, productQuantity) {
        const cart = await this.getCartById(cartId)
        const product = await this.productManager.getProductById(productId)
        this.validateItemQuantity(productQuantity)

        const newItem = {
            quantity: productQuantity,
            product: { 
                id: product.id, 
                nombre: product.nombre,
                descripcion: product.descripcion,
                codigo: product.codigo,
                foto: product.foto,
                precio: product.precio
            }    
        }

        cart.items.push(newItem) 
        await this.cartDAO.update(cartId, cart)

        return cart
    }

    async deleteItem(cartId, productId) {
        const cart = await this.getCartById(cartId)

        for(let i =0; i < cart.items.length; i++) {
            if (cart.items[i].product.id == productId) {
                cart.items.splice(i, 1)
                await this.cartDAO.update(cartId, cart)
                
                return cart
            }
        }

        throw new Error(`No existe un item en el carrito id ${cartId} con producto id ${productId}`)
    }

    validateCartGetted(id, cartGetted) {
        if (cartGetted == null) {
            const newError = new Error(`No existe un carrito de compras con id igual a ${id}`)
            newError.name = 'NotFound'
            throw newError
        }
    }

    validateItemQuantity(productQuantity) {
        if(!((Number.isInteger(productQuantity)) && (productQuantity > 0))) {
            throw new Error('La cantidad de un producto en un carrito debe ser un numero entero mayor a 0')
        }
    }
}

export default CartManager