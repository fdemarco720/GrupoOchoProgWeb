const regexSoloLetras = /^[A-Za-z]+$/;
const regexSolonNumerosYLetras = /[A-Za-z0-9]/;
const regexSoloContraseniasValidad = /^.*[A-Za-z].*[A-Za-z].*[0-9].*[0-9].*[!@#\$%\^&\*()_\+\-=\[\]{};':"\\|,.<>\/?].*[!@#\$%\^&\*()_\+\-=\[\]{};':"\\|,.<>\/?]$/;
const regexMail = /^.*[@].*[.com]$/;   

const nombreDelUsuario = document.querySelector('#nombre');
const apellidoUsuario = document.querySelector('#apellido');
const email = document.querySelector('#email');
const nombreUsuario = document.querySelector('#nombre_usuario');
const contraseña = document.querySelector('#contraseña');
const contraseñaRepetida = document.querySelector('#contraseña_repetida');
const numeroTarjetaCredito = document.querySelector('#numero_tarjeta');

const radioButtomTarjetaCredito = document.getElementById('#tarjeta_credito');

const campoNumeroTarjetaCredito = document.getElementById('#numero_tarjeta');
const campoCodigoCVV = document.getElementById('#codigo_cvv');
const codigoCVV = document.querySelector('#codigo_cvv');


const radioButtomRapiPago = document.getElementById('#rapi_pago');
const radioButtomPagoFacil = document.getElementById('#pago_facil');

const radioButtomTransferenciaBancaria = document.getElementById('#Transferencia_bancaria');
const botonDeConfirmacion = document.querySelector('#boton-confirmacion');

function esUnaLetra(variableAValidar){  // DEBE DEVOLVER TRUE
    return regexSoloLetras.test(variableAValidar); //USO TEST (REVISA EL CONTENIDO DE LA EXPRESION NATURAL CREADA)
}

function contieneNumerosYLetras(variableAValidar){
    return regexSolonNumerosYLetras.test(variableAValidar);
}

function contieneLoNecesarioParaSerUnaContrasenia(variableAValidar){
    return regexSoloContraseniasValidad.test(variableAValidar);
}

function contieneLoNecesarioParaSerUnMail(variableAValidar){
    return regexMail.test(variableAValidar);
}

function esUnNombreValido(){
    contieneLetras = false;
    contieneLetras = esUnaLetra(nombreDelUsuario.value);
    return contieneLetras; //DEBERÍA RETORNAR TRUE
}

function esUnApellidoValido(){ 
    contieneLetras = false;
    contieneLetras = esUnaLetra(apellidoUsuario.value);
    return contieneLetras; //DEBERÍA RETORNAR TRUE
}
    
//addEventListener('click', esUnaLetra); //Revisa 

function esUnEmail(){ //DEBE RETORNAR TRUE
    esUnEmail = false;
    esUnEmail = contieneLoNecesarioParaSerUnMail(email.value);
    return esUnEmail;
}

function esUnNombreDeUsuarioValido(){ //DEBE DEVOLVER TRUE
    elNombreDeUsarioEsValido = false;
    elNombreDeUsarioEsValido = contieneNumerosYLetras(nombreUsuario.value);
    return elNombreDeUsarioEsValido;
}

function esUnaContraseniaValida(){ //DEBE DEVOLVER TRUE
    esContraseniaValida = false;
    esContraseniaValida = contieneLoNecesarioParaSerUnaContrasenia(contraseña.value);
    return esContraseniaValida;
}

function repetirContrasenia(){ //DEBE DEVOLVER TRUE
    laContraseniaRepetidaEsValida = false;
    if(contraseña.value === contraseñaRepetida.value){
        laContraseniaRepetidaEsValida = true;
    }
    return laContraseniaRepetidaEsValida;
}

function todosLosCamposEstanOcupados(){    
    todosLosCamposFueronOcupados = false;
    if(esUnNombreValido && esUnApellidoValido && esUnNombreDeUsuarioValido && esUnEmail && esUnaContraseniaValida && repetirContrasenia 
        && ( ((radioButtomTarjetaCredito != null && (campoNumeroTarjetaCredito.value.length == 16 &&
             (codigoCVV.value.length == 3) && (!codigoCVV.value.contains("000")) ))) //SI ESTA SELECCIONADO EL BOTON DE TARJETA DE CREDITO Y AMBOS CAMPOS ESTÁN LLENOS, ENTRA AL IF
            || (radioButtomRapiPago != null || radioButtomPagoFacil != null) //  SI OPCION CUPON TIENE SELECCIONADO UN RADIOBUTTON ENTRA AL IF 
            || (radioButtomTransferenciaBancaria != null)) ){
                todosLosCamposFueronOcupados = true;
    }
    return todosLosCamposFueronOcupados;
}

function losDatosFueronConfirmados(){
    losDatosSePuedenConfirmar = false;
    if(todosLosCamposEstanOcupados()){
        losDatosSePuedenConfirmar = true;
    }
    return losDatosSePuedenConfirmar;
}

function losCamposDeContraseniaSonIguales(){
    losCamposSonIguales = false;
    if(contraseña.value === contraseñaRepetida.value){
        losCamposSonIguales = true;
    }else{
        alert("Las contraseñas no coinciden. Vuelva a intentarlo por favor: ");
    }
    return losCamposSonIguales;
}

function elCampoCodigoCVVEsCorrecto(){
elCodigoEsValido = false;
    if(!codigoCVV.value.contains("000")){
        alert("El campo del codigo CVV debe estar completo sin '000' ");
    }else{
        elCodigoEsValido = true;
    }
    return elCodigoEsValido;
}

function validacionFinal(){
    estaTodoValidadoCorrectamente = false;
    if(losDatosFueronConfirmados() && losCamposDeContraseniaSonIguales() && elCampoCodigoCVVEsCorrecto()){
        estaTodoValidadoCorrectamente = true;
        botonDeConfirmacion.disabled = false;
    }
    return estaTodoValidadoCorrectamente;
}

console.log("Es un nombre valido  " + esUnNombreValido());
console.log("Es un apellido valido  " + esUnApellidoValido());
console.log("Es un mail  " + esUnEmail());
console.log("Es un nombre de usuario valido  " + esUnNombreDeUsuarioValido());
console.log("Los datos fueron confirmados  " + losDatosFueronConfirmados());
console.log("Los campos de contrasenia son iguales  " + losCamposDeContraseniaSonIguales());
console.log("Es una contraseña valida  " + esUnaContraseniaValida())
console.log("Esta repetida correctamente  " + repetirContrasenia())
console.log(radioButtomTarjetaCredito.value);

botonDeConfirmacion.addEventListener('click',  validacionFinal);

/*La vista debe tener como mínimo:
1. Un campo para solicitar:
a. Nombre - solo acepta letras
b. Apellido - solo acepta letras
c. Email - validar que sea un email.
d. Nombre de usuario - solo acepta letras y números.
e. Contraseña - 8 caracteres ( mínimo 2 letras, 2 números y 2 caracteres especiales)
f. Repetir contraseña - igual a contraseña
2. Un grupo de radio buttons para solicitar un método de pago. ---------
3. Un botón confirmar, que luego de ser presionado debe navegar al login. ---------------
4. Un botón cancelar, que luego de ser presionado debe navegar al login. ------------------
5. Validar que todos los campos estén completos para confirmar.
a. El campo clave de la tarjeta solo acepta 3 números distintos de cero.
i. Debe aparecer un mensaje de error si se completa con 000
b. Los campos contraseña y validar contraseña deben tener el mismo valor.
i. Debe aparecer un mensaje de error si son distintas o no cumplen con las
condiciones mencionadas arriba
*/