const storage = require('./storage')

function agregarRepresentante( representantelegal ) {
    return new Promise((resolve, reject) => {
        if (!representantelegal.ruc) {
            return reject('No hay datos suficientes.')
        }
        storage.agregar( representantelegal )
        resolve( representantelegal )        
    })
}

function obtenerRepresentante( filtro_representantelegal ) {
    return new Promise((resolve, reject) => {
        resolve( storage.obtener( filtro_representantelegal) )
    })
}



module.exports = {
    agregarRepresentante,
    obtenerRepresentante
}