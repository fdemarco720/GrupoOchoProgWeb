// archivo: registro.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const password = document.getElementById('contraseña');
    const confirmPassword = document.getElementById('contraseña_repetida');
    const paymentMethods = document.querySelectorAll('input[name="metodo_pago"]');

    form.addEventListener('submit', function(event) {
        // Validar que las contraseñas coinciden
        if (password.value !== confirmPassword.value) {
            alert('Las contraseñas no coinciden. Por favor, inténtelo de nuevo.');
            event.preventDefault();
            return;
        }

        // Validar que se seleccionó un método de pago
        let paymentMethodSelected = false;
        paymentMethods.forEach(function(method) {
            if (method.checked) {
                paymentMethodSelected = true;
            }
        });

        if (!paymentMethodSelected) {
            alert('Por favor, seleccione un método de pago.');
            event.preventDefault();
        }
    });
});
