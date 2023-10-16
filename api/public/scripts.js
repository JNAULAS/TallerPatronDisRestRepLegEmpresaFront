
// URL del server
const urlServer = 'http://localhost:3000/'
// Se crea api generica para cunsumir servicios rest
async function getApi(paramMethod, paramUrl, paramBody) {
    console.log('URL ACCESO API')
    console.log(paramUrl)
    let data
    const requestOptions = {
        method: paramMethod,//'POST', 'GET' / 'PUT'
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
// Ejecuciones automaticas
document.addEventListener("DOMContentLoaded", function () {
    getListCompany();
});


/***************************** INICIO WEBSOCKER *************************************/
//Funciones que administran el ciclo de vida del objeto 
function init() {
    wsConnect();
}
function wsConnect() {
    /*
    const socketio = io.connect('ws://localhost:3000',{forceNew:true});
    socketio.on('message',function(data){
        console.log('Accede a primer io')
        console.log(data)
    })
    */
    const socket = new WebSocket('ws://localhost:3000');//Create object
    // Funciones de callback  que son las funciones que va a invocar el navegador cuando detecte un evento relacionado con los websocket del server
    // Funcionan de manera sincrona no espera q llege sms del server si q apenas llega notifica y evita bloqueos lo q permite seguir interactuando
    socket.onopen = function (evt) { 
        //alert("Conexio establecida..."); 
        // Invacamos funcion externa a estar dentro de ws
        onOpen(evt);
    }
    socket.onclose = function (evt) { 
        //alert("Conexion cerrada.. "); 
        onClose(evt);
    }
    socket.onmessage = function (evt) { 
        //alert("Mensaje recibido... " + evt.data); 
        onMessage(evt);
    }
    socket.onerror = function(evt){
        onError(evt);
    }
}
// Implemntamos funciones de callback
// Se ejecuta cuando se establece la conexión Websocket con el servidor y esta a la escucha del server
function onOpen(evt) {
    // Habilitamos el botón Enviar
    //document.getElementById("enviar").disabled = false;
    // Enviamos el saludo inicial al servidor
    console.log('Ingresa envio ce mensaje a servidor')
    doSend("Saludo de cliente WebSocket a servidor");
}
function onClose(){
    //Acciones a realizar cuando se cierra la conexxion
    //document.getElementById("idcomponenteHtmls").disabled = true;
    document.getElementById("idNotification").innerHTML="";
}
// Captura mensaje enviado por el servidor
function onMessage(evt){
    // Accedemos mensaje a TextAres de html
    var textArea = document.getElementById("idNotification");
    // Agregamso mensaje
    textArea.innerHTML = evt.data + "\n";
}
//Control de mensajes de error
function onError(evt){
    console.log("Error del servidor")
    console.log(evt)
}
// Funcion para envio de mensajes 
function doSend(mensaje){
    socket.send(mensaje);
}
// Conexion a socker se debe realizar una vez cargada la pagina
window.addEventListener("load",init,false);

/***************************** FIN WEBSOCKER *************************************/