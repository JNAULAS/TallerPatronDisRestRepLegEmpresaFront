/*  Importanción de  metodos de varios direstorios */
const express = require('express')
const body_parser = require('body-parser')
const config = require('./config')
const routes = require('./Network/routes')
const db = require('./db')
// Se intala dependencia para evitar los bloqueos en consumo de api de dierentes puertos
const cors = require('cors'); 
/* Creamos una instancia de Frameworf Expres */
let app = express()
// Coneccion a la basde de datos
db( config.DB_URL )
// Se agrega al app el cors y mediante la intancia de express  vamos reazando las configuraciones necesarias
app.use(cors());
app.use( body_parser.json() )
app.use( body_parser.urlencoded({extended: false}) )

// se agrega import para trabajar con Patron de Diseño de APIS para eset caso websocket
const server = require('http').Server(app)
const io = require('socket.io')(server)
//  Conexion para que socker io pueda acceder al front
app.use('/', express.static('public'))

io.on('connection', function(socket){
    console.log('Nuevo cliente conectado.')
    socket.emit('mensaje', 'Bienvenido')
})
// Ejecuta interbalo para notificar
let contador = 1
setInterval(function(){
    io.emit(`mensaje`, `Hola, saludos a todos --> ${contador}`)
    contador++
}, 3000)



routes( app )
// Configuramos escucha del servidor cuando lleguen las peticiones
server.listen(config.PORT, function() {
    console.log(`La aplicacion esta escuchando en http://localhost:${config.PORT}`)
})