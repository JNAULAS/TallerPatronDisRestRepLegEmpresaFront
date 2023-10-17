
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
let listaEmpresasSave = []
function addDatosLista() {
    const listaEmpresas = document.getElementById("listaEmpresas");
    const itemSelect = document.getElementById("itemListEmpresa");

    const selectedOption = listaEmpresas.options[listaEmpresas.selectedIndex];
    const value = selectedOption.value;
    const text = selectedOption.text;

    if (value) {
        const param = {
            codigo: value,
            nombre: text
        }
        const listItem = document.createElement("li");
        listItem.textContent = text;
        itemSelect.appendChild(listItem);
        listaEmpresasSave.push(param)
    }
}
function handleCancelar() {
    var ulElement = document.getElementById("itemListEmpresa");
    ulElement.innerHTML = "";
    listaEmpresasSave.pop()
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
    // Control de ingreso de informcion
    if (paramRuc == '') {
        alert('Ingrese un número de RUC válido.')
        return false
    }
    if (paramCedula == '') {
        alert('Ingrese un número de Cedula válido.')
        return false
    }
    if (paramNombre == '') {
        alert('Ingrese un nombre válido.')
        return false
    }
    if (paramApellido == '') {
        alert('Ingrese un apellido válido.')
        return false
    }
    if (paramEmail == '') {
        alert('Ingrese una dirección de correo válido.')
        return false
    }
    if (paramDomicilio == '') {
        alert('Ingrese una dirección de domicilio válido.')
        return false
    }
    if (paramTelefono == '') {
        alert('Ingrese un número de Teléfono válido.')
        return false
    }
    if (listaEmpresasSave.length == 0) {
        alert('Empresas no seleccionadas, selecciones por lo menos una empresa.')
        return false
    }


    // Construimos Json para persistir
    const listParamSave = []

    listaEmpresasSave.forEach(emp => {
        const param = {
            empresa: emp.codigo
        }
        listParamSave.push(param)
    });
    console.log(listParamSave)

    const param = {
        ruc: paramRuc,
        cedula: paramCedula,
        nombre: paramNombre,
        apellido: paramApellido,
        email: paramEmail,
        domicilio: paramDomicilio,
        telefono: paramTelefono,
        empresa: listParamSave
    }




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

    const socket = io.connect('http://localhost:3000/', { forceNet: true });
    socket.on('messageClient', (data) => {
        console.log(data)
        // Accedemos mensaje a TextAres de html
        let textArea = document.getElementById("idNotification");
        // Agregamso mensaje
        textArea.innerHTML = data + "\n";
    })
}
// Conexion a socker se debe realizar una vez cargada la pagina
window.addEventListener("load", init, false);

/***************************** FIN WEBSOCKER *************************************/