const express = require('express')
const body_parser = require('body-parser')
// Se intala dependencia para evitar los bloqueos en consumo de api de dierentes puertos
const cors = require('cors'); 

const config = require('./config')
const routes = require('./Network/routes')
const db = require('./db')

var app = express()
db( config.DB_URL )
// Se agrega al app el cors
app.use(cors());
app.use( body_parser.json() )
app.use( body_parser.urlencoded({extended: false}) )


routes( app )

app.listen( config.PORT )
console.log(`La aplicacion se encuentra arriba en http://localhost:${config.PORT}/`)