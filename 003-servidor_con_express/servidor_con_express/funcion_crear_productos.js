const ClaseContenedor = require('./contenedor.js')

const objEscuadra = {
    title: 'Escuadra',
    price: 123.45,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
}                                                                                                                                       

const objCalculadora = {
    title: 'Calculadora',
    price: 234.56,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
}

const objGlobo = {
    title: 'Globo Terráqueo',
    price: 345.67,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
}                                                                                                                                                    

async function crearProductos() {
    const contenedor = new ClaseContenedor('./productos.txt')

    await contenedor.deleteAll() //vacio los productos

    await contenedor.save(objEscuadra)
    await contenedor.save(objCalculadora)
    await contenedor.save(objGlobo)
    
    return await contenedor.getAll()
}

module.exports = crearProductos