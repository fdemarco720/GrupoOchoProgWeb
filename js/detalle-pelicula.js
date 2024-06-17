const URL_PELICULA_SELECCIONADA = document.location.href; //Consigo la url de la vista
const URL_PASADO_A_STRING = new URL(URL_PELICULA_SELECCIONADA); //Paso la url a formato String mediante una clase propia de visualStudio
const NOMBRE_PELICULA = URL_PASADO_A_STRING.searchParams.get('nombre'); //Le indico que me devuelva el contenido que hay despues de la clave "nombre"
  
    let tituloPelicula = document.querySelector("#titulo")
    let nodo_texto = document.createElement("h3");
    nodo_texto.textContent = `Titulo: ${NOMBRE_PELICULA}`;
    tituloPelicula.appendChild(nodo_texto);


    