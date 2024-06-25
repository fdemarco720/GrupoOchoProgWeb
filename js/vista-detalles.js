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

    let capitulos_div = document.querySelector("#capitulos")
    let nodo_capitulos = document.createElement("h3");
    
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

            nodo_temporada.textContent = `Temporada `;
            temporadas_div.appendChild(nodo_temporada);

            function mostrarCapitulos() {
                // Obtener el índice de la temporada seleccionada
                let temporadaSeleccionada = select_temporada.value - 1; // Restamos 1 porque los índices en JavaScript comienzan en 0
                
                // Mostrar la cantidad de capítulos de la temporada seleccionada
                let cantidadCapitulos = serie.temporadas[temporadaSeleccionada];
                nodo_capitulos.textContent = `Capítulos [ ${cantidadCapitulos} ]`;
                capitulos_div.appendChild(nodo_capitulos);
            }

            for(let i=1; i<= serie.temporadas.length;i++){
                nodo_option = document.createElement("option");
                nodo_option.value= i;
                nodo_option.textContent = i;
                select_temporada.appendChild(nodo_option);
            }
            temporadas_div.appendChild(select_temporada);
           
            select_temporada.addEventListener('change', mostrarCapitulos);
            mostrarCapitulos();
                
            }
        }
        }

function agregarPeliculasAlCarrousel(divParametro, arrayParametro){
    for (pelicula of arrayParametro) {
        let nodo_div = document.createElement("div");
        nodo_div.classList.add("carrousel-cell");
        let nodo_img = document.createElement("img");
        nodo_img.src = pelicula.imagen;
        let nodo_a = document.createElement("a");
        nodo_a.href = `../pages/vista-detalles.html?nombre=${pelicula.nombrePelicula}&tipo=pelicula`;
        nodo_a.target ="_blank"; 
        nodo_a.appendChild(nodo_img);
        nodo_div.appendChild(nodo_a)
        divParametro.appendChild(nodo_div);
        }
    }

        function obtenerPeliculasPorCategoria(array) {

            let elementosAleatorios = [];

            while (elementosAleatorios.length < 5) {

                let indiceAleatorio = Math.floor(Math.random() * array.length);

                elementosAleatorios.push(array[indiceAleatorio]);
            }

            return elementosAleatorios;
        }

        function elegirDetalles (){
        if (TIPO_SELECCIONADO == "serie") {
            buscarDatosParaDetallesSeries();
        }else if(TIPO_SELECCIONADO == "pelicula"){
            buscarDatosParaDetallesPeliculas();
            let div_carrousel = document.querySelector("#carrousel-pelicula");  
            let array_pelicula_categoria = obtenerPeliculasPorCategoria(ARRAY_PELICULAS_);
             agregarPeliculasAlCarrousel(div_carrousel, array_pelicula_categoria);
            }
        }

        elegirDetalles();
    