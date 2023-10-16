/*  Importanción de  metodos de varios direstorios */
const express = require('express')
const body_parser = require('body-parser')
const config = require('./config')
const routes = require('./Network/routes')
const db = require('./db')
/* Creamos una instancia de Frameworf Expres */
let app = express()
const path = require("path")
const server = require('http').Server(app);
const websocket = require('socket.io')(server);
// Coneccion a la basde de datos
db(config.DB_URL)
app.use(body_parser.json())
app.use(body_parser.urlencoded({ extended: false }))
routes(app)
/***************************** INICIO SECCION CODIGO PARA MANEJO DE SOCKETS *************************************/
app.use('/', express.static('public'));

app.use((req, res, next) => {
    req.io = io;
    next();
  });
// Codigo que permite atender peticiones  reques / callback 
websocket.on('connection', function (socket) {
    console.log('Nuevo cliente conectado.')
})
/***************************** FIN SECCION CODIGO PARA MANEJO DE SOCKETS *************************************/
// Configuramos websocket escucha del servidor cuando lleguen las peticiones
server.listen(config.PORT, function () {
    console.log(`La aplicacion esta escuchando en http://localhost:${config.PORT}`);
})