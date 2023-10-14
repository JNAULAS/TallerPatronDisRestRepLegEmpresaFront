const storage = require('./storage')

function agregarEmpresa( dato ) {
    return new Promise((resolve, reject) => {
        resolve( storage.agregar( dato ) )
    })
}

function obtenerEmpresa( filtro ) {
    return new Promise((resolve, reject) => {
        resolve( storage.obtener( filtro ) )
    })
}

module.exports = {
    agregarEmpresa,
    obtenerEmpresa
}