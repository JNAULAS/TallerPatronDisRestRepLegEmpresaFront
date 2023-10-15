/*  Importanción de  metodos de varios direstorios */
const express = require('express')
const body_parser = require('body-parser')
const config = require('./config')
const configSocket = require('./configSocket')
const routes = require('./Network/routes')
const db = require('./db')
// Se intala dependencia para evitar los bloqueos en consumo de api de dierentes puertos
const cors = require('cors');
/* Creamos una instancia de Frameworf Expres */
let app = express()
// Coneccion a la basde de datos
db(config.DB_URL)
// Se agrega al app el cors y mediante la intancia de express  vamos reazando las configuraciones necesarias
app.use(cors());
app.use(body_parser.json())
app.use(body_parser.urlencoded({ extended: false }))
routes(app)

// se agrega import para trabajar con Patron de Diseño de APIS para eset caso websocket
const server = require('http').Server(app)
const websocket = require('socket.io')(server)
//  Conexion para que socker io pueda acceder al front
//app.use('/', express.static('/public/pages'))
app.use('/', express.static(__dirname + 'public/pages'))

websocket.on('connection', function (socket) {
    console.log('Accede a conection on')
    console.log(socket)
    // Escuchamos los mensajes entrantes
    socket.on("mensaje", function incoming(data) {
        //console.log("Mensaje recibido: " + message.utf8Data);
        //connection.sendUTF("Recibido: " + message.utf8Data);
        /* Iteramos todos los clientes que se encuentren conectados
        data.clients.forEach(function each(client) {
         if (client.readyState === WebSocket.OPEN) {
             // Enviamos la información recibida
             client.send(data.toString());
         }
     });*/
     data.emit('mensaje','Buenos dias')
    })
})
// Ejecuta interbalo para notificar
let contador = 1
setInterval(function () {
    websocket.emit(`mensaje`, `Hola, saludos a todos --> ${contador}`)
    contador++
}, 3000)

// Configuramos escucha del servidor cuando lleguen las peticiones
server.listen(configSocket.PORT, function () {
    console.log(`La aplicacion esta escuchando en http://localhost:${configSocket.PORT}`)
})