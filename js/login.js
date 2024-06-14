const nombreUsuario = document.querySelector("#nombre_usuario");
const password =  document.querySelector("#contrasenia");
const form =  document.querySelector("#form");
const botonIniciarSesion = document.querySelector("button[type='submit']");
const alertas =  document.querySelector("#alertas");

function corroborarLogin(e) {
    e.preventDefault();
    if(nombreUsuario.value.length < 3 && password.value.length < 3){
        alertas.textContent = "Los campos deben ser mayor a 3 caracteres";
    }else if(nombreUsuario.value.length < 3){
        alertas.textContent = "Nombre de usuario debe ser mayor a 3 caracteres";
    }else if(password.value.length < 3) {
        alertas.textContent="La ontraseña debe ser mayor a 3 caracteres";
    }
}

botonIniciarSesion.addEventListener("click", corroborarLogin); // Agregar un event listener al botón de iniciar sesión
