const mongoose = require('mongoose')
const Schema = mongoose.Schema

const empresa_schema = new Schema({
    ruc: String,
    nombre: String,
    domicilio: String,
    telefono: String,
}) 

const model = mongoose.model('EMPRESA_DTO', empresa_schema)
module.exports = model