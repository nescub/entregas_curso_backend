/* Formato del objeto product:
    {
        id: number              -> atributo agregado por el container
        nombre: string,
        descripcion: string,
        codigo: string,
        foto: string,
        precio: number,
        stock: number,
        timestamp: number
    }
*/

import { createProductDAO } from '../persistence/daos/createDAO.js'

class ProductManager {
    constructor() {
        this.productDAO = createProductDAO()
    }

    async initialize() {
        await this.productDAO.connect()
    }

    static get productKeys() {
        return [ 'nombre', 'descripcion', 'codigo', 'foto', 'precio', 'stock' ]
    }
    
    static get productKeysString() {
        return [ 'nombre', 'descripcion', 'codigo', 'foto' ]
    }

    static get productKeysNumber() {
        return [ 'precio', 'stock' ]
    }

    async getAllProducts() {
        return await this.productDAO.getAll()
    }

    async getProductById(id) {
        const productGetted = await this.productDAO.getById(id)
        this.validateProductGetted(id, productGetted)
        return productGetted
    }

    async insertProduct(newProduct) {
        this.validateNewProduct(newProduct)
        newProduct.timestamp = Date.now()
        return await this.productDAO.save(newProduct)   
    }

    async updateProduct(id, newProduct){
        this.validateUpdateProduct(newProduct)
        newProduct.timestamp = Date.now()
        const productUpdated = await this.productDAO.update(id, newProduct)
        this.validateProductGetted(id, productUpdated)       
        return productUpdated
    }

    async deleteProduct(id){
        const productDeleted = await this.productDAO.deleteById(id)
        this.validateProductGetted(id, productDeleted) 
        return productDeleted
    }

    validateNewProduct(newProduct) {
        ProductManager.productKeys.forEach(function(element, index, array){
            if(!(Object.keys(newProduct).includes(element))){
                throw new Error(`Atributo con nombre ${element} no definido`)
            }
        })
        
        this.basicValidate(newProduct) 
    }

    validateUpdateProduct(newProduct) {
        if (Object.keys(newProduct).length == 0) {
            throw new Error('No se han espefificado atributos a actualizar')     
        }
        
        this.basicValidate(newProduct) 
    }

    basicValidate(newProduct) {
        for (const property in newProduct) {
            if(!(ProductManager.productKeys.includes(property))){
                throw new Error(`Un producto no puede tener un atributo con nombre ${property}`)
            }
            
            if ((ProductManager.productKeysString.includes(property)) && (!((typeof newProduct[property] == 'string') && (newProduct[property].length != 0)))) {
                throw new Error(`El atributo ${property} debe ser un string no vacio`) 
            }

            if ((ProductManager.productKeysNumber.includes(property)) && (typeof newProduct[property] != 'number')) {
                throw new Error(`El atributo ${property} debe ser un number`)     
            }
        }
    }

    validateProductGetted(id, productGetted) {
        if (productGetted == null) {
            const newError = new Error(`No existe un producto con id igual a ${id}`)
            newError.name = 'NotFound'
            throw newError
        }
    }
}

export default ProductManager