// Obtengo los nodos necesarios para utilizar
const user = document.getElementById("user");
const emailElement = document.querySelector(".datos-usuario-email + p");
const contraActual = document.querySelector(".contrasenia");

// Contraseña y método de pago
const nuevaContra = document.getElementById("NC");
const repetirContra = document.getElementById("RC");
const checkTarjetaCredito = document.getElementById("tarjeta_credito");
const checkRapiPago = document.getElementById("rapi_pago");
const checkPagoFacil = document.getElementById("pago_facil");
const checkTransferencia = document.getElementById("Transferencia_bancaria");
const numeroTarjeta = document.getElementById("numero_tarjeta");
const codigoCVV = document.getElementById("codigo_cvv");
const botonGuardar = document.querySelector(".guardar-cambios");

// Regex sintaxis
const regexSoloContraseniasValidad = /^(?=.*[A-Za-z].*[A-Za-z])(?=.*[0-9].*[0-9])(?=.*[!@#\$%\^&\*()_\+\-=\[\]{};':"\\|,.<>\/?].*[!@#\$%\^&\*()_\+\-=\[\]{};':"\\|,.<>\/?]).*$/;

// Obtengo Lista de usuarios guardados en el Storage y el nombre de Usuario Logueado
const usuarios = JSON.parse(localStorage.getItem("usuarios"));
const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual")) || [];
// Busco que el usuario exista y me lo devuelva en forma de Objeto
const objetoUsuario = buscarUsuario(usuarioActual);

// Modifico dinámicamente el nombre del usuario y el email según el Perfil Logueado
user.textContent = objetoUsuario.nombreUsuario;
emailElement.textContent = objetoUsuario.email;

// Función para buscar el usuario en el array de usuarios
function buscarUsuario(nombreUsuario) {
    return usuarios.find(usuario => usuario.nombreUsuario === nombreUsuario);
}

function contieneLoNecesarioParaSerUnaContrasenia(variableAValidar) {
    return regexSoloContraseniasValidad.test(variableAValidar);
}

function validarCamposDePago() {
    if (checkTarjetaCredito.checked) {
        if (numeroTarjeta.value.length < 16 && numeroTarjeta.value.length > 19) {
            alert("El número de tarjeta debe tener entre 16 y 19 dígitos.");
            return false;
        }
        if (codigoCVV.value.length !== 3 || codigoCVV.value === "000") {
            alert("El código CVV debe tener 3 dígitos y no puede ser '000'.");
            return false;
        }
    } else if (!checkRapiPago.checked && !checkPagoFacil.checked && !checkTransferencia.checked) {
        alert("Debe seleccionar un método de pago.");
        return false;
    }
    return true;
}

function actualizarUsuario() {
  
    if (nuevaContra.value || repetirContra.value) {
        if (nuevaContra.value !== repetirContra.value) {
            alert("Las contraseñas no coinciden.");
            return false;
        }
        if (!contieneLoNecesarioParaSerUnaContrasenia(nuevaContra.value)) {
            alert("La contraseña debe contener al menos dos letras, dos números y dos caracteres especiales.");
            return false;
        }
        objetoUsuario.contraseña = nuevaContra.value;
    }

    if (!validarCamposDePago()) {
        return false;
    }

    if (checkTarjetaCredito.checked) {
        objetoUsuario.metodoPago = "tarjeta_credito";
        objetoUsuario.numeroTarjeta = numeroTarjeta.value;
        objetoUsuario.codigoCVV = codigoCVV.value;
    } else if (checkRapiPago.checked) {
        objetoUsuario.metodoPago = "rapi_pago";
    } else if (checkPagoFacil.checked) {
        objetoUsuario.metodoPago = "pago_facil";
    } else if (checkTransferencia.checked) {
        objetoUsuario.metodoPago = "transferencia_bancaria";
    }

    // Actualizar el array de usuarios en el localStorage
    const index = usuarios.findIndex(usuario => usuario.nombreUsuario === objetoUsuario.nombreUsuario);
    if (index !== -1) {
        usuarios[index] = objetoUsuario;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        localStorage.setItem('usuarioActual', JSON.stringify(objetoUsuario));
        alert('Cambios guardados exitosamente.');
    } else {
        alert('Error al actualizar el usuario.');
    }
    return true;
}

botonGuardar.addEventListener('click', function(event) {
    event.preventDefault();
    actualizarUsuario();
});




































