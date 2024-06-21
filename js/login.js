const nombreUsuario = document.querySelector("#nombre_usuario");
const password = document.querySelector("#contrasenia");
const form = document.querySelector("#form");
const botonIniciarSesion = document.querySelector("button[type='submit']");
const alertas = document.querySelector("#alertas");

function corroborarLogin(e) {
    e.preventDefault();

    if (nombreUsuario.value.length < 8 && password.value.length < 8) {
        alertas.textContent = "Los campos deben ser mayor a 8 caracteres";
    } else if (nombreUsuario.value.length < 8) {
        alertas.textContent = "Nombre de usuario debe ser mayor a 8 caracteres";
    } else if (password.value.length < 8) {
        alertas.textContent = "La contraseña debe ser mayor a 8 caracteres";
    } else {
        // Obtener usuarios desde localStorage
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Buscar usuario que coincida con nombre de usuario y contraseña
        const usuarioValido = usuarios.find(usuario => 
            usuario.nombreUsuario === nombreUsuario.value && 
            usuario.contraseña === password.value
            
        );
        if (usuarioValido) {
            window.location.href = "./pages/principal.html";
            localStorage.setItem("usuarioActual",JSON.stringify(nombreUsuario.value))
        } else {
            alertas.textContent = "Nombre de usuario o contraseña incorrectos";
        }
    }
}
botonIniciarSesion.addEventListener("click", corroborarLogin);