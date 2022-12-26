/* 
Consigna:  
1.Utilizando la misma API de productos del proyecto entregable de la clase anterior, construir un web server (no REST) que incorpore:
  a)Un formulario de carga de productos en la ruta raíz (configurar la ruta '/productos' para recibir el POST, y redirigir al mismo formulario).
  b)Una vista de los productos cargados (utilizando plantillas de handlebars) en la ruta GET '/productos'.
  c)Ambas páginas contarán con un botón que redirija a la otra.  
2.Manteniendo la misma funcionalidad reemplazar el motor de plantillas handlebars por pug.
3.Manteniendo la misma funcionalidad reemplazar el motor de plantillas handlebars por ejs.
4.Por escrito, indicar cuál de los tres motores de plantillas prefieres para tu proyecto y por qué.
*/

const express = require('express')
const productRouter = require('./routes/productRouter')
const products = require('./class/productsClass')
const path = require ("path")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//---------PLANTILLAS
app.set('views', path.resolve(__dirname, './views'))


/*
//---------------------------------------------- HBS
const {engine}=require("express-handlebars")
app.engine("handlebars", engine())
app.set("view engine", "handlebars")

app.get('/', (req, res) => {
  res.render('hbs/form')
})

app.get('/productos', async (req, res) => {
  let productos = await products.getAll()
  res.render('hbs/table', { productos })
})
*/

/*
//----------------------------------------------- PUG
app.set('view engine', "pug")

app.get('/', (req, res) => {
  res.render('pug/form.pug')
})

app.get('/productos', async (req, res) => {
  let productos = await products.getAll()
  res.render('pug/table.pug', { productos })
})
*/


//----------------------------------------------- EJS
app.set('view engine', "ejs")

app.get('/', (req, res) => {
  res.render('ejs/form.ejs')
})

app.get('/productos', async (req, res) => {
  let productos = await products.getAll()
  res.render('ejs/table.ejs', { productos })
})


//-------- FIN PLANTILLAS


//----- API ROUTER productRouter
app.use('/api', productRouter)



//-----SERVER ON
const PORT = 8080
const server = app.listen(PORT, () =>
	console.log(`Server running on port ${PORT}`)
)

server.on('error', err => console.log(`Error: ${err}`));
