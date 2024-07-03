document.addEventListener('DOMContentLoaded', function() {
    // Obtengo los nodos necesarios para utilizar
    const user = document.getElementById("user");
    const emailElement = document.querySelector(".datos-usuario-email + p");
    const contraActual = document.querySelector(".contrasenia");
    const nuevaContra = document.querySelector("#NC");
    const repetirContra = document.getElementById("RC");
    const checkTarjetaCredito = document.getElementById("tarjeta_credito");
    const checkRapiPago = document.getElementById("rapi_pago");
    const checkPagoFacil = document.getElementById("pago_facil");
    const checkTransferencia = document.getElementById("Transferencia_bancaria");
    const numeroTarjeta = document.getElementById("numero_tarjeta");
    const codigoCVV = document.getElementById("codigo_cvv");
    const botonGuardar = document.querySelector(".guardar-cambios");
    const botonCancelarSubscripcion = document.querySelector('#cancelar-suscripcion');

    // Verificar que los elementos existen en el DOM
    console.log("user:", user);
    console.log("emailElement:", emailElement);
    console.log("nuevaContra:", nuevaContra);
    console.log("repetirContra:", repetirContra);

    // Regex para validación de contraseña
    const regexSoloContraseniasValidad = /^(?=.*[A-Za-z].*[A-Za-z])(?=.*[0-9].*[0-9])(?=.*[!@#\$%\^&\*()_\+\-=\[\]{};':"\\|,.<>\/?].*[!@#\$%\^&\*()_\+\-=\[\]{};':"\\|,.<>\/?]).*$/;

    // Obtengo Lista de usuarios guardados en el Storage y el nombre de Usuario Logueado
    const usuarios = JSON.parse(localStorage.getItem("usuarios"));
    const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual")) || [];
    
    // Busco que el usuario exista y me lo devuelva en forma de Objeto
    const objetoUsuario = buscarUsuario(usuarioActual);

    if (objetoUsuario) {
        user.textContent = objetoUsuario.nombreUsuario;
        emailElement.textContent = objetoUsuario.email;
        cargarMetodoPago(objetoUsuario);  // Cargar el método de pago
    } else {
        alert('Usuario no encontrado');
        return;
    }

    // Función para buscar el usuario en el array de usuarios
    function buscarUsuario(nombreUsuario) {
        return usuarios.find(usuario => usuario.nombreUsuario === nombreUsuario);
    }

    // Función para cargar el método de pago
    function cargarMetodoPago(usuario) {
        switch (usuario.metodoPago) {
            case "tarjeta_credito":
                checkTarjetaCredito.checked = true;
                numeroTarjeta.value = usuario.numeroTarjeta || "";
                codigoCVV.value = usuario.codigoCVV || "";
                break;
            case "rapi_pago":
                checkRapiPago.checked = true;
                break;
            case "pago_facil":
                checkPagoFacil.checked = true;
                break;
            case "transferencia_bancaria":
                checkTransferencia.checked = true;
                break;
            default:
                break;
        }
    }

    // Función para validar tarjeta de crédito
    function esTarjetaValida(numeroTarjeta) {
        let suma = 0;
        for (let i = 0; i < numeroTarjeta.length - 1; i++) {
            suma += parseInt(numeroTarjeta.charAt(i), 10);
        }
        const ultimoDigito = parseInt(numeroTarjeta.charAt(numeroTarjeta.length - 1), 10);
        if (suma % 2 === 0 && ultimoDigito % 2 !== 0) {
            return true;
        }
        if (suma % 2 !== 0 && ultimoDigito % 2 === 0) {
            return true;
        }
        return false;
    }

    // Función para actualizar los datos del usuario
    function actualizarUsuario() {
        const nuevaContrasenia = nuevaContra ? nuevaContra.value : null;
        const repetirContrasenia = repetirContra ? repetirContra.value : null;

        console.log("Nueva contraseña:", nuevaContrasenia);  // Agrega esto
        console.log("Repetir contraseña:", repetirContrasenia);  // Agrega esto

        // Verificar si se ingresaron valores en los campos de nueva contraseña
        if (nuevaContrasenia || repetirContrasenia) {
            // Verificar si las contraseñas coinciden
            if (nuevaContrasenia !== repetirContrasenia) {
                alert('Las contraseñas no coinciden.');
                return;
            }

            // Verificar si la nueva contraseña es válida según las reglas definidas
            if (!regexSoloContraseniasValidad.test(nuevaContrasenia)) {
                alert('La contraseña debe contener al menos dos letras, dos números y dos caracteres especiales.');
                return;
            }

            // Actualizar la contraseña del usuario
            objetoUsuario.contraseña = nuevaContrasenia;
        }

        // Verificación del método de pago
        if (checkTarjetaCredito.checked) {
            if (!numeroTarjeta || numeroTarjeta.value.length < 16 || numeroTarjeta.value.length > 19) {
                alert("El número de tarjeta debe tener entre 16 y 19 dígitos.");
                return;
            }
            if (!codigoCVV || codigoCVV.value.length !== 3 || codigoCVV.value === "000") {
                alert("El código CVV debe tener 3 dígitos y no puede ser '000'.");
                return;
            }
            if (!esTarjetaValida(numeroTarjeta.value)) {
                alert("La tarjeta de crédito no es válida.");
                return;
            }
            objetoUsuario.metodoPago = "tarjeta_credito";
            objetoUsuario.numeroTarjeta = numeroTarjeta.value;
            objetoUsuario.codigoCVV = codigoCVV.value;
        } else if (checkRapiPago.checked) {
            objetoUsuario.metodoPago = "rapi_pago";
        } else if (checkPagoFacil.checked) {
            objetoUsuario.metodoPago = "pago_facil";
        } else if (checkTransferencia.checked) {
            objetoUsuario.metodoPago = "transferencia_bancaria";
        } else {
            alert("Debe seleccionar un método de pago.");
            return;
        }

        // Guardar los cambios en localStorage
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        alert('Datos actualizados correctamente.');
        window.location.href = "./principal.html";
    }

    botonGuardar.addEventListener('click', function(event) {
        event.preventDefault();
        actualizarUsuario();
    });

    // Mostrar la contraseña como asteriscos
    let carcateresTotalesDeContraseña = document.querySelector('#contrasenia');
    let campoDeContraseniaDinamico = document.createElement('p');
    carcateresTotalesDeContraseña.appendChild(campoDeContraseniaDinamico);
    campoDeContraseniaDinamico.textContent = devolverContraseñaComoAsterisco();

    function devolverContraseñaComoAsterisco(){
        let asteriscos = "";
        let totalDeCaracteres = objetoUsuario.contraseña; // Accede a la contraseña del usuario actual
        for(let i = 0; i < totalDeCaracteres.length; i++){
            if(totalDeCaracteres.charAt(i) !== ""){
                asteriscos += '*';
            }
        }
        return asteriscos; 
    }
    
    function cancelarSubscripcion() {
        let usuarios = JSON.parse(localStorage.getItem("usuarios"));
        let usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
        usuarios = usuarios.filter(usuario => usuario.nombreUsuario !== usuarioActual);

        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        localStorage.removeItem('usuarioActual');
    
        alert('Suscripción cancelada. El usuario ha sido eliminado.');
    
        // Redirijo a la página principal o de inicio de sesión
        window.location.href = "../index.html";
    }
    
    botonCancelarSubscripcion.addEventListener('click', cancelarSubscripcion);
});
