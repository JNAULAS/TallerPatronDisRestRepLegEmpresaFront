const express = require('express')
const controller = require('./controller')
const response = require('../../Network/response');

const routes = express.Router()

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server)

routes.post('/', function (req, res) {
    controller.agregarEmpresa(req.body)
        .then((data) => {
            req.io.emit('messageClient', 'Estimado representante se informa la creación de una nueva empresa: ' + data.nombre);
            response.success(req, res, data, 201)
        })
        .catch((error) => response.error(req, res, error, 400))
})


routes.get('/', function (req, res) {
    // const filtro = req.body || null  // Consulta mediante el Cuerpo body
    const filtro = req.body || null // Consulta por query ejemplo ?usuario:"jnaulas" query
    controller.obtenerEmpresa(filtro)
        .then((data) => response.success(req, res, data, 200))
        .catch((error) => response.error(req, res, error, 400))
})
module.exports = routes