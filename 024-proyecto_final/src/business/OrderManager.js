/* Formato del objeto order:
    {
        id: number,              -> atributo agregado por el container
        dateTime: string,
        total: number,
        user: {
            id: number,
            nombre: string,
            apellido: string,
            email: string
        },
        direccion_entrega: string,
        estado: string,
        items: [
            {
                productId: number,
                quantity: number,
                subTotal: number,
                productDetail: {
                    nombre: string,
                    descripcion: string,
                    codigo: string,
                    foto: string,
                    precio: number
                }
            }
        ]
    }
*/

import { createOrderDAO } from '../persistence/daos/createDAO.js'
import CartManager from './CartManager.js'
import EmailManager from './EmailManager.js'
import { config } from '../config/config.js'

class OrderManager {
    constructor() {
        this.orderDAO = createOrderDAO()
        this.cartManager = new CartManager()
        this.emailManager = new EmailManager()
    }

    async initialize() {
        await this.orderDAO.connect()
    }

    async getOrderById(id) {
        const orderGetted = await this.orderDAO.getById(id)
        this.validateOrderGetted(id, orderGetted)
        return orderGetted
    }

    async createOrder(user, cartId, direccion_entrega) {
        const cart = await this.cartManager.getCartById(cartId)

        if (cart.items.length == 0) {
            throw new Error(`Error no existen productos cargados en el carrito con id ${cartId}`)
        }
       
        const newOrder = this.basicCreateOrder(user, direccion_entrega)
        this.setOrderItems(newOrder, cart)
       
        const orderPersisted = await this.orderDAO.save(newOrder)

        await this.cartManager.deleteCart(cartId)

        this.notifyNewOrder(orderPersisted)

        return orderPersisted
    }

    basicCreateOrder(user, direccion_entrega) {
        return {
            dateTime: new Date().toLocaleString(),
            total: 0,
            user: { id: user.id, nombre: user.nombre, apellido: user.apellido, email: user.email },
            direccion_entrega: direccion_entrega,
            estado: 'generada',
            items: []
        }
    }

    setOrderItems(order, cart) {
        order.total = 0

        for(let i =0; i < cart.items.length; i++) {
            const cartItem = cart.items[i]

            const newItem = {
                productId: cartItem.product.id,
                quantity: cartItem.quantity,
                subTotal: cartItem.quantity * cartItem.product.precio,
                productDetail: {
                    nombre: cartItem.product.nombre,
                    descripcion: cartItem.product.descripcion,
                    codigo: cartItem.product.codigo,
                    foto: cartItem.product.foto,
                    precio: cartItem.product.precio
                }
            }

            order.items.push(newItem)
            order.total = order.total + newItem.subTotal
        }
    }

    async deleteOrder(id){
        const orderDeleted = await this.orderDAO.deleteById(id)
        this.validateOrderGetted(id, orderDeleted) 
        return orderDeleted
    }

    validateOrderGetted(id, orderGetted) {
        if (orderGetted == null) {
            const newError = new Error(`No existe una orden de compra con id igual a ${id}`)
            newError.name = 'NotFound'
            throw newError
        }
    }
    
    notifyNewOrder(newOrder) {
        const to = config.EMAIL_ADDRESS_NOTIFICATION_ORDER
        const subject = `Se crea orden de compra id: ${newOrder.id}`
        const text = `Se crea orden de compra:\n${JSON.stringify(newOrder, null, 2)}`

        this.emailManager.sendMail(this.emailManager.createMailDataText(to, subject, text))   
    }

}

export default OrderManager