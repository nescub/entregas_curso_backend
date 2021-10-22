//Levanta un server en el puerto 8080, con un motor de plantillas ejs

const express = require('express');
const Contenedor = require('./class/contenedor.js')   //clase Contenedor

const contenedorProductos = new Contenedor()
const app = express();

app.use(express.urlencoded({ extended: true }))

app.set('views', './views');     // especifica el directorio de vistas
app.set('view engine', 'ejs');   // registra el motor de plantillas

// Configuro rutas:

app.get('/', (req, res) => {
    res.render('formulario');
});

app.get('/productos', (req, res) => {
    res.render('tabla', { productos: contenedorProductos.getAll() } );
});

app.post('/productos', (req, res) => {
    contenedorProductos.save(req.body);
    console.log(contenedorProductos);
    res.redirect('/');
});

// Levanto el server:

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 });
server.on("error", error => console.log(`Error en servidor ${error}`));