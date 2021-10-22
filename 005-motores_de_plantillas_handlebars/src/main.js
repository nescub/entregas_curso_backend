//Levanta un server en el puerto 8080, con un motor de plantillas handlebars

const express = require('express');
const exphbs = require('express-handlebars');

const Contenedor = require('./class/contenedor.js')   //clase Contenedor

const contenedorProductos = new Contenedor()
const app = express();

app.use(express.urlencoded({ extended: true }))


//establecemos la configuracion de handelbars
app.engine(
    'hbs', 
    exphbs({
        extname: '.hbs',                //extension a utilizar (en lugar de .handelbars, la por defecto)
        defaultLayout: 'index.hbs'     //plantilla principal
    })
);

app.set('views', './views');     // especifica el directorio de vistas
app.set('view engine', 'hbs');   // registra el motor de plantillas

// Configuro rutas:

app.get('/', (req, res) => {
    res.render('formulario');
});

app.get('/productos', (req, res) => {
    const productos = contenedorProductos.getAll();
    res.render('tabla', { productos: productos, hayProductos: productos.length > 0 } );
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