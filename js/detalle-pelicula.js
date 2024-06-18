const ARRAY_PELICULAS_ = JSON.parse(localStorage.getItem("datosPeliculasStorage")); 

const URL_PELICULA_SELECCIONADA = document.location.href; //Consigo la url de la vista
const URL_PASADO_A_STRING = new URL(URL_PELICULA_SELECCIONADA); //Paso la url a formato String mediante una clase propia de visualStudio
const NOMBRE_PELICULA = URL_PASADO_A_STRING.searchParams.get('nombre'); //Le indico que me devuelva el contenido que hay despues de la clave "nombre"
  
    let tituloPelicula = document.querySelector("#titulo")
    let nodo_texto = document.createElement("h3");
    nodo_texto.textContent = `Titulo: ${NOMBRE_PELICULA}`;
    tituloPelicula.appendChild(nodo_texto);

    function buscarDatosParaDetalles(){  
        
        let videoPelicula = document.querySelector("#iframePelicula");  
        let generoPelicula = document.querySelector("#genero");
        let duracionPelicula = document.querySelector("#duracion");
        let sinopsisPelicula = document.querySelector("#sinopsis")
        let nodo_genero = document.createElement("h3");
        let nodo_duracion = document.createElement("h3");
        let nodo_sinopsis = document.createElement("h3");
        let nodo_btn = document.querySelector("btn_comenzar");
        let nodo_a = document.createElement("btn_comenzar");

        for (let pelicula of ARRAY_PELICULAS_) {
            if(NOMBRE_PELICULA == pelicula.nombrePelicula){
                nodo_genero.textContent = `Género: ${pelicula.genero}`;
                nodo_duracion.textContent = `${pelicula.duracion} <span>minutos</span>`;
                nodo_sinopsis.textContent = `${pelicula.sinopsis}`;
                generoPelicula.appendChild(nodo_genero);
                duracionPelicula.appendChild(nodo_duracion);
                sinopsisPelicula.appendChild(nodo_sinopsis);
                nodo_a.href = pelicula.iframe;
                videoPelicula.src = pelicula.iframe;
                nodo_btn.appendChild(nodo_a);
            }
        }
    }
    buscarDatosParaDetalles();

