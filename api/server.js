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
/***************************** INICIO SECCION CODIGO PARA MANEJO DE SOCKETS *************************************/
const path = require("path")
const server = require('http').Server(app);
const websocket = require('socket.io')(server);
app.use(express.json)
//app.use(express.static(path.join(__dirname, './public')));
app.use(express.static('public'));

// Intanciamos objeto y realizamos control de conexiones
/* const instWebSocket = new WebSocket({
    httpServer: server,
    autoAcceptConnections: false // Este para que no se establezca la conexión directa si no q lo valide primero
}) */

// Codigo que permite atender peticiones  reques / callback 
websocket.on('request', function (request) {
    console.log("Ingreso al request");
    // Si request es aceptada obtiene la conexion
    const connection = request.accept(null, request.origin);
    // establecida la conexión recibimso  el mensaje
    connection.on("message",(message) => {
        console.log("Mensaje recibido registro en consola: "+message.utf8Data);
        // Retorna mensaje a cliente
        connection.sendUTF("Mensaje recibido: "+ message.utf8Data)
    })
    connection.on("close", (reasonCode, description) => {
        console.log("El cliente se desconecto");
    })
})
/***************************** FIN SECCION CODIGO PARA MANEJO DE SOCKETS *************************************/


// Configuracion de Websocket
/*
app.listen( config.PORT )
console.log(`La aplicacion se encuentra arriba en http://localhost:${config.PORT}/`)
*/
// Configuramos websocket escucha del servidor cuando lleguen las peticiones
server.listen(configSocket.PORT, function () {
    console.log(`La aplicacion esta escuchando en http://localhost:${configSocket.PORT}`);
})