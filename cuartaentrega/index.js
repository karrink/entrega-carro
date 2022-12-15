/*
PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
DELETE '/api/productos/:id' -> elimina un producto según su id.

Cada producto estará representado por un objeto con el siguiente formato:
Cada ítem almacenado dispondrá de un id numérico proporcionado por el backend, comenzando en 1, y que se irá incrementando a medida de que se incorporen productos. Ese id será utilizado para identificar un producto que va a ser listado en forma individual.

Para el caso de que un producto no exista, se devolverá el objeto:
{ error : 'producto no encontrado' }
Implementar la API en una clase separada, utilizando un array como soporte de persistencia en memoria.
Incorporar el Router de express en la url base '/api/productos' y configurar todas las subrutas en base a este.
Crear un espacio público de servidor que contenga un documento index.html con un formulario de ingreso de productos con los datos apropiados.
El servidor debe estar basado en express y debe implementar los mensajes de conexión al puerto 8080 y en caso de error, representar la descripción del mismo.
Las respuestas del servidor serán en formato JSON. La funcionalidad será probada a través de Postman y del formulario de ingreso.

/* */

const express = require('express');
const app = express();
const productosRouter = express.Router();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
const PORT = 8080;


class Contenedor {
    constructor() {
        this.id = 1;
        this.content = [];
    }

    save = (producto) => {
        producto.id = this.id;
        this.content.push(producto);
        this.id ++;

        return producto.id;
    }

    getById = (id) => {
        const producto = this.content.find(element => element.id === id);
        return producto ? producto : null;
    }

    getAll = () => this.content;

    deleteById = (id) => {
        const updatedContent = this.content.filter(element => element.id !== id);
        this.content = updatedContent;
    }

    deleteAll = () => {
        this.content = [];
    }
};

const productosClass = new Contenedor();

productosRouter.post('/guardar', (req, res) => {
    const productos = req.body;
    const id = productosClass.save(productos);

    res.send(id.toString());
});

productosRouter.get('/', (req, res) => {
    const productos = productosClass.getAll();

    res.json(productos);
});

productosRouter.get('/:Id', (req, res) => {
    const productoId = req.params.productoId;
    const productos = productosClass.getById(Number(productoId));

    res.json(productos);
});

productosRouter.delete('/:Id', (req, res) => {
    const productoId = req.params.productoId;
    const productos = productosClass.deleteById(Number(productoId));
// No logrado
    res.json(productos);
});

productosRouter.put('/:Id', (req, res) => {
// No logrado
});

app.use('/api/productos', productosRouter);
const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
server.on('error', err => console.log(`Error: ${err}`));