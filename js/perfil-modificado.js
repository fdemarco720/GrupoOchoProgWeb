//Regex
const regexSolonNumerosYLetras = /[A-Za-z0-9]/;
const regexSoloContraseniasValidas = /^.*[A-Za-z].*[A-Za-z].*[0-9].*[0-9].*[!@#\$%\^&\*()_\+\-=\[\]{};':"\\|,.<>\/?].*[!@#\$%\^&\*()_\+\-=\[\]{};':"\\|,.<>\/?]$/;
//

const campoNombreUsuario = document.querySelector('#user');
const campoMail = document.querySelector('#em');
const campoContraseniaActual = document.querySelector('#contrasenia');
//agrego un <P> que se modifique cada vez que el usuario cambie su contraseña  
let campoContraseniaActualDinamico = document.createElement('p');
campoContraseniaActualDinamico.textContent = "Dar dinamismo";
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

const usuarios = JSON.parse(localStorage.getItem("usuarios"));
const usuarioActual = + JSON.parse(localStorage.getItem('usuarioActual')) || [];

console.log(usuarios)

function buscarUsuario(usuarioActual){
    let usuarioEncontrado = null;
    for(let usuario of usuarios){
        if(usuario.nombre == usuarioActual.nombre){
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

    function validacionDeContraseniasIguales(){ //Este metodo solo se debe llamar en caso de que el usuario quiera guardar cambios y los campos de contraseñas esten completos
        let sonIguales = false;
        console.log("CA" + campoContraseniaActual);
        console.log("NC" + campoNuevaContrasenia);
        console.log("RC" + campoRepetirContrasenia);
        
        if(campoNuevaContrasenia && campoRepetirContrasenia){
            if(validacionDeContrasenia(campoNuevaContrasenia) && campoNuevaContrasenia == campoRepetirContrasenia){
                sonIguales = true;
            }else{
                errores += "- Las contraseñas no coinciden\n";
            }
        }
        return sonIguales;
    }

    function elCodigoCVVEsCorrecto(){ //Este metodo solo debe ser llamado en caso de que el usuario quiera guardar cambios y seleccione el radio button de tarjeta de credito
        let esCorrecto = false;
        if(ingresoCodigoCVV != '000' && ingresoCodigoCVV.value.length == 3){
            esCorrecto = true;
        }else{
            errores += "- El codigo CVV debe contener 3 digitos y debe ser distinto de '000'\n";
        }
        return esCorrecto;
    }

    function elLargoDeLaTarjetaDeCreditoEsCorrecto(){ //Este metodo solo debe ser llamado en caso de que el usuario quiera guardar cambios y seleccione el radio button de tarjeta de credito
        let esCorrecto = false;
        if(ingresoNumeroTarjeta.value.length >= 16 && ingresoNumeroTarjeta.value.length <= 19){
            esCorrecto = true;
        }else{
            errores += "- El numero de tarjeta debe tener entre 16 y 19 digitos (incluyendo estos extremos)\n";
        }
        return esCorrecto;
    }

    function seDeseaCambiarElMetodoDePago(){ //Metodo que se debe usar si o si
        let seDeseaCambiar = false;
        if(radioButtonPagoFacil.checked || radioButtonRapiPago.checked || radioButtonTransferenciaBancaria.checked){
            seDeseaCambiar = true;
        }
        return seDeseaCambiar;
    }

    function sePuedeCambiarElMetodoDePago(){ //Pregunta si se quiere y si se puede cambiar el metodo de pago
        let sePuede = false;
        if((radioButtonTarjetaDeCredito.checked && elCodigoCVVEsCorrecto() && elCodigoCVVEsCorrecto()) //Condiciones para tarjeta de credito
            || seDeseaCambiarElMetodoDePago){ // Condicion para los que no son tarjeta de credito
                sePuede = true;
        }
        return sePuede;
    }
    console.log(validacionDeContraseniasIguales());
    console.log(elCodigoCVVEsCorrecto());
    console.log(elLargoDeLaTarjetaDeCreditoEsCorrecto());
    console.log(seDeseaCambiarElMetodoDePago());
    console.log(sePuedeCambiarElMetodoDePago());
    console.log("\n");

    function sePuedeGuardarLosCambios(){
        let sePuede = false;
        if((validacionDeContraseniasIguales() && sePuedeCambiarElMetodoDePago()) || ((validacionDeContraseniasIguales() || sePuedeCambiarElMetodoDePago()) && errores == "")){ //Se analiza que cambios quiere realizar el usuario
            sePuede = true;
            evento.target.submit();
        }else{
           errorFinal = "No se puede realizar los cambios requeridos. Datos erroneos";
           alert(errorFinal + ". Las razones son: \n" + errores );
        }
        return sePuede;
    }

};

botonGuardarCambios.addEventListener('click', validacionDeFormulario);
