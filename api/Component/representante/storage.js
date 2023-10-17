const Model = require('./model')

function agregarRepresentante(representantelegal) {

    const objeto = new Model(representantelegal)
    objeto.save()
}

function obtenerRepresentante(paramRuc) {
    return new Promise((resolve, reject) => {
        let filtro = {}
        if (paramRuc) {
            filtro = { ruc: paramRuc }
        }
        Model.find(filtro)
            .populate({
                path: 'empresa',
                populate: {
                    path: 'empresa',
                    model: 'EMPRESA_DTO'
                }
            })
            .exec()
            .then(data => {
                console.log('Datos retornados')
                console.log(data)
                lista = []
                for (let elemento of data) {
                    objeto = {
                        id: elemento._id,
                        ruc: elemento.ruc,
                        cedula: elemento.cedula,
                        nombre: elemento.nombre,
                        apellido: elemento.apellido,
                        email: elemento.email,
                        domicilio: elemento.domicilio,
                        telefono: elemento.telefono
                    }
                    objeto.empresas = []
                    for (let detalle of elemento.empresa) {
                        registro = {
                            nombre: detalle.empresa.nombre,
                            ruc: detalle.empresa.ruc
                        }
                        objeto.empresas.push(registro)
                    }
                    lista.push(objeto)
                }
                resolve(lista)
            })
    })
}




module.exports = {
    agregar: agregarRepresentante,
    obtener: obtenerRepresentante
}