<<<<<<< HEAD
// Obtengo los nodos necesarios para utilizar
const user = document.getElementById("user");
const contraActual = document.querySelector(".contrasenia")

//contraseña y checkbox
const nuevaContra = document.getElementById("NC");
const repetirContra = document.getElementById("RC");
const checkTarjetaCredito = document.getElementById("tarjeta_credito");
const checkRapiPago = document.getElementById("rapi_pago");
const checkPagoFacil = document.getElementById("pago_facil");
const checkTransferencia = document.getElementById("Transferencia_bancaria");
const botonGuardar = document.querySelector(".guardar-cambios");




//Rejex sintaxis
const regexSoloLetras = /^[A-Za-z]+$/;
const regexSolonNumerosYLetras = /[A-Za-z0-9]/;
const regexSoloContraseniasValidad = /^.*[A-Za-z].*[A-Za-z].*[0-9].*[0-9].*[!@#\$%\^&\*()_\+\-=\[\]{};':"\\|,.<>\/?].*[!@#\$%\^&\*()_\+\-=\[\]{};':"\\|,.<>\/?]$/;
const regexMail = /^.*[@].*[.com]$/;


//Obtengo Lista de usuarios guardados en el Storage y el nombre de Usuario Logueado, para luego buscar el objeto
//en el Array de USUARIOS
const usuarios = JSON.parse(localStorage.getItem("usuarios"));
const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual")) || [];
//Busco que el usuario exista y me lo devuelva en forma de Objeto, para luego trabajar con sus atributos.
const objetoUsuario = buscarUsuario(usuarioActual);

//Modifico dinámicamente el nombre del usuario según el Perfil Logueado
user.textContent = objetoUsuario.nombreUsuario;





//---------------------- METODOS DE VALIDACIÓN Y BÚSQUEDA -----------------------------------

//Metodos de busqueda
function buscarUsuario(usuarioActual) {
    for (let usuario of usuarios) {
        if (usuario.nombreUsuario === usuarioActual) {
            return usuario
        }
    }
}

//*****************   Metodos Regex ***************
function contieneLoNecesarioParaSerUnaContrasenia(variableAValidar) {
    return regexSoloContraseniasValidad.test(variableAValidar);
}

//---------------------  Metodos de validación GENERALES -----------------
// 8 CARACTERES MAXIMO
function validarCantidadCaracteres(str) {
    if (str.length < 8) {
        return true
    }
    return false
}
//VALIDACIONES DE CONTRASEÑA
//1) paso
function esUnaContraseniaValida() { //DEBE DEVOLVER TRUE SE VALIDA EN CADA INPUT DE CONTRA
    let esContraseniaValida = false;
    esContraseniaValida = contieneLoNecesarioParaSerUnaContrasenia(nuevaContra.value);
    return esContraseniaValida;
}
//2) paso
function repetirContrasenia() { //DEBE DEVOLVER TRUE
    let laContraseniaRepetidaEsValida = false;
    if (nuevaContra.value === repetirContra.value) {
        laContraseniaRepetidaEsValida = true;
    }
    return laContraseniaRepetidaEsValida;
}
//3) Si hay contraseña valida y las contraseñas son iguales, ambos campos están completos
function camposContraseniaCompletos(){
    if (esUnaContraseniaValida() && repetirContrasenia()) {
        alert("TODO OK")
    }
}

//VALIDACION DE CHECKBOX
function unCheckSeleccionado() {
    if (checkTarjetaCredito.checked || checkRapiPago.checked || checkPagoFacil.checked || checkTransferencia.checked) {
        return true;
    }
    return false;
}


//VALIDACION DE BOTON GUARDAR CAMBIOS , solo si esta lleno campo de contraseña o un metodo de pago seleccionado
=======
document.addEventListener('DOMContentLoaded', function() {
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

    // Regex para validación de contraseña
    const regexSoloContraseniasValidad = /^(?=.*[A-Za-z].*[A-Za-z])(?=.*[0-9].*[0-9])(?=.*[!@#\$%\^&\*()_\+\-=\[\]{};':"\\|,.<>\/?].*[!@#\$%\^&\*()_\+\-=\[\]{};':"\\|,.<>\/?]).*$/;

    // Obtengo Lista de usuarios guardados en el Storage y el nombre de Usuario Logueado
    const usuarios = JSON.parse(localStorage.getItem("usuarios"));
    const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual")) || [];
    // Busco que el usuario exista y me lo devuelva en forma de Objeto
    const objetoUsuario = buscarUsuario(usuarioActual);

    // Modifico dinámicamente el nombre del usuario y el email según el Perfil Logueado
    if (objetoUsuario) {
        user.textContent = objetoUsuario.nombreUsuario;
        emailElement.textContent = objetoUsuario.email;
    } else {
        alert('Usuario no encontrado');
        return;
    }

    // Función para buscar el usuario en el array de usuarios
    function buscarUsuario(nombreUsuario) {
        return usuarios.find(usuario => usuario.nombreUsuario === nombreUsuario);
    }

    // Función para actualizar los datos del usuario
    function actualizarUsuario() {
        const nuevaContrasenia = nuevaContra ? nuevaContra.value : null;
        const repetirContrasenia = repetirContra ? repetirContra.value : null;

        // Verificar si se ingresaron valores en los campos de nueva contraseña
        if (nuevaContrasenia || repetirContrasenia) {
            // Verificar si las contraseñas coinciden
            if (nuevaContrasenia !== repetirContrasenia) {
                alert('Las contraseñas no coinciden.');
                return;
            }

            // Verificar si la nueva contraseña es válida según las reglas definidas
            if (!regexSoloContraseniasValidad.test(nuevaContrasenia)) {
                alert('La contraseña debe contener al menos dos letras, dos números y dos caracteres especiales.');
                return;
            }

            // Actualizar la contraseña del usuario
            objetoUsuario.contraseña = nuevaContrasenia;
        }

        // Verificación del método de pago
        if (checkTarjetaCredito.checked) {
            if (!numeroTarjeta || numeroTarjeta.value.length < 16 || numeroTarjeta.value.length > 19) {
                alert("El número de tarjeta debe tener entre 16 y 19 dígitos.");
                return;
            }
            if (!codigoCVV || codigoCVV.value.length !== 3 || codigoCVV.value === "000") {
                alert("El código CVV debe tener 3 dígitos y no puede ser '000'.");
                return;
            }
            objetoUsuario.metodoPago = "tarjeta_credito";
            objetoUsuario.numeroTarjeta = numeroTarjeta.value;
            objetoUsuario.codigoCVV = codigoCVV.value;
        } else if (checkRapiPago.checked) {
            objetoUsuario.metodoPago = "rapi_pago";
        } else if (checkPagoFacil.checked) {
            objetoUsuario.metodoPago = "pago_facil";
        } else if (checkTransferencia.checked) {
            objetoUsuario.metodoPago = "transferencia_bancaria";
        } else {
            alert("Debe seleccionar un método de pago.");
            return;
        }

        // Guardar los cambios en localStorage
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        alert('Datos actualizados correctamente.');
    }

    botonGuardar.addEventListener('click', function(event) {
        event.preventDefault();
        actualizarUsuario();
    });
    
});





















>>>>>>> dcaa21bc83a265b35ca6ccc2a3ee9977e4ecd9dd
















