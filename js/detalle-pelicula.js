const ARRAY_PELICULAS_ = JSON.parse(localStorage.getItem("datosPeliculasStorage")); 
const ARRAY_SERIES_ = JSON.parse(localStorage.getItem("datosSeriesStorage")); 

const URL_SELECCIONADO = document.location.href; //Consigo la url de la vista
const URL_PASADO_A_STRING = new URL(URL_SELECCIONADO); //Paso la url a formato String mediante una clase propia de visualStudio
const NOMBRE_SELECCIONADO = URL_PASADO_A_STRING.searchParams.get('nombre'); //Le indico que me devuelva el contenido que hay despues de la clave "nombre"
  
    let tituloPelicula = document.querySelector("#titulo")
    let nodo_texto = document.createElement("h3");
    nodo_texto.textContent = `Titulo: ${NOMBRE_SELECCIONADO}`;
    tituloPelicula.appendChild(nodo_texto);

    const ARRAY_PELICULAS_Y_SERIES = [];
    
    for (let pelicula of ARRAY_PELICULAS_) {
    ARRAY_PELICULAS_Y_SERIES.push(pelicula);
       }
    
    for (let series of ARRAY_SERIES_) {
        ARRAY_PELICULAS_Y_SERIES.push(series);
           }
  
    function buscarDatosParaDetalles(){  
        
        let video = document.querySelector("#iframePelicula");  
        let genero = document.querySelector("#genero");
        let duracion = document.querySelector("#duracion");
        let sinopsis = document.querySelector("#sinopsis")
        let nodo_genero = document.createElement("h3");
        let nodo_duracion = document.createElement("h3");
        let nodo_sinopsis = document.createElement("h3");
        let nodo_btn = document.querySelector("#btn_comenzar");
        let nodo_select = document.createElement("select")
        

        for (let pelicula_serie of ARRAY_PELICULAS_Y_SERIES) {
            if(NOMBRE_SELECCIONADO == pelicula_serie.nombrePelicula){
                if(ARRAY_PELICULAS_.includes(pelicula_serie)){
                nodo_genero.textContent = `Categoría: ${pelicula_serie.genero}`;
                nodo_duracion.textContent = `Duración: ${pelicula_serie.duracion} minutos`;
                nodo_sinopsis.textContent = `Sinopsis: ${pelicula_serie.sinopsis}`;
                genero.appendChild(nodo_genero);
                duracion.appendChild(nodo_duracion);
                sinopsis.appendChild(nodo_sinopsis);
                video.src = pelicula_serie.iframe;
                nodo_btn.href = pelicula_serie.linkVideo;
                nodo_btn.target = "_blank";
                }else{
                    nodo_genero.textContent = `Categoría: ${pelicula_serie.genero}`;
                    // nodo_duracion.textContent = `Temporada: ${pelicula_serie.duracion} minutos`;
                    nodo_sinopsis.textContent = `Sinopsis: ${pelicula_serie.sinopsis}`;
                    genero.appendChild(nodo_genero);
                    duracion.appendChild(nodo_duracion);
                    sinopsis.appendChild(nodo_sinopsis);
                    video.src = pelicula_serie.iframe;
                    nodo_btn.href = pelicula_serie.linkVideo;
                    nodo_btn.target = "_blank";
                }
                
            }
        }
    }
    buscarDatosParaDetalles();



    //AGREGAR CATEGORIAS AL SELECT
    let generosAgregados = []; // Array para almacenar los géneros que ya han sido agregados


    for (let cantidad in pelicula_serie.temporada) {
        let nodo_option = document.createElement("option");
        nodo_option.value = cantidad.length+1;
        nodo_option.textContent = `${cantidad.length+1}`;

        duracion.appendChild(nodo_option);
}