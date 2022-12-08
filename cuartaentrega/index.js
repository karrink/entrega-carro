/*
POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
DELETE '/api/productos/:id' -> elimina un producto según su id.

-Cada producto estará representado por un objeto con el siguiente formato: {
  title: (nombre del producto),
  price: (precio),
  thumbnail: (url al logo o foto del producto)
}

-Cada ítem almacenado dispondrá de un id numérico proporcionado por el backend, comenzando en 1, y que se irá incrementando a medida de que se incorporen productos. Ese id será utilizado para identificar un producto que va a ser listado en forma individual.

-Para el caso de que un producto no exista, se devolverá el objeto:
{ error : 'producto no encontrado' }
-Implementar la API en una clase separada, utilizando un array como soporte de persistencia en memoria.
-Incorporar el Router de express en la url base '/api/productos' y configurar todas las subrutas en base a este.
-Crear un espacio público de servidor que contenga un documento index.html con un formulario de ingreso de productos con los datos apropiados.
-El servidor debe estar basado en express y debe implementar los mensajes de conexión al puerto 8080 y en caso de error, representar la descripción del mismo.
-Las respuestas del servidor serán en formato JSON. La funcionalidad será probada a través de Postman y del formulario de ingreso.

*/

const express = require('express');
const { Router } = express;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const productos = [{
  id: 1,
  title: 'azucar',
  price: 135,
  thumbnail:'url/azucar'
},{
  id: 2,
  title: 'harina',
  price: 246,
  thumbnail:'url/harina'
},{
  id: 3,
  title: 'aceite',
  price: 357,
  thumbnail:'url/aceite'
}];

const productosRouter = Router();

productosRouter.get('/productos', (req, res) => {
  res.json(productos)
});

productosRouter.get('/productos/:id', (req, res) => {
  let id = req.params.id
  let productosid = productos.find(item => item.id == id)
  res.json(productosid)
});

productosRouter.get('/guardar', (req, res) => {
  console.log(`I'm the route`);
  res.json(productos)
});

productosRouter.post('/guardar', (req, res) => {
  console.log(req.body);
  const productoToAdd = req.body;
  productos.push(productoToAdd);

  res.status(200).json({ added: productoToAdd });
});


app.use('/api', productosRouter);
const PORT = 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
