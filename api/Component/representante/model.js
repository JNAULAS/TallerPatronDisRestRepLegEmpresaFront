const mongoose = require('mongoose')
const Schema = mongoose.Schema

const req_string = {
    type: String,
    required: true
}

const empresa_schema = new Schema({
    empresa: {
        type: Schema.ObjectId,
        ref: 'empresas',
    }
}, {
    timestamps: true,
})

const representantelegal_schema = new Schema({ 
    ruc: req_string,
    cedula: req_string,
    nombre: req_string,
    apellido: req_string,
    email: req_string,
    domicilio: req_string,
    telefono: req_string,
    empresa: [empresa_schema]
}, {
    timestamps: true,
})

const model = mongoose.model('representanteLegal', representantelegal_schema)
module.exports = model