
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
    let path = 'empresa'
    var listItemFront = document.getElementById("listaEmpresas")
    // Consume Api
    const dataRetun = await getApi('GET', `${urlServer}${path}`);
    console.log(JSON.stringify(dataRetun))
    // Recorre lista que retorna el servicio
    dataRetun.body.forEach(element => {
        var option = document.createElement("option");
        option.text = element.nombre
        option.value = element._id
        listItemFront.add(option)
    });
}
// funtion para agregar Item Seleccionado a lista
function addDatosLista() {
    const listaEmpresas = document.getElementById("listaEmpresas");
    const itemSelect = document.getElementById("aquiidLista");

    const selectedOption = listaEmpresas.options[listaEmpresas.selectedIndex];
    const value = selectedOption.value;
    const text = selectedOption.text;

    if (value) {
        const listItem = document.createElement("li");
        listItem.textContent = text;
        itemSelect.appendChild(listItem);
    }
}

// fiuntion for save legalRepresentative
async function saveRepresentante() {
    let path = 'representanteLegal'
    // Get value input Representate Legal
    const paramRuc = document.getElementById('inputRuc').value
    const paramCedula = document.getElementById('inputCedula').value
    const paramNombre = document.getElementById('inputNombre').value
    const paramApellido = document.getElementById('inputApellido').value
    const paramEmail = document.getElementById('inputEmail').value
    const paramDomicilio = document.getElementById('inputDomicilio').value
    const paramTelefono = document.getElementById('inputTelefono').value
    var listItemFront = document.getElementById("listaEmpresas").value
    // Construimos Json para persistir
    const param = {
        ruc: paramRuc,
        cedula: paramCedula,
        nombre: paramNombre,
        apellido: paramApellido,
        email: paramEmail,
        domicilio: paramDomicilio,
        telefono: paramTelefono,
        empresa: [{ empresa: listItemFront }]
    }
    /* 
    var ulElement = document.getElementById("aquiidLista")
    var listItem = ulElement.getElementsByTagName("li")
    console.log('Rerrorre ul')
    console.log(listItem)
    listItem.HTMLCollection.forEach(listItem => {
        console.log('Rerrorre ul')
        console.log(listItem)
    });
    */
    const dataRetun = await getApi('POST', `${urlServer}${path}`, param);

    if (!dataRetun.erorr) {
        alert(`Representante Legal registrado con exito para la empresa: ${dataRetun.body.nombre + ' ' + dataRetun.body.apellido}`)
    } else {
        alert(dataRetun.erorr)
    }
}

// Se agrega escucha de socket
function wsConnect() {
    //Agregamos url
    const socket = new WebSocket('ws://localhost:5500');
    console.log(socket)
    socket.on('mensaje', (data)=>console.log(data))
    /* Verificamos conexion Ok
    socket.addEventListener('open', (event) => {
        // Connection opened successfully
        console.log('WebSocket connection opened.');
    });

    socket.addEventListener('error', (event) => {
        // Handle connection errors
        console.error('WebSocket connection error:', event);
    });*/
    socket.onopen = function (e) {
        onOpen(e)
    }
    socket.onmessage = function (evt) {
        onMessage(evt)
    };
}
// Se ejecuta cuando se establece la conexión Websocket con el servidor
function onOpen(evt) {
    // Habilitamos el botón Enviar
    //document.getElementById("enviar").disabled = false;
    // Enviamos el saludo inicial al servidor
    console.log('Ingresa envio ce mensaje a servidor')
    doSend("Saludo Srvidor");
}
// Se invoca cuando se recibe un mensaje del servidor
function onMessage(evt) {
    // Agregamos al textarea el mensaje recibido
    var area = document.getElementById("idNotification")
    area.innerHTML += evt.data + "\n";
}
// Envía un mensaje al servidor (y se imprime en la consola)
function doSend(message) {
    console.log("Enviando: " + message);
    websocket.send(message);
}
function init() {
    // Conexión con el servidor de websocket
    wsConnect();
}


// Ejecuciones automaticas
document.addEventListener("DOMContentLoaded", function () {
    getListCompany();
});
// Se invoca la función init cuando la página termina de cargarse
window.addEventListener("load", init(), false);