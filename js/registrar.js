document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const password = document.getElementById('contraseña');
    const confirmPassword = document.getElementById('contraseña_repetida');
    
    // Inicializar el array de usuarios desde localStorage 
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    form.addEventListener('submit', function(event) {
        // Validar que las contraseñas coinciden
        if (password.value !== confirmPassword.value) {
            alert('Las contraseñas no coinciden. Por favor, inténtelo de nuevo.');
            event.preventDefault();
            return;
        }

        // Crear un objeto con los datos del formulario
        const usuario = {
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            email: document.getElementById('email').value,
            nombreUsuario: document.getElementById('nombre_usuario').value,
            contraseña: password.value,
            metodoPago: document.querySelector('input[name="metodo_pago"]:checked').value,
            numeroTarjeta: document.getElementById('numero_tarjeta').value,
            codigoCVV: document.getElementById('codigo_cvv').value
        };

        // Añadir el objeto usuario al array
        usuarios.push(usuario);

        // Guardar el array en localStorage
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        // Confirmar registro exitoso
        alert('Usuario registrado exitosamente.');

        // Permitir que el formulario se envíe
        // event.preventDefault(); // Solo si no deseas enviar el formulario realmente
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const password = document.getElementById('contraseña');
    const confirmPassword = document.getElementById('contraseña_repetida');
    
    // Inicializar el array de usuarios desde localStorage o crear uno nuevo
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    form.addEventListener('submit', function(event) {
        // Validar que las contraseñas coinciden
        if (password.value !== confirmPassword.value) {
            alert('Las contraseñas no coinciden. Por favor, inténtelo de nuevo.');
            event.preventDefault();
            return;
        }

        // Crear un objeto con los datos del formulario
        const usuario = {
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            email: document.getElementById('email').value,
            nombreUsuario: document.getElementById('nombre_usuario').value,
            contraseña: password.value,
            metodoPago: document.querySelector('input[name="metodo_pago"]:checked').value,
            numeroTarjeta: document.getElementById('numero_tarjeta').value,
            codigoCVV: document.getElementById('codigo_cvv').value
        };

        // Añadir el objeto usuario al array
        usuarios.push(usuario);

        // Guardar el array en localStorage
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        // Confirmar registro exitoso
        alert('Usuario registrado exitosamente.');

        // Permitir que el formulario se envíe
        // event.preventDefault(); // Solo si no deseas enviar el formulario realmente
    });
});

