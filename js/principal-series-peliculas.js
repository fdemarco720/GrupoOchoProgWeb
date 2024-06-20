const JSON_DATOSPELICULAS = localStorage.getItem("datosPeliculasStorage"); //Me paso el array de datos.js que lo envie al localStorage
const ARRAY_PELICULAS = JSON.parse(JSON_DATOSPELICULAS); // lo parseo a formato ARRAY nuevamnete ya que esta en String

const JSON_DATOSSERIES = localStorage.getItem("datosSeriesStorage"); 
const ARRAY_SERIES = JSON.parse(JSON_DATOSSERIES); 


//FUNCION PARA QUE SE AGREGUEN PELICULAS A LA VISTA PRINCIPAL -DEBO PASARLE EL SECTION DONDE CARGARSE y EL aRRay Que va a mostrar
function devolverPeliculasAlHome(sectionParametro, arrayParametro){
    for (let pelicula of arrayParametro) {
        let nodo_div = document.createElement("div");
        let nodo_img = document.createElement("img");
        nodo_img.src = pelicula.imagen;
        let nodo_a = document.createElement("a");
        nodo_a.href = `../pages/vista-detalles.html?nombre=${pelicula.nombrePelicula}&tipo=pelicula`;
        nodo_a.target ="_blank";
        
        nodo_a.appendChild(nodo_img);
        nodo_div.appendChild(nodo_a)
        sectionParametro.appendChild(nodo_div)
    
    }
}

function devolverSeriesAlHome(sectionParametro, arrayParametro){
    for (let serie of arrayParametro) {
        let nodo_div = document.createElement("div");
        let nodo_img = document.createElement("img");
        nodo_img.src = serie.imagen;
        let nodo_a = document.createElement("a");
        nodo_a.href = `../pages/vista-detalles.html?nombre=${serie.nombreSerie}&tipo=serie`;
        nodo_a.target ="_blank";
        
        nodo_a.appendChild(nodo_img);
        nodo_div.appendChild(nodo_a)
        sectionParametro.appendChild(nodo_div)
    
    }
}

//AGREGAR CATEGORIAS AL SELECT
function agregarCategorias(){
    const ARRAY_PELICULAS_Y_SERIES = [];
    
    for (let pelicula of ARRAY_PELICULAS) {
    ARRAY_PELICULAS_Y_SERIES.push(pelicula);
       }
    
    for (let series of ARRAY_SERIES) {
        ARRAY_PELICULAS_Y_SERIES.push(series);
           }

    let categoriasHome = document.querySelector("#categorias");
    let i=1;
    let generosAgregados = []; // Array para almacenar los géneros que ya han sido agregados       

    for (let categorias of ARRAY_PELICULAS_Y_SERIES) {
    if (!generosAgregados.includes(categorias.genero)) {
        let nodo_option = document.createElement("option");
        nodo_option.value = i;
        nodo_option.textContent = categorias.genero;
        categoriasHome.appendChild(nodo_option);
        generosAgregados.push(categorias.genero); 
        i++;
    }
}
}

//FUNCION PARA QUE EL BUSCADOR FILTRE PELICULAS
function filtrarPeliculas() {
let textoBuscado = document.querySelector('#buscador').value.toLowerCase(); //Valor que le pase por el input
let sectionPrincipalConPeliculas = document.querySelector("#listadoPeliculas");
sectionPrincipalConPeliculas.innerHTML = ''; //Vacio el section con innerHTML = ""; que previamente lo cargue con todas las peliculas;

const ARRAY_PELICULAS_FILTRADAS = [];
for (let pelicula of ARRAY_PELICULAS) {
if (pelicula.nombrePelicula.toLowerCase().includes(textoBuscado.toLowerCase())) {
ARRAY_PELICULAS_FILTRADAS.push(pelicula);
   }
}
    
//Si no se encuentran resultados, se muestra un mensaje
if (ARRAY_PELICULAS_FILTRADAS.length === 0) {
let mensajePeliculasNoEncontradas = document.createElement("h3");
mensajePeliculasNoEncontradas.textContent = "No se encontraron películas con ese criterio de búsqueda.";
sectionPrincipalConPeliculas.appendChild(mensajePeliculasNoEncontradas);
}else{
    devolverPeliculasAlHome(sectionPrincipalConPeliculas, ARRAY_PELICULAS_FILTRADAS);
     }
 }

 //FUNCION PARA QUE EL BUSCADOR FILTRE SERIES
