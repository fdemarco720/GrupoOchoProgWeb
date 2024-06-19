const botonDeCerrarSesion = document.getElementById('cerrar-sesion');


function cerrandosesion(){
    localStorage.clear(); //BUSCAR SESION ACTUAL
}

botonDeCerrarSesion.addEventListener('click', cerrandosesion);