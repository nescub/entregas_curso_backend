const socket = io.connect();

function buscarPlantilla(ruta) {
    return fetch(ruta)
        .then(respuesta => respuesta.text())
};

async function renderizarProductos(productos) {
    const plantilla = await buscarPlantilla('/plantillas/productos.hbs');
    const template = Handlebars.compile(plantilla);                                 // compila la plantilla
    const context = { productos: productos, hayProductos: productos.length > 0 };
    const html = template(context);                                                 // genera el html
    
    document.getElementById('listaProductos').innerHTML = html;                     // inyecta el resultado en la vista
};

function insertarProducto(producto){   
    return fetch('/api/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(producto)
    })
        .then(response => response.json())  
};

async function agregarProducto() {
    const producto = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value
    };

    if ( producto.title.length == 0) {
        alert('Ingresar el nombre del producto');
    } else {
        if ( producto.price.length == 0) {
            alert('Ingresar el precio del producto');
        } else {
            if ( producto.thumbnail.length == 0) {
                alert('Ingresar la URL de la foto del producto');
            } else {
                await insertarProducto(producto);
            }
        }
    };
};

async function enviarMensaje() {
    const mensaje = {
        author: document.getElementById('message_dir_email').value,
        dateTime: new Date().toLocaleString(),
        text: document.getElementById('message_text').value
    };

    if ( mensaje.author.length == 0) {
        alert('Ingresar direccion de email');
    } else {
        if ( mensaje.text.length == 0) {
            alert('Ingresar mensaje');
        } else {
            socket.emit('nuevo-mensaje', mensaje);
        }
    };
};

function renderizarMensajes(mensajes) {
    const html = mensajes.map((elem, index) => {
        return(`<div>
            <strong style="color:blue;">${elem.author}</strong>
            <span style="color:brown;">[${elem.dateTime}]:</span>
            <em style="color:green;">${elem.text}</em>
            </div>`)
    }).join(" ");

    document.getElementById('listaMensajes').innerHTML = html;
};

socket.on('lista-productos', productos => { renderizarProductos(productos); });
socket.on('lista-mensajes', mensajes => { renderizarMensajes(mensajes); });