function filtrarSeries() {
    let textoBuscado = document.querySelector('#buscador').value.toLowerCase();
    let sectionPrincipalConSeries = document.querySelector("#listadoSeries");
    sectionPrincipalConSeries.innerHTML = '';
    
    
    const ARRAY_SERIES_FILTRADAS = [];
    for (let serie of ARRAY_SERIES) {
    if (serie.nombreSerie.toLowerCase().includes(textoBuscado.toLowerCase())) {
    ARRAY_SERIES_FILTRADAS.push(serie);
       }
    }
        
    if (ARRAY_SERIES_FILTRADAS.length === 0) {
    let mensajeSeriesNoEncontradas = document.createElement("h3");
    mensajeSeriesNoEncontradas.textContent = "No se encontraron series con ese criterio de búsqueda.";
    sectionPrincipalConSeries.appendChild(mensajeSeriesNoEncontradas);
    }else{
        devolverSeriesAlHome(sectionPrincipalConSeries, ARRAY_SERIES_FILTRADAS);
         }
 }

 function filtrarPorCategoria() {
    let categoriaSeleccionada = document.querySelector('#categorias').selectedOptions[0].textContent;
    console.log(categoriaSeleccionada);
    
    let ARRAY_PELICULAS_FILTRADAS = [];
    let ARRAY_SERIES_FILTRADAS = [];

    for(pelis of ARRAY_PELICULAS){
        if(categoriaSeleccionada == pelis.genero){
            ARRAY_PELICULAS_FILTRADAS.push(pelis);
        }
    }
    for(series of ARRAY_SERIES){
        if(categoriaSeleccionada == series.genero){
            ARRAY_SERIES_FILTRADAS.push(series);
        }
    }

    // Mostrar películas filtradas en el listado de películas
    let sectionPrincipalConPeliculas = document.querySelector("#listadoPeliculas");
    sectionPrincipalConPeliculas.innerHTML = '';
    sectionPrincipalConPeliculas = document.querySelector("#listadoPeliculas");
    if (ARRAY_PELICULAS_FILTRADAS.length > 0) {
        devolverPeliculasAlHome(sectionPrincipalConPeliculas, ARRAY_PELICULAS_FILTRADAS);
    } else {
        let mensajePeliculasNoEncontradas = document.createElement("h3");
        mensajePeliculasNoEncontradas.textContent = "No se encontraron películas con ese criterio de búsqueda.";
        sectionPrincipalConPeliculas.appendChild(mensajePeliculasNoEncontradas);
    }

    // Mostrar series filtradas en el listado de series
    let sectionPrincipalConSeries = document.querySelector("#listadoSeries");
    sectionPrincipalConSeries.innerHTML = '';
    sectionPrincipalConSeries = document.querySelector("#listadoSeries");
    if (ARRAY_SERIES_FILTRADAS.length > 0) {
        devolverSeriesAlHome(sectionPrincipalConSeries, ARRAY_SERIES_FILTRADAS);
    } else {
        let mensajeSeriesNoEncontradas = document.createElement("h3");
        mensajeSeriesNoEncontradas.textContent = "No se encontraron series con ese criterio de búsqueda.";
        sectionPrincipalConSeries.appendChild(mensajeSeriesNoEncontradas);
    }

    if(categoriaSeleccionada == "Lo nuevo"){
        sectionPrincipalConPeliculas.innerHTML = '';
        sectionPrincipalConSeries.innerHTML = '';
        devolverPeliculasAlHome(sectionPrincipalConPeliculas, ARRAY_PELICULAS);
        devolverSeriesAlHome(sectionPrincipalConSeries, ARRAY_SERIES);
    }

}

 let sectionPrincipalConPeliculas = document.querySelector("#listadoPeliculas");
 let sectionPrincipalConSeries = document.querySelector("#listadoSeries");

 devolverPeliculasAlHome(sectionPrincipalConPeliculas, ARRAY_PELICULAS);
 devolverSeriesAlHome(sectionPrincipalConSeries, ARRAY_SERIES);
 agregarCategorias();
 document.getElementById('buscador').addEventListener('input', filtrarSeries);
 document.getElementById('buscador').addEventListener('input', filtrarPeliculas);    
 document.getElementById('categorias').addEventListener('change', filtrarPorCategoria);
