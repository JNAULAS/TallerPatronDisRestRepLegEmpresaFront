const urlServer = 'http://localhost:3000/'
// Se crea api generica para cunsumir servicios rest
async function getApi(paramMethod, paramUrl, paramBody) {
    console.log('URL ACCESO API')
    console.log(paramUrl)
    let data
    const requestOptions = {
        method: paramMethod,//'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: paramBody ? JSON.stringify(paramBody) : null,
    };

    const res = await fetch(paramUrl, requestOptions)
    if (!res.ok) {
        throw new Error(`Error en la solicitud: ${res.status} - ${res.statusText}`);
    }
    data = await res.json()
    return data
}

async function getListCompany() {
    let listCompanyFront=[]
    let path = 'empresa'
    const dataRetun = await getApi('GET', `${urlServer}${path}`);
    console.log(JSON.stringify(dataRetun))
    dataRetun.body.forEach(element => {
        console.log(JSON.stringify(element))
        listCompanyFront.push(element)
    });

    alert(JSON.stringify(listCompanyFront[1]))
}

async function saveRepresentante() {
    // Get value input Representate Legal
    const paramRuc = document.getElementById('inputRuc').value
    const paramCedula = document.getElementById('inputCedula').value
    const paramNombre = document.getElementById('inputNombre').value
    const paramApellido = document.getElementById('inputApellido').value
    const paramEmail = document.getElementById('inputEmail').value
    const paramDomicilio = document.getElementById('inputDomicilio').value
    const paramTelefono = document.getElementById('inputTelefono').value

    // Construimos Json para persistir
    const param = {
        ruc: paramRuc,
        cedula: paramCedula,
        nombre: paramNombre,
        apellido: paramApellido,
        email: paramEmail,
        domicilio: paramDomicilio,
        telefono: paramTelefono
    }
}