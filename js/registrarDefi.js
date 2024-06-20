const regexSoloLetras = /^[A-Za-z]+$/;
const regexSolonNumerosYLetras = /^[A-Za-z0-9]+$/;
const regexSoloContraseniasValidad = /^(?=.*[A-Za-z].*[A-Za-z])(?=.*[0-9].*[0-9])(?=.*[!@#\$%\^&\*()_\+\-=\[\]{};':"\\|,.<>\/?].*[!@#\$%\^&\*()_\+\-=\[\]{};':"\\|,.<>\/?]).*$/;
const regexMail = /^.*@.*\.com$/;

//INPUT
//---------------------------------------------------------------------------------
const nombreDelUsuario = document.querySelector('#nombre'); 
const apellidoUsuario = document.querySelector('#apellido');
const email = document.querySelector('#email');
const nombreUsuario = document.querySelector('#nombre_usuario');
const contraseña = document.querySelector('#contraseña');
const contraseñaRepetida = document.querySelector('#contraseña_repetida');
const campoCodigoCVV = document.querySelector('#codigo_cvv');
const campoNumeroTarjetaCredito = document.querySelector('#numero_tarjeta');
//---------------------------------------------------------------------------------

//RADIO BUTTON 
//---------------------------------------------------------------------------------
const radioButtomTarjetaCredito = document.querySelector('#tarjeta_credito');
const radioButtomRapiPago = document.querySelector('#rapi_pago');
const radioButtomPagoFacil = document.querySelector('#pago_facil');
const radioButtomTransferenciaBancaria = document.querySelector('#Transferencia_bancaria');
//---------------------------------------------------------------------------------

//BOTON
const botonDeConfirmacion = document.querySelector('#boton-confirmacion');


function esUnNombreValido() {
    let alerta = "";
    if (!esUnaLetra(nombreDelUsuario.value)) {
        alerta = "El nombre solo debe contener letras.";
    }
    return alerta;
}

function esUnApellidoValido() {
    let alerta = "";
    if (!esUnaLetra(apellidoUsuario.value)) {
        alerta = "El apellido solo debe contener letras.";
    }
    return alerta;
}

function esUnEmail() {
    let alerta = "";
    if (!contieneLoNecesarioParaSerUnMail(email.value)) {
        alerta = "El email no es válido.";
    }
    return alerta;
}

function esUnNombreDeUsuarioValido() {
    let alerta = "";
    if (!contieneNumerosYLetras(nombreUsuario.value)) {
        alerta = "El nombre de usuario solo debe contener letras y números.";
    }
    return alerta;
}

function esUnaContraseniaValida() {
    let alerta = "";
    if (!contieneLoNecesarioParaSerUnaContrasenia(contraseña.value)) {
        alerta = "La contraseña debe contener al menos dos letras, dos números y dos caracteres especiales.";
    }
    return alerta;
}

function repetirContrasenia() {
    let alerta = "";
    if (contraseña.value !== contraseñaRepetida.value) {
        alerta = "Las contraseñas no coinciden.";
    }
    return alerta;
}

function validarCamposDePago() {
    let alerta = "";
    if (radioButtomTarjetaCredito.checked) {
        if (campoNumeroTarjetaCredito.value.length < 16 || campoNumeroTarjetaCredito.value.length > 19) {
            alerta = "El número de tarjeta debe tener entre 16 y 19 dígitos.";
        }
        if (campoCodigoCVV.value.length !== 3 || campoCodigoCVV.value === "000") {
            alerta = "El código CVV debe tener 3 dígitos y no puede ser '000'.";
        }
    } else if (!radioButtomRapiPago.checked && !radioButtomPagoFacil.checked && !radioButtomTransferenciaBancaria.checked) {
        alerta = "Debe seleccionar un método de pago.";
    }
    return alerta;
}

function validacionFinal() {
    let mensajesDeError = "";

    mensajesDeError += esUnNombreValido();
    mensajesDeError += esUnApellidoValido();
    mensajesDeError += esUnEmail();
    mensajesDeError += esUnNombreDeUsuarioValido();
    mensajesDeError += esUnaContraseniaValida();
    mensajesDeError += repetirContrasenia();
    mensajesDeError += validarCamposDePago();

    if (mensajesDeError) {
        alert(mensajesDeError);
        return false;
    }
    return true;
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const password = document.getElementById('contraseña');
    const confirmPassword = document.getElementById('contraseña_repetida');

    // Inicializar el array de usuarios desde localStorage 
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || []; //inicializa un array con los datos. Si no tiene, crea uno vacio

    form.addEventListener('submit', function(event) {
        // Validar todos los campos
        if (!validacionFinal()) { //Si devuelve false (hay algun dato mal ingresado)
            event.preventDefault(); // previene el envio del formulario
            return;
        }

        // Crear un objeto con los datos del formulario
        const usuario = {
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            email: document.getElementById('email').value,
            nombreUsuario: document.getElementById('nombre_usuario').value,
            contraseña: password.value,
            metodoPago: document.querySelector('input[name="metodo_pago"]:checked').value,
            numeroTarjeta: document.getElementById('numero_tarjeta').value,
            codigoCVV: document.getElementById('codigo_cvv').value
        };

        // Añadir el objeto usuario al array
        usuarios.push(usuario);

        // Guardar el array en localStorage
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        // Confirmar registro exitoso
        alert('Usuario registrado exitosamente.');
    });
});

//FUNCIONES DE VALIDACIONES
function esUnaLetra(variableAValidar) {
    return regexSoloLetras.test(variableAValidar);
}

function contieneNumerosYLetras(variableAValidar) {
    return regexSolonNumerosYLetras.test(variableAValidar);
}

function contieneLoNecesarioParaSerUnaContrasenia(variableAValidar) {
    return regexSoloContraseniasValidad.test(variableAValidar);
}

function contieneLoNecesarioParaSerUnMail(variableAValidar) {
    return regexMail.test(variableAValidar);
}
