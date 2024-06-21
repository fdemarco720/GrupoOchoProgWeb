//Regex
const regexSolonNumerosYLetras = /^[A-Za-z0-9]$/;
//.*[A-Za-z] $ / * + 
const regexSoloContraseniasValidas =/^(?=(.*[A-Za-z]){2})(?=(.*[0-9]){2})(?=(.*[!@#\$%\^&\*()_\+\-=\[\]]){2}).{8,}$/;

const usuarios = JSON.parse(localStorage.getItem("usuarios"));
const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual')) || [];
const usuarioEncontrado = buscarUsuario(usuarioActual);

const campoNombreUsuario = document.querySelector('#user');
const campoMail = document.querySelector('#mailDinamico');

campoNombreUsuario.textContent = usuarioEncontrado.nombreUsuario;
camp

console.log(usuarioEncontrado);

const campoContraseniaActual = document.querySelector('#contrasenia');
//agrego un <P> que se modifique cada vez que el usuario cambie su contraseña  
let campoContraseniaActualDinamico = document.createElement('p');
//campoContraseniaActualDinamico = usuarios.JSON.parse('usuarioActual');
//let contraseniaaa = campoContraseniaActualDinamico.nombre;
//campoContraseniaActualDinamico.textContent = contraseñaDinamica();
campoContraseniaActual.appendChild(campoContraseniaActualDinamico);
//
const campoNuevaContrasenia = document.querySelector('#NC');
const campoRepetirContrasenia = document.querySelector('#RC');
const ingresoNumeroTarjeta = document.querySelector('#numero_tarjeta');
const ingresoCodigoCVV = document.querySelector('#codigo_cvv');

const radioButtonTarjetaDeCredito = document.querySelector('#tarjeta_credito');
const radioButtonPagoFacil = document.querySelector('#rapi_pago');
const radioButtonRapiPago = document.querySelector('#pago_facil');
const radioButtonTransferenciaBancaria = document.querySelector('#Transferencia_bancaria');

const botonGuardarCambios = document.querySelector('#guardar-cambios');
const botonCancelarSubscripcion = document.querySelector('#cancelar-subscripcion');

let errores = "";
let errorFinal = "";

console.log(usuarios)

function buscarUsuario(usuarioActual){
    let usuarioEncontrado = null;
    for(let usuario of usuarios){
        if(usuario.nombre === usuarioActual.nombre){
            usuarioEncontrado = usuario;
        }
    }
    return usuarioEncontrado;
}

function validacionDeFormulario(evento){
    evento.preventDefault();

    function validacionDeContrasenia(variableAValidar){
        let sePudoValidar = false;
        sePudoValidar = regexSoloContraseniasValidas.test(variableAValidar);
        return sePudoValidar;
    }
    //F0
    function validacionDeContraseniasIguales(){ //Este metodo solo se debe llamar en caso de que el usuario quiera guardar cambios y los campos de contraseñas esten completos
        let sonIguales = false;
            if(validacionDeContrasenia(campoNuevaContrasenia.value) && campoNuevaContrasenia.value == campoRepetirContrasenia.value){
                sonIguales = true;
                campoContraseniaActual.value = campoNuevaContrasenia.value; //Actualizo contraseña
            }else{
                errores += "- Las contraseñas no coinciden\n";
            }
        return sonIguales;
    }
    //F1
    function elCodigoCVVEsCorrecto(){ //Este metodo solo debe ser llamado en caso de que el usuario quiera guardar cambios y seleccione el radio button de tarjeta de credito
        let esCorrecto = false;
        if(ingresoCodigoCVV.value != '000' && ingresoCodigoCVV.value.length == 3){
            esCorrecto = true;
        }else{
            errores += "- El codigo CVV debe contener 3 digitos y debe ser distinto de '000'\n";
        }
        return esCorrecto;
    }
    //F1
    function elLargoDeLaTarjetaDeCreditoEsCorrecto(){ //Este metodo solo debe ser llamado en caso de que el usuario quiera guardar cambios y seleccione el radio button de tarjeta de credito
        let esCorrecto = false;
        if(ingresoNumeroTarjeta.value.length >= 16 && ingresoNumeroTarjeta.value.length <= 19){
            esCorrecto = true;
        }else{
            errores += "- El numero de tarjeta debe tener entre 16 y 19 digitos (incluyendo estos extremos)\n";
        }
        return esCorrecto;
    }
    //F1
    function esCorrectoElIngresoDeTarjetaDeCredito(){ //Pregunta si se quiere y si se puede cambiar el metodo de pago
        let esCorrecto = false;
        if(radioButtonTarjetaDeCredito.checked && elCodigoCVVEsCorrecto() && elLargoDeLaTarjetaDeCreditoEsCorrecto()){ //Condiciones para tarjeta de credito
                esCorrecto = true;
        }
        return esCorrecto;
    }

    //F2
    function seDeseaCambiarElMetodoDePago(){ //Metodo que se debe usar si o si
        let seDeseaCambiar = false;
        if(radioButtonPagoFacil.checked || radioButtonRapiPago.checked || radioButtonTransferenciaBancaria.checked){
            seDeseaCambiar = true; //Da true si hay algún radio button seleccionado (que no sea tarjeta de credito)
        }
        return seDeseaCambiar;
    }


    //F3
    function esValidoElCambioDeMetodoDePago(){
        let esValido = false;
        if((ingresoNumeroTarjeta.value.length == 0 && ingresoCodigoCVV.value.length == 0 && seDeseaCambiarElMetodoDePago() || (esCorrectoElIngresoDeTarjetaDeCredito() && !seDeseaCambiarElMetodoDePago()))){ 
            esValido = true;    //Solo devuelve true si numero de tarjeta y codigo cvv estan vacios y esté seleccionado otro radio buton que no sea tarjeta de credito
        }
        return esValido;
    }
    
    function sePuedeGuardarLosCambios(){
        let sePuede = false;
        if( ((validacionDeContraseniasIguales() && esValidoElCambioDeMetodoDePago() ) || (validacionDeContraseniasIguales() || esValidoElCambioDeMetodoDePago()) ) && errores == ""  ){ //Se analiza que cambios quiere realizar el usuario
            sePuede = true;
            alert("Datos guardados exitosamente!")
            evento.target.submit();
        }else{
           errorFinal = "No se puede realizar los cambios requeridos. Datos erroneos";
           alert(errorFinal + ". Las razones son: \n" + errores );
        }
        return sePuede;
    }

};

botonGuardarCambios.addEventListener('click', validacionDeFormulario);
/*
function contraseñaDinamica(){
    let contenido = "";
    for(let i = 0; i<campoContraseniaActual.value.length; i++){
        if(contraseniaaa.charAt(i) != ""){
            contenido += "*";
        }
    }
    return contenido;
}
*/
/**
 * contraseñas validas  --------
 * contraseñas iguales F0  ----------
 * checked tarjeta de cedito && cvv && largo de tarjeta F1
 * checked rapiPago || Pago Facil || Transferencia bancaria F2
 * funcion 1 || funcion 2 validan si es valido F3
 * F0 || F3 Se puede guardar cambios
 * 
 */


/*
console.log( "contraseñas iguales" + validacionDeContraseniasIguales());
console.log("codigo cvv" + elCodigoCVVEsCorrecto());
console.log("largo de tarjeta" + elLargoDeLaTarjetaDeCreditoEsCorrecto());
console.log("Se quiere cambiar el metodo de pago" + seDeseaCambiarElMetodoDePago());
console.log("Se puede" + sePuedeCambiarElMetodoDePago());
console.log("\n");
*/