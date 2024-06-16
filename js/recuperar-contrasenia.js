let elBotonEstaDeshabilitado = false;
const nombreDeUsuario = document.querySelector('#nombre_De_usuario');
const email = document.querySelector('#email');
const formulario = document.querySelector('#formulario');
const boton = document.getElementById("boton-confirmar");

//console.log(boton);  MUESTRA BOTON DESHABILITADO
const VALOR_MINIMO_DE_CARACTERES_PARA_CAMPOS = 4;

let valorDeNombreDeUsuario = nombreDeUsuario.value ;

//console.log(typeof(valorDeNombreDeUsuario));

function validacionDeCampos(e){
    //botonConfirmar.disabled = true;
    if(nombreDeUsuario.value.length >= VALOR_MINIMO_DE_CARACTERES_PARA_CAMPOS && (email.value.includes("@")
    && email.value.includes(".com"))){
        alert("RECUPERACION EXITOSA");
        elBotonEstaDeshabilitado = true;
        validacionDeBoton();
    }
    else if((nombreDeUsuario.value.length < VALOR_MINIMO_DE_CARACTERES_PARA_CAMPOS) && (!email.value.includes("@")
    && email.value.includes(".com"))){
        e.preventDefault();
        alert("El nombre debe contener 4 caracteres como minimo y el mail debe tener un formato correcto");      
    }
    else if(nombreDeUsuario.value.length < VALOR_MINIMO_DE_CARACTERES_PARA_CAMPOS){
        alert("El nombre de usuario debe contenter 4 caracteres como minimo");
        e.preventDefault();
    }
    else if((!email.value.includes("@") || (!email.value.includes(".com")))){
        alert("El mail debe ser valido");
        e.preventDefault();
    } 
}

function validacionDeBoton(){
    if(elBotonEstaDeshabilitado == true){
        boton.disabled = false;
    }
}


boton.addEventListener('click', validacionDeCampos);

//5. Validar que ambos campos estén completos para enviar el email (tuki)
//6. El botón enviar email debe estar deshabilitado si los campos no están completos. (tuki)
