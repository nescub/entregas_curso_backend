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

async function main() {
    const contenedor = new ClaseContenedor('./productos.txt')

    await contenedor.save(objEscuadra)
    await contenedor.save(objCalculadora)
    await contenedor.save(objGlobo)

    const objects = await contenedor.getAll()
    console.log(`########## Objetos:\n`, objects)

    const objId1 = await contenedor.getById(1)
    const objId2 = await contenedor.getById(2)
    const objId3 = await contenedor.getById(3)

    console.log(`########## Objeto con ID 1:\n`, objId1)
    console.log(`########## Objeto con ID 2:\n`, objId2)
    console.log(`########## Objeto con ID 3:\n`, objId3)

    await contenedor.deleteById(2)
    const objectsSin2 = await contenedor.getAll()
    console.log(`########## Objetos sin dos:\n`, objectsSin2)

    await contenedor.deleteAll()
    const objectsVacio = await contenedor.getAll()
    console.log(`########## Objetos vacios:\n`, objectsVacio)
}

main()