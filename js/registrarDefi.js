const regexSoloLetras = /^[A-Za-z]+$/;
const regexSolonNumerosYLetras = /^[A-Za-z0-9]+$/;
const regexNombreUsuario = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9]+$/;
const regexSoloContraseniasValidad = /^(?=.*[A-Za-z].*[A-Za-z])(?=.*[0-9].*[0-9])(?=.*[!@#\$%\^&\*()_\+\-=\[\]{};':"\\|,.<>\/?].*[!@#\$%\^&\*()_\+\-=\[\]{};':"\\|,.<>\/?]).*$/;
const regexMail = /^.*@.*\.com$/;

// INPUT
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

// RADIO BUTTON 
//---------------------------------------------------------------------------------
const radioButtomTarjetaCredito = document.querySelector('#tarjeta_credito');
const radioButtomRapiPago = document.querySelector('#rapi_pago');
const radioButtomPagoFacil = document.querySelector('#pago_facil');
const radioButtomTransferenciaBancaria = document.querySelector('#Transferencia_bancaria');
//---------------------------------------------------------------------------------

// BOTON
const botonDeConfirmacion = document.querySelector('#boton-confirmacion');

function esUnNombreValido() {
    let alerta = "";
    if (!esUnaLetra(nombreDelUsuario.value)) {
        alerta = "El nombre solo debe contener letras.\n";
    }
    return alerta;
}

function esUnApellidoValido() {
    let alerta = "";
    if (!esUnaLetra(apellidoUsuario.value)) {
        alerta = "El apellido solo debe contener letras.\n";
    }
    return alerta;
}

function esUnEmail() {
    let alerta = "";
    if (!contieneLoNecesarioParaSerUnMail(email.value)) {
        alerta = "El email no es válido.\n";
    }
    return alerta;
}

function esUnNombreDeUsuarioValido() {
    let alerta = "";
    if (nombreUsuario.value.length < 8) {
        alerta = "El nombre de usuario debe tener al menos 8 caracteres.\n";
    } else if (!contieneLetrasYAlMenosUnNumero(nombreUsuario.value)) {
        alerta = "El nombre de usuario debe contener letras y al menos un número.\n";
    }
    return alerta;
}

function esUnaContraseniaValida() {
    let alerta = "";
    if (contraseña.value.length < 8) {
        alerta = "La contraseña debe tener al menos 8 caracteres.\n";
    } else if (!contieneLoNecesarioParaSerUnaContrasenia(contraseña.value)) {
        alerta = "La contraseña debe contener al menos dos letras, dos números y dos caracteres especiales.\n";
    }
    return alerta;
}

function repetirContrasenia() {
    let alerta = "";
    if (contraseña.value !== contraseñaRepetida.value) {
        alerta = "Las contraseñas no coinciden.\n";
    }
    return alerta;
}

function validarCamposDePago() {
    let alerta = "";
    if (radioButtomTarjetaCredito.checked) {
        if (campoNumeroTarjetaCredito.value.length < 16 || campoNumeroTarjetaCredito.value.length > 19) {
            alerta = "El número de tarjeta debe tener entre 16 y 19 dígitos.\n";
        }
        if (campoCodigoCVV.value.length !== 3 || campoCodigoCVV.value === "000") {
            alerta = "El código CVV debe tener 3 dígitos y no puede ser '000'.\n";
        }
        if (!esTarjetaValida(campoNumeroTarjetaCredito.value)) {
            alerta = "La tarjeta de crédito no es válida.\n";
        }
    } else if (!radioButtomRapiPago.checked && !radioButtomPagoFacil.checked && !radioButtomTransferenciaBancaria.checked) {
        alerta = "Debe seleccionar un método de pago.\n";
    }
    return alerta;
}

function esTarjetaValida(numeroTarjeta) {
    let suma = 0;
    for (let i = 0; i < numeroTarjeta.length - 1; i++) {
        suma += parseInt(numeroTarjeta.charAt(i), 10);
    }
    const ultimoDigito = parseInt(numeroTarjeta.charAt(numeroTarjeta.length - 1), 10);
    if (suma % 2 === 0 && ultimoDigito % 2 !== 0) {
        return true;
    }
    if (suma % 2 !== 0 && ultimoDigito % 2 === 0) {
        return true;
    }
    return false;
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

// FUNCIONES DE VALIDACIONES
function esUnaLetra(variableAValidar) {
    return regexSoloLetras.test(variableAValidar);
}

function contieneLetrasYAlMenosUnNumero(variableAValidar) {
    return regexNombreUsuario.test(variableAValidar);
}

function contieneLoNecesarioParaSerUnaContrasenia(variableAValidar) {
    return regexSoloContraseniasValidad.test(variableAValidar);
}

function contieneLoNecesarioParaSerUnMail(variableAValidar) {
    return regexMail.test(variableAValidar);
}
