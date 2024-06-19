const regexSoloLetras = /^[A-Za-z]+$/;
const regexSolonNumerosYLetras = /^[A-Za-z0-9]+$/;
const regexSoloContraseniasValidad = /^(?=.*[A-Za-z].*[A-Za-z])(?=.*[0-9].*[0-9])(?=.*[!@#\$%\^&\*()_\+\-=\[\]{};':"\\|,.<>\/?].*[!@#\$%\^&\*()_\+\-=\[\]{};':"\\|,.<>\/?]).*$/;
const regexMail = /^.*@.*\.com$/;

const nombreDelUsuario = document.querySelector('#nombre');
const apellidoUsuario = document.querySelector('#apellido');
const email = document.querySelector('#email');
const nombreUsuario = document.querySelector('#nombre_usuario');
const contraseña = document.querySelector('#contraseña');
const contraseñaRepetida = document.querySelector('#contraseña_repetida');
const radioButtomTarjetaCredito = document.querySelector('#tarjeta_credito');
const campoNumeroTarjetaCredito = document.querySelector('#numero_tarjeta');
const campoCodigoCVV = document.querySelector('#codigo_cvv');
const radioButtomRapiPago = document.querySelector('#rapi_pago');
const radioButtomPagoFacil = document.querySelector('#pago_facil');
const radioButtomTransferenciaBancaria = document.querySelector('#Transferencia_bancaria');
const botonDeConfirmacion = document.querySelector('#boton-confirmacion');

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

function esUnNombreValido() {
    return esUnaLetra(nombreDelUsuario.value);
}

function esUnApellidoValido() {
    return esUnaLetra(apellidoUsuario.value);
}

function esUnEmail() {
    return contieneLoNecesarioParaSerUnMail(email.value);
}

function esUnNombreDeUsuarioValido() {
    return contieneNumerosYLetras(nombreUsuario.value);
}

function esUnaContraseniaValida() {
    return contieneLoNecesarioParaSerUnaContrasenia(contraseña.value);
}

function repetirContrasenia() {
    return contraseña.value === contraseñaRepetida.value;
}

function todosLosCamposEstanOcupados() {
    return esUnNombreValido() && esUnApellidoValido() && esUnNombreDeUsuarioValido() && esUnEmail() && esUnaContraseniaValida() && repetirContrasenia() &&
        ((radioButtomTarjetaCredito.checked && campoNumeroTarjetaCredito.value.length >= 16 && campoCodigoCVV.value.length === 3 && campoCodigoCVV.value !== "000") ||
        radioButtomRapiPago.checked || radioButtomPagoFacil.checked || radioButtomTransferenciaBancaria.checked);
}

function losDatosFueronConfirmados() {
    return todosLosCamposEstanOcupados();
}

function losCamposDeContraseniaSonIguales() {
    if (contraseña.value !== contraseñaRepetida.value) {
        alert("Las contraseñas no coinciden. Vuelva a intentarlo por favor.");
        return false;
    }
    return true;
}

function elCampoCodigoCVVEsCorrecto() {
    if (campoCodigoCVV.value === "000") {
        alert("El campo del código CVV debe estar completo sin '000'.");
        return false;
    }
    return true;
}

function laTarjetaTieneLosDigitosNecesarios() {
    return campoNumeroTarjetaCredito.value.length >= 16 && campoNumeroTarjetaCredito.value.length <= 19;
}

function elUltimoNumeroDeLaTarjetaEsPar() {
    let suma = 0;
    const numeroTarjeta = campoNumeroTarjetaCredito.value;
    for (let i = 0; i < numeroTarjeta.length - 1; i++) {
        suma += parseInt(numeroTarjeta.charAt(i), 10);
    }
    const ultimoDigito = parseInt(numeroTarjeta.charAt(numeroTarjeta.length - 1), 10);
    return suma % 2 !== 0 && ultimoDigito % 2 === 0;
}

function elUltimoNumeroDeLaTarjetaEsImpar() {
    let suma = 0;
    const numeroTarjeta = campoNumeroTarjetaCredito.value;
    for (let i = 0; i < numeroTarjeta.length - 1; i++) {
        suma += parseInt(numeroTarjeta.charAt(i), 10);
    }
    const ultimoDigito = parseInt(numeroTarjeta.charAt(numeroTarjeta.length - 1), 10);
    return suma % 2 === 0 && ultimoDigito % 2 !== 0;
}

function laTarjetaEsValida() {
    return campoNumeroTarjetaCredito.value.length >= 16 && campoNumeroTarjetaCredito.value.length <= 19;
}

function validacionFinal() {
    return losDatosFueronConfirmados() && losCamposDeContraseniaSonIguales() && elCampoCodigoCVVEsCorrecto();
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const password = document.getElementById('contraseña');
    const confirmPassword = document.getElementById('contraseña_repetida');

    // Inicializar el array de usuarios desde localStorage 
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    form.addEventListener('submit', function(event) {
        // Validar que las contraseñas coinciden
        if (password.value !== confirmPassword.value) {
            alert('Las contraseñas no coinciden. Por favor, inténtelo de nuevo.');
            event.preventDefault();
            return;
        }

        // Validar todos los campos
        if (!validacionFinal()) {
            alert('Por favor, complete todos los campos correctamente.');
            event.preventDefault();
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