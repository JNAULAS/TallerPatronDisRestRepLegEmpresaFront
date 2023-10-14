const Model = require('./model')

async function agregarEmpresa( dato ) {
    const resultado = await new Model( dato )
    return resultado.save()
}


async function obtenerEmpresa( filtro ) {
    let mi_filtro = {}

    if (filtro.ruc != null) {
        mi_filtro = { ruc: filtro.ruc }
    }
    const resultado = await Model.find( mi_filtro )
    return resultado
}

module.exports = {
    agregar:agregarEmpresa,
    obtener:obtenerEmpresa
}