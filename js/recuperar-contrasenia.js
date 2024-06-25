document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos del DOM
    const nombreDeUsuario = document.querySelector('#nombre_De_usuario');
    const email = document.querySelector('#email');
    const botonConfirmar = document.querySelector('#boton-confirmar');
    const form = document.querySelector('#formulario');

    // Función para habilitar/deshabilitar el botón de confirmación
    function verificarCampos() {
        if (nombreDeUsuario.value && email.value) {
            botonConfirmar.disabled = false;
        } else {
            botonConfirmar.disabled = true;
        }
    }

    // Añadir event listeners para verificar campos en tiempo real
    nombreDeUsuario.addEventListener('input', verificarCampos);
    email.addEventListener('input', verificarCampos);

    // Función para validar si los datos coinciden con algún usuario en localStorage
    function validarUsuario() {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        let usuarioEncontrado = usuarios.find(user => user.nombreUsuario === nombreDeUsuario.value && user.email === email.value);
        
        if (!usuarioEncontrado) {
            alert('Los datos ingresados no coinciden con ningún usuario registrado.');
            return false;
        }
        return true;
    }

    // Añadir event listener al formulario para la validación final
    form.addEventListener('submit', function(event) {
        if (!validarUsuario()) {
            event.preventDefault();
        } else {
            alert('Formulario enviado');
        }
    });
});

