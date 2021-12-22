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

// Sirvio para hacer las primeras pruebas; pero para crear carrito necesito persitencia en disco:
// const MemoryContainer = require('../persistence/MemoryContainer.js') 

const FileContainer = require('../persistence/FileContainer.js')

class ProductManager {
    constructor() {
        this.container = new FileContainer('./data/products.txt')
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

    getAllProducts() {
        return this.container.getAll()
    }

    getProductById(id) {
        const productGetted = this.container.getById(id)
        this.validateProductGetted(id, productGetted)
        return productGetted
    }

    insertProduct(newProduct) {
        this.validateNewProduct(newProduct)
        newProduct.timestamp = Date.now()
        return this.container.save(newProduct)   
    }

    updateProduct(id, newProduct){
        this.validateUpdateProduct(newProduct)
        newProduct.timestamp = Date.now()
        const productUpdated = this.container.update(id, newProduct)
        this.validateProductGetted(id, productUpdated)       
        return productUpdated
    }

    deleteProduct(id){
        const productDeleted = this.container.deleteById(id)
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

module.exports = ProductManager