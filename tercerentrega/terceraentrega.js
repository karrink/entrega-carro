/*
>> Consigna:
Realizar un proyecto de servidor basado en node.js que utilice el módulo express e implemente los siguientes endpoints en el puerto 8080:
Ruta get '/productos' que devuelva un array con todos los productos disponibles en el servidor
Ruta get '/productoRandom' que devuelva un producto elegido al azar entre todos los productos disponibles
Incluir un archivo de texto 'productos.txt' y utilizar la clase Contenedor del desafío anterior para acceder a los datos persistidos del servidor.

Antes de iniciar el servidor, colocar en el archivo 'productos.txt' tres productos como en el ejemplo del desafío anterior.
/* */

const express = require('express')
const app = express();
const PORT = 8080;
const fs = require ('fs')


app.get('/', (req, res) => {
    res.send("Hola mundo!")
});

app.get('/productos', (req, res) =>{
    async function getProducts(){
        let products = await productos.getAll();
        res.send(products);
    }
    getProducts();
});

app.get('/productoRandom', (req, res) => {
    async function getProductsRandom(){
        let productsRandom = await productos.getAll[Math.floor(Math.random() * productos.length)];
        res.send(productsRandom)
    };
    getProductsRandom();
});

app.listen(PORT, () => console.log(`Listening in port ${PORT}`));


class Contenedor {
    constructor(file){
        this.file = file
    };

async getAll(){
    try{
        const objects = await fs.promises.readFile( this.file, 'utf-8')
        return JSON.parse(objects)
    }catch(err){
        console.log(`Error: ${err}`)
        }
    };
};

const productos = new Contenedor('productos.txt')