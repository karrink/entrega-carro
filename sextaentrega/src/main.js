/* 
Consigna 1:  Modificar el último entregable para que disponga de un canal de websocket que permita representar, por debajo del formulario de ingreso,
una tabla con la lista de productos en tiempo real. 
Puede haber varios clientes conectados simultáneamente y en cada uno de ellos se reflejarán los cambios que se realicen en los productos sin necesidad de recargar la vista.
Cuando un cliente se conecte, recibirá la lista de productos a representar en la vista.

>> Aspectos a incluir en el entregable:
Para construir la tabla dinámica con los datos recibidos por websocket utilizar Handlebars en el frontend. Considerar usar archivos públicos para alojar
la plantilla vacía, y obtenerla usando la función fetch( ). Recordar que fetch devuelve una promesa.
>> Consigna 2:  Añadiremos al proyecto un canal de chat entre los clientes y el servidor.

>> Aspectos a incluir en el entregable:
En la parte inferior del formulario de ingreso se presentará el centro de mensajes almacenados en el servidor, donde figuren los mensajes de todos los usuarios identificados por su email. 
El formato a representar será: email (texto negrita en azul) [fecha y hora (DD/MM/YYYY HH:MM:SS)](texto normal en marrón) : mensaje (texto italic en verde) 
Además incorporar dos elementos de entrada: uno para que el usuario ingrese su email (obligatorio para poder utilizar el chat) y otro para ingresar mensajes y enviarlos mediante un botón. 
Los mensajes deben persistir en el servidor en un archivo (ver segundo entregable).


*/

const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')
const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const productRouter = require('../routes/productRouter')

const path = require ("path")

const { products, chat } = require('../class/productsClass')



//-------- middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))


//-------------------------------------------------
//------------------------------------------SOCKET
io.on('connection', async socket => {
  console.log('Nuevo cliente conectado!')

  //------ tabla inicial
  socket.emit('productos', await products.getAll())
 
  //------ nuevo producto
  socket.on('update', async producto => {
      await products.save( producto )
      io.sockets.emit('productos', await products.getAll())
  })

  
  //----- chat inicial
  socket.emit('mensajes', await chat.getAll());

  //----- nuevo mensaje
  socket.on('newMsj', async mensaje => {
      mensaje.date = new Date().toLocaleString()
      await chat.save( mensaje )
      io.sockets.emit('mensajes', await chat.getAll());
  })

})


//-------------------
//---------PLANTILLAS
app.set('views', path.resolve(__dirname, '../public'))
app.set('view engine', "ejs")

app.get('/', (req, res) => {
  res.render('form.ejs')
})



//-----------------------------------
//----- API REST ROUTER productRouter
app.use('/api', productRouter)



//-----SERVER ON
const PORT = 8080
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))
