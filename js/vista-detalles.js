const ARRAY_PELICULAS_ = JSON.parse(localStorage.getItem("datosPeliculasStorage")); 
const ARRAY_SERIES_ = JSON.parse(localStorage.getItem("datosSeriesStorage")); 

const URL_SELECCIONADO = document.location.href; //Consigo la url de la vista
const URL_PASADO_A_STRING = new URL(URL_SELECCIONADO); //Paso la url a formato String mediante una clase propia de visualStudio
const NOMBRE_SELECCIONADO = URL_PASADO_A_STRING.searchParams.get('nombre'); //Le indico que me devuelva el contenido que hay despues de la clave "nombre"
const TIPO_SELECCIONADO = URL_PASADO_A_STRING.searchParams.get('tipo');
  
function buscarDatosParaDetallesPeliculas(){  

    let titulo = document.querySelector("#titulo")
    let nodo_texto = document.createElement("h3");
    nodo_texto.textContent = `Titulo: ${NOMBRE_SELECCIONADO}`;
    titulo.appendChild(nodo_texto);
      
    let video = document.querySelector("#iframePelicula");  
    let genero = document.querySelector("#genero");
    let duracion = document.querySelector("#duracion");
    let sinopsis = document.querySelector("#sinopsis")
    let nodo_btn = document.querySelector("#btn_comenzar");
    let nodo_genero = document.createElement("h3");
    let nodo_duracion = document.createElement("h3");
    let nodo_sinopsis = document.createElement("h3");


    for (let pelicula of ARRAY_PELICULAS_) {
        if(NOMBRE_SELECCIONADO == pelicula.nombrePelicula){
        nodo_genero.textContent = `Categoría: ${pelicula.genero}`;
        nodo_duracion.textContent = `Duración: ${pelicula.duracion} minutos`;
        nodo_sinopsis.textContent = `Sinopsis: ${pelicula.sinopsis}`;
        genero.appendChild(nodo_genero);
        duracion.appendChild(nodo_duracion);
        sinopsis.appendChild(nodo_sinopsis);
        video.src = pelicula.iframe;
        nodo_btn.href = pelicula.linkVideo;
        nodo_btn.target = "_blank";
        }
    }
}

function buscarDatosParaDetallesSeries() {
    let titulo = document.querySelector("#titulo")
    let nodo_texto = document.createElement("h3");
    nodo_texto.textContent = `Titulo: ${NOMBRE_SELECCIONADO}`;
    titulo.appendChild(nodo_texto);
      
    let video = document.querySelector("#iframePelicula");  
    
    let genero = document.querySelector("#genero");
    let nodo_genero = document.createElement("h3");
    let sinopsis = document.querySelector("#sinopsis");
    let nodo_sinopsis = document.createElement("h3");
    
    
    let temporadas_div = document.querySelector("#duracion");
    let nodo_temporada = document.createElement("h3");
    let select_temporada = document.createElement("select");
    
    let nodo_btn = document.querySelector("#btn_comenzar");
    
    



    for (let serie of ARRAY_SERIES_) {
        if (NOMBRE_SELECCIONADO == serie.nombreSerie) {
            nodo_genero.textContent = `Categoría: ${serie.genero}`;
            genero.appendChild(nodo_genero);

            nodo_sinopsis.textContent = `Sinopsis: ${serie.sinopsis}`;
            sinopsis.appendChild(nodo_sinopsis);

            video.src = serie.iframe;
            nodo_btn.href = serie.linkVideo;
            nodo_btn.target = "_blank";

            nodo_temporada.textContent = `Temporadas:`;
            temporadas_div.appendChild(nodo_temporada);

                temporadas_div.appendChild(select_temporada);
                temporadas_div.appendChild(nodo_temporada);
            }
        }
        }

    if (TIPO_SELECCIONADO == "serie") {
        buscarDatosParaDetallesSeries();
    }
    
    if(TIPO_SELECCIONADO == "pelicula"){
        buscarDatosParaDetallesPeliculas();
        }

    
