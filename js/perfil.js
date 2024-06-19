// Obtengo los nodos necesarios para utilizar
const user = document.getElementById("user");
const contraActual = document.querySelector(".contrasenia")

//contraseña y checkbox
const nuevaContra = document.getElementById("NC").value;
const repetirContra = document.getElementById("RC").value;
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

botonGuardar.addEventListener('click', habilitarGuardarCambios());


















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















