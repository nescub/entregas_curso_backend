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

const FileContainer = require('../persistence/FileContainer.js')
const ProductManager = require('../business/ProductManager.js')

class CartManager {
    constructor() {
        this.container = new FileContainer('./data/carts.txt')
        this.productManager = new ProductManager()
    }

    getCartById(id) {
        const cartGetted = this.container.getById(id)
        this.validateCartGetted(id, cartGetted)
        return cartGetted
    }

    createCart() {
        const newCart = { timestamp: Date.now(), items: [] }
        return this.container.save(newCart)   
    }

    deleteCart(id){
        const cartDeleted = this.container.deleteById(id)
        this.validateCartGetted(id, cartDeleted) 
        return cartDeleted
    }

    getItems(id) {
        return this.getCartById(id).items
    }

    addItem(cartId, productId, productQuantity) {
        const cart = this.getCartById(cartId)
        const product = this.productManager.getProductById(productId)
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
        this.container.update(cartId, cart)

        return cart
    }

    deleteItem(cartId, productId) {
        const cart = this.getCartById(cartId)

        for(let i =0; i < cart.items.length; i++) {
            if (cart.items[i].product.id == productId) {
                cart.items.splice(i, 1)
                this.container.update(cartId, cart)
                
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

module.exports = CartManager